export default class Project {
  constructor(id, title, color) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.tasks = [];
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
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
