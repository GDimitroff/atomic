export default class Task {
  constructor(
    id,
    title,
    projectId,
    description,
    priority,
    date,
    isCompleted,
    isImportant
  ) {
    this.id = id;
    this.title = title;
    this.projectId = projectId;
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

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get projectId() {
    return this._projectId;
  }

  set projectId(projectId) {
    this._projectId = projectId;
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
