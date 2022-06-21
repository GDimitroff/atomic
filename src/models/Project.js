export default class Project {
  constructor(id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.tasks = [];
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }
}
