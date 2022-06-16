export default class Project {
  #name;
  #color;
  #tasks;

  constructor(name, color) {
    this.#name = name;
    this.#color = color;
    this.#tasks = [];
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get color() {
    return this.#color;
  }

  set color(newColor) {
    this.#color = newColor;
  }

  get tasks() {
    return this.#tasks;
  }

  set tasks(newTasks) {
    this.#tasks = newTasks;
  }

  addTask(newTask) {
    this.#tasks.push(newTask);
  }
}
