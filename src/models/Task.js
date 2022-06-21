export default class Task {
  constructor(
    id,
    projectName,
    projectColor,
    title,
    description,
    priority,
    date,
    isCompleted,
    isImportant
  ) {
    this.id = id;
    this.projectName = projectName;
    this.projectColor = projectColor;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.date = date;
    this.isCompleted = isCompleted;
    this.isImportant = isImportant;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get projectName() {
    return this._projectName;
  }

  set projectName(projectName) {
    this._projectName = projectName;
  }

  get projectColor() {
    return this._projectColor;
  }

  set projectColor(projectColor) {
    this._projectColor = projectColor;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    this._priority = priority;
  }

  get date() {
    return this._date;
  }

  set date(date) {
    this._date = date;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  set isCompleted(isCompleted) {
    this._isCompleted = isCompleted;
  }

  get isImportant() {
    return this._isImportant;
  }

  set isImportant(isImportant) {
    this._isImportant = isImportant;
  }
}
