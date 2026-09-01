class AuroraStore {
  constructor(initialState = {}, options = {}) {
    this.state = structuredClone(initialState);
    this.listeners = new Set();
    this.middlewares = [];
    this.history = [];
    this.future = [];
    this.batchDepth = 0;
    this.pendingNotification = false;
    this.maxHistory = options.maxHistory ?? 50;
  }

  getState() {
    return structuredClone(this.state);
  }

  subscribe(listener, selector = state => state) {
    let previous = selector(this.state);

    const subscription = {
      listener,
      selector,
      previous
    };

    this.listeners.add(subscription);

    return () => {
      this.listeners.delete(subscription);
    };
  }

  use(middleware) {
    if (typeof middleware !== "function") {
      throw new TypeError("Middleware must be a function.");
    }

    this.middlewares.push(middleware);
    return this;
  }

  setState(updater, meta = {}) {
    const previous = this.getState();

    let nextState =
      typeof updater === "function"
        ? updater(this.getState())
        : updater;

    if (!nextState || typeof nextState !== "object") {
      throw new TypeError("State must be an object.");
    }

    const action = {
      type: meta.type ?? "STATE_UPDATE",
      payload: meta.payload ?? null,
      previous,
      next: nextState,
      timestamp: Date.now()
    };

    const execute = index => {
      if (index >= this.middlewares.length) {
        this.state = structuredClone(nextState);
        this.recordHistory(previous);
        this.future = [];
        this.scheduleNotification();
        return;
      }

      const middleware = this.middlewares[index];

      middleware(
        {
          getState: () => this.getState(),
          setState: value => {
            nextState =
              typeof value === "function"
                ? value(nextState)
                : value;
          }
        },
        action,
        () => execute(index + 1)
      );
    };

    execute(0);

    return this.getState();
  }

  recordHistory(state) {
    this.history.push(structuredClone(state));

    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }

  notify() {
    this.pendingNotification = false;

    for (const subscription of this.listeners) {
      const current = subscription.selector(this.state);

      if (!Object.is(current, subscription.previous)) {
        const oldValue = subscription.previous;
        subscription.previous = current;

        subscription.listener(
          current,
          oldValue,
          this.getState()
        );
      }
    }
  }

  scheduleNotification() {
    if (this.batchDepth > 0) {
      this.pendingNotification = true;
      return;
    }

    queueMicrotask(() => this.notify());
  }

  batch(callback) {
    this.batchDepth++;

    try {
      callback();
    } finally {
      this.batchDepth--;

      if (this.batchDepth === 0 && this.pendingNotification) {
        this.notify();
      }
    }
  }

  undo() {
    if (this.history.length === 0) {
      return false;
    }

    const previous = this.history.pop();

    this.future.push(structuredClone(this.state));
    this.state = structuredClone(previous);

    this.scheduleNotification();

    return true;
  }

  redo() {
    if (this.future.length === 0) {
      return false;
    }

    const next = this.future.pop();

    this.history.push(structuredClone(this.state));
    this.state = structuredClone(next);

    this.scheduleNotification();

    return true;
  }

  select(selector) {
    if (typeof selector !== "function") {
      throw new TypeError("Selector must be a function.");
    }

    return selector(this.state);
  }

  reset(state = {}) {
    this.history.push(this.getState());
    this.future = [];
    this.state = structuredClone(state);
    this.scheduleNotification();
  }

  destroy() {
    this.listeners.clear();
    this.middlewares.length = 0;
    this.history.length = 0;
    this.future.length = 0;
  }
}

  next();
};

const timestampMiddleware = (context, action, next) => {
  action.timestamp = new Date().toISOString();
  next();
};
const appStore = new AuroraStore({
  user: {
    name: "Alex",
    online: true
  },
  preferences: {
    theme: "night",
    notifications: true
  },
  counter: 0
});

appStore
  .use(loggerMiddleware)
  .use(timestampMiddleware)

appStore.setState(
  state => ({
    ...state,
    counter: state.counter + 1
  }),
  {
    type: "COUNTER_INCREMENT"
  }
);

appStore.batch(() => {
  appStore.setState(state => ({
    ...state,
    counter: state.counter + 1
  }));

  appStore.setState(state => ({
    ...state,
    preferences: {
      ...state.preferences,
      notifications: false
    }
  }));
});

window.AuroraStore = AuroraStore;
window.appStore = appStore;
window.unsubscribeAurora = unsubscribe;
