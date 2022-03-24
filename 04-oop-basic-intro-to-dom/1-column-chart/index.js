export default class ColumnChart {
  chartHeight = 50;

  constructor({
    data = [],
    label = "",
    link = "",
    value = 0,
    formatHeading = (data) => data,
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;
    this.render();
  }

  getTemplate() {
    return `
<div class="column-chart" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        Total ${this.label}
              ${this.createLink()}
      </div>
      <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">
                ${this.formatHeading(this.value.toLocaleString("en-US"))}
            </div>
        <div data-element="body" class="column-chart__chart">
                ${this.createCharts(this.data)}
        </div>
      </div>
    </div>
    `;
  }

  createCharts(data) {
    const maxValue = Math.max(...data);

    return data
      .map((item) => {
        const scale = this.chartHeight / maxValue;
        const value = Math.floor(item * scale);
        const percent = ((item / maxValue) * 100).toFixed(0) + "%";
        return `<div style='--value: ${value}' data-tooltip='${percent}'></div>`;
      })
      .join("");
  }

  createLink() {
    return this.link
      ? `<a class="column-chart__link" href="${this.link}">View all</a>`
      : "";
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.getTemplate();

    this.element = element.firstElementChild;

    if (!this.data.length) {
      this.element.classList.add("column-chart_loading");
    }
  }

  update(data) {
    const chartColumns = this.element.querySelector(".column-chart__chart");
    chartColumns.innerHTML = this.createCharts(data);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
