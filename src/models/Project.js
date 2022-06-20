export default class Project {
  #id;
  #title;
  #color;
  #tasks;

  constructor(id, title, color) {
    this.#id = id;
    this.#title = title;
    this.#color = color;
    this.#tasks = [];
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
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
