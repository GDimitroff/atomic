export default class Project {
  #title;
  #color;
  #tasks;

  constructor(title, color) {
    this.#title = title;
    this.#color = color;
    this.#tasks = [];
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    this.#title = title;
  }

  get color() {
    return this.#color;
  }

  set color(color) {
    this.#color = color;
  }

  get tasks() {
    return this.#tasks;
  }

  set tasks(tasks) {
    this.#tasks = tasks;
  }

  addTask(task) {
    this.#tasks.push(task);
  }
}
