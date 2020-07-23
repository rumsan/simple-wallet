class Component {
  constructor(cfg) {
    if (!$) throw Error('jQuery($) library is not found');

    Object.assign(this, cfg);
    this.comp = $(this.target);
    this.eventStore = [];

    this.listeners = this.listeners || {};
  }

  addMixin(mixin) {
    if (mixin.events) this.eventStore = [...this.eventStore, ...mixin.events];
    if (mixin.init) mixin.init(this);
    Object.assign(this, mixin);
  }

  select(selector) {
    selector = selector || '';
    return $(`${this.target} ${selector}`);
  }

  registerEvents() {
    this.eventStore = [...this.eventStore, ...arguments];

    // activate listeners
    for (const event in this.listeners) {
      const action = this.listeners[event];
      this.on(event, action);
    }
  }

  addListeners(listeners) {
    for (const event in listeners) {
      const action = listeners[event];
      this.on(event, action);
    }
  }

  on(event, cb) {
    const exists = this.eventStore.find((e) => e === event);
    if (!exists) throw Error(`Event [${event}] is not registered`);
    $(this.target).on(event, cb);
  }

  trigger(event, data) {
    const exists = this.eventStore.find((e) => e === event);
    if (!exists) throw Error(`Event [${event}] is not registered`);
    $(this.target).trigger(event, data);
  }

  fire(event, data) {
    this.trigger(event, data);
  }

  setValues(data) {
    const fields = [...document.querySelectorAll(`${this.target} [data-field]`)];
    fields.forEach((f) => {
      const el = $(f);
      const fName = el.data('field');
      el.html(data[fName]);
    });
  }
}

export default Component;
