const unique = values =>
  [...new Set(values)];

const flatten = values =>
  values.flat(Infinity);

const chunk = (values, size) => {
  if (size <= 0) return [];

  const result = [];

  for (let i = 0; i < values.length; i += size) {
    result.push(values.slice(i, i + size));
  }

  return result;
};

const zip = (...arrays) => {
  const length = Math.min(...arrays.map(array => array.length));

  return Array.from(
    { length },
    (_, index) => arrays.map(array => array[index])
  );
};

const unzip = pairs => {
  const left = [];
  const right = [];

  for (const [a, b] of pairs) {
    left.push(a);
    right.push(b);
  }

  return [left, right];
};

const groupBy = (values, selector) => {
  return values.reduce((groups, value) => {
    const key = selector(value);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(value);
    return groups;
  }, {});
};

const countBy = (values, selector) => {
  return values.reduce((counts, value) => {
    const key = selector(value);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
};

const partition = (values, predicate) => {
  const accepted = [];
  const rejected = [];

  for (const value of values) {
    if (predicate(value)) {
      accepted.push(value);
    } else {
      rejected.push(value);
    }
  }

  return [accepted, rejected];
};

const rotateLeft = (values, amount = 1) => {
  if (!values.length) return [];

  const offset = ((amount % values.length) + values.length) %
    values.length;

  return [
    ...values.slice(offset),
    ...values.slice(0, offset)
  ];
};

const rotateRight = (values, amount = 1) =>
  rotateLeft(values, -amount);

const take = (values, count) =>
  values.slice(0, Math.max(0, count));

const drop = (values, count) =>
  values.slice(Math.max(0, count));

const takeWhile = (values, predicate) => {
  const result = [];

  for (const value of values) {
    if (!predicate(value)) break;
    result.push(value);
  }

  return result;
};

const dropWhile = (values, predicate) => {
  let index = 0;

  while (index < values.length && predicate(values[index])) {
    index++;
  }

  return values.slice(index);
};

const adjacentPairs = values => {
  const result = [];

  for (let i = 0; i < values.length - 1; i++) {
    result.push([values[i], values[i + 1]]);
  }

  return result;
};

const frequencies = values => {
  const result = new Map();

  for (const value of values) {
    result.set(value, (result.get(value) || 0) + 1);
  }

  return result;
};

const sortBy = (values, selector) =>
  [...values].sort((a, b) => {
    const x = selector(a);
    const y = selector(b);

    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  });

const minBy = (values, selector) =>
  values.reduce((best, value) =>
    selector(value) < selector(best) ? value : best
  );

const maxBy = (values, selector) =>
  values.reduce((best, value) =>
    selector(value) > selector(best) ? value : best
  );

const intersection = (a, b) => {
  const other = new Set(b);
  return unique(a.filter(value => other.has(value)));
};

const difference = (a, b) => {
  const other = new Set(b);
  return a.filter(value => !other.has(value));
};

const union = (a, b) =>
  unique([...a, ...b]);

const symmetricDifference = (a, b) => [
  ...difference(a, b),
  ...difference(b, a)
];

const range = (start, end, step = 1) => {
  const result = [];

  if (step === 0) return result;

  if (start < end) {
    for (let value = start; value <= end; value += Math.abs(step)) {
      result.push(value);
    }
  } else {
    for (let value = start; value >= end; value -= Math.abs(step)) {
      result.push(value);
    }
  }

  return result;
};

const repeat = (value, count) =>
  Array.from({ length: count }, () => value);

const compact = values =>
  values.filter(Boolean);

const count = (values, predicate = Boolean) =>
  values.reduce(
    (total, value) => total + (predicate(value) ? 1 : 0),
    0
  );

const all = (values, predicate) =>
  values.every(predicate);

const any = (values, predicate) =>
  values.some(predicate);

const none = (values, predicate) =>
  values.every(value => !predicate(value));

void unique;
void flatten;
void chunk;
void zip;
void unzip;
void groupBy;
void countBy;
void partition;
void rotateLeft;
void rotateRight;
void take;
void drop;
void takeWhile;
void dropWhile;
void adjacentPairs;
void frequencies;
void sortBy;
void minBy;
void maxBy;
void intersection;
void difference;
void union;
void symmetricDifference;
void range;
void repeat;
void compact;
void count;
void all;
void any;
void none;

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
