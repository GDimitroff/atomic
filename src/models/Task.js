export default class Task {
  #id;
  #title;
  #project;
  #description;
  #priority;
  #date;
  #isCompleted;
  #isImportant;

  constructor(
    id,
    title,
    project,
    description,
    priority,
    date,
    isCompleted,
    isImportant
  ) {
    this.#id = id;
    this.#title = title;
    this.#project = project;
    this.#description = description;
    this.#priority = priority;
    this.#date = date;
    this.#isCompleted = isCompleted;
    this.#isImportant = isImportant;
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

  get project() {
    return this.#project;
  }

  set project(project) {
    this.#project = project;
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    this.#description = description;
  }

  get priority() {
    return this.#priority;
  }

  set priority(priority) {
    this.#priority = priority;
  }

  get date() {
    return this.#date;
  }

  set date(date) {
    this.#date = date;
  }

  get isCompleted() {
    return this.#isCompleted;
  }

  set isCompleted(isCompleted) {
    this.#isCompleted = isCompleted;
  }

  get isImportant() {
    return this.#isImportant;
  }

  set isImportant(isImportant) {
    this.#isImportant = isImportant;
  }
}
