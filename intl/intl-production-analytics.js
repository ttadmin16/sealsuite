class NebulaCache {
  constructor(options = {}) {
    this.defaultTTL = options.ttl ?? 60_000;
    this.maxEntries = options.maxEntries ?? 100;
    this.entries = new Map();
    this.pending = new Map();
  }

  normalizeKey(key) {
    return String(key).trim().toLowerCase();
  }

  createEntry(value, ttl) {
    const now = Date.now();

    return {
      value,
      createdAt: now,
      expiresAt: now + ttl,
      hits: 0
    };
  }

  set(key, value, ttl = this.defaultTTL) {
    const normalized = this.normalizeKey(key);

    if (this.entries.size >= this.maxEntries) {
      this.evictOldest();
    }

    this.entries.set(
      normalized,
      this.createEntry(value, ttl)
    );

    return value;
  }

  get(key) {
    const normalized = this.normalizeKey(key);
    const entry = this.entries.get(normalized);

    if (!entry) {
      return undefined;
    }

    if (Date.now() >= entry.expiresAt) {
      this.entries.delete(normalized);
      return undefined;
    }

    entry.hits++;

    return entry.value;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    return this.entries.delete(
      this.normalizeKey(key)
    );
  }

  clear() {
    this.entries.clear();
  }

  size() {
    return this.entries.size;
  }

  keys() {
    return [...this.entries.keys()];
  }

  evictOldest() {
    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, entry] of this.entries) {
      if (entry.createdAt < oldestTime) {
        oldestTime = entry.createdAt;
        oldestKey = key;
      }
    }

    if (oldestKey !== null) {
      this.entries.delete(oldestKey);
    }
  }

  async getOrFetch(
    key,
    fetcher,
    options = {}
  ) {
    const normalized = this.normalizeKey(key);
    const cached = this.get(normalized);

    if (cached !== undefined) {
      return cached;
    }

    if (this.pending.has(normalized)) {
      return this.pending.get(normalized);
    }

    const promise = Promise.resolve()
      .then(() => fetcher())
      .then(value => {
        this.set(
          normalized,
          value,
          options.ttl ?? this.defaultTTL
        );

        return value;
      })
      .finally(() => {
        this.pending.delete(normalized);
      });

    this.pending.set(normalized, promise);

    return promise;
  }

  async staleWhileRevalidate(
    key,
    fetcher,
    options = {}
  ) {
    const normalized = this.normalizeKey(key);
    const entry = this.entries.get(normalized);

    if (!entry) {
      return this.getOrFetch(
        normalized,
        fetcher,
        options
      );
    }

  namespace(prefix) {
    const cache = this;

    return {
      set(key, value, ttl) {
        return cache.set(
          `${prefix}:${key}`,
          value,
          ttl
        );
      },

      get(key) {
        return cache.get(`${prefix}:${key}`);
      },

      has(key) {
        return cache.has(`${prefix}:${key}`);
      },

      delete(key) {
        return cache.delete(`${prefix}:${key}`);
      },

      clear() {
        for (const key of cache.keys()) {
          if (key.startsWith(`${prefix}:`)) {
            cache.delete(key);
          }
        }
      }
    };
  }

  export() {
    return JSON.stringify(
      [...this.entries.entries()]
    );
  }

  import(serialized) {
    const data = JSON.parse(serialized);

    if (!Array.isArray(data)) {
      throw new Error("Invalid cache format.");
    }

    this.entries = new Map(data);

    return this;
  }

  stats() {
    let hits = 0;

    for (const entry of this.entries.values()) {
      hits += entry.hits;
    }

    return {
      entries: this.entries.size,
      pending: this.pending.size,
      hits,
      capacity: this.maxEntries,
      utilization:
        this.entries.size / this.maxEntries
    };
  }
}
const cache = new NebulaCache({
  ttl: 30_000,
  maxEntries: 50
});

const apiCache = cache.namespace("api");

async function getExampleData() {
  return apiCache.getOrFetch(
    "example-data",
    async () => {
      const response = await fetch(
        "/api/example"
      );

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status}`
        );
      }

      return response.json();
    }
  );
}

async function refreshExampleData() {
  return apiCache.staleWhileRevalidate(
    "example-data",
    async () => {
      const response = await fetch(
        "/api/example"
      );

      if (!response.ok) {
        throw new Error("Unable to refresh data.");
      }

      return response.json();
    },
    {
      ttl: 60_000
    }
  );
}

window.NebulaCache = NebulaCache;
window.nebulaCache = cache;
window.getExampleData = getExampleData;
window.refreshExampleData = refreshExampleData;
