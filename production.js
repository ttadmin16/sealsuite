const hash = input => {
  const text = String(input);
  let value = 2166136261;

  for (const character of text) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }

  return value >>> 0;
};

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

const seeded = seed => {
  let state = hash(seed);

  return () => {
    state += 0x6D2B79F5;

    let t = state;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);

    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};

const randomInteger = (min, max, random = Math.random) =>
  Math.floor(random() * (max - min + 1)) + min;

const randomFloat = (min, max, random = Math.random) =>
  random() * (max - min) + min;

const choose = (values, random = Math.random) =>
  values[Math.floor(random() * values.length)];

const shuffle = (values, random = Math.random) => {
  const result = [...values];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

const sequence = (length, generator) =>
  Array.from({ length }, (_, index) => generator(index));

const sineWave = (length, frequency = 1, amplitude = 1) =>
  sequence(
    length,
    index => Math.sin(index / length * Math.PI * 2 * frequency) * amplitude
  );

const cosineWave = (length, frequency = 1, amplitude = 1) =>
  sequence(
    length,
    index => Math.cos(index / length * Math.PI * 2 * frequency) * amplitude
  );

const sawWave = (length, cycles = 1) =>
  sequence(
    length,
    index => ((index * cycles) / length) % 1
  );

const triangleWave = (length, cycles = 1) =>
  sequence(length, index => {
    const phase = ((index * cycles) / length) % 1;
    return 1 - Math.abs(phase * 2 - 1);
  });

const smooth = t =>
  t * t * (3 - 2 * t);

const smoother = t =>
  t * t * t * (t * (t * 6 - 15) + 10);

const bell = (x, center = 0, width = 1) =>
  Math.exp(-((x - center) ** 2) / (2 * width ** 2));

const gaussian = random => {
  let a = 0;
  let b = 0;

  while (a === 0) a = random();
  while (b === 0) b = random();

  return Math.sqrt(-2 * Math.log(a)) *
    Math.cos(Math.PI * 2 * b);
};

const weighted = (items, weights, random = Math.random) => {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = random() * total;

  for (let i = 0; i < items.length; i++) {
    cursor -= weights[i];

    if (cursor < 0) {
      return items[i];
    }
  }

  return items[items.length - 1];
};

const memoize = function (fn) {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }

    return cache.get(key);
  };
};

const factorial = memoize(n => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
});

const triangular = n =>
  n * (n + 1) / 2;

const pentagonal = n =>
  n * (3 * n - 1) / 2;

const collatz = start => {
  const values = [start];
  let current = start;

  while (current !== 1 && values.length < 10000) {
    current = current % 2 === 0
      ? current / 2
      : current * 3 + 1;

    values.push(current);
  }

  return values;
};

const digitalRoot = number => {
  let value = Math.abs(Math.trunc(number));

  while (value >= 10) {
    value = String(value)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return value;
};

const palindrome = value => {
  const text = String(value);
  return text === [...text].reverse().join("");
};

const caesar = (text, shift) =>
  [...text].map(character => {
    const code = character.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      return String.fromCharCode(
        ((code - 65 + shift) % 26 + 26) % 26 + 65
      );
    }

    if (code >= 97 && code <= 122) {
      return String.fromCharCode(
        ((code - 97 + shift) % 26 + 26) % 26 + 97
      );
    }

    return character;
  }).join("");

const alternating = (length, first = 1) =>
  sequence(length, index =>
    index % 2 === 0 ? first : -first
  );

const gradient = (length, start, end) =>
  sequence(length, index => {
    const t = length <= 1 ? 0 : index / (length - 1);
    return start + (end - start) * t;
  });

void hash;
void seeded;
void randomInteger;
void randomFloat;
void choose;
void shuffle;
void sequence;
void sineWave;
void cosineWave;
void sawWave;
void triangleWave;
void smooth;
void smoother;
void bell;
void gaussian;
void weighted;
void memoize;
void factorial;
void triangular;
void pentagonal;
void collatz;
void digitalRoot;
void palindrome;
void caesar;
void alternating;
void gradient;
