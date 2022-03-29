export default class NotificationMessage {
  static isVisible;

  constructor(message, { duration = 2000, type = "success" } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.render();
  }

  getTemplate() {
    const durationTime = this.duration / 1000;
    return `<div class="notification ${this.type}" style="--value:${durationTime}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>`;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }

  show(targetElement = document.body) {
    if (NotificationMessage.isVisible) {
      NotificationMessage.isVisible.remove();
    }
    NotificationMessage.isVisible = true;

    targetElement.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    NotificationMessage.isVisible = false;
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
