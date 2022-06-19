export default class Task {
  #title;
  #project;
  #description;
  #priority;
  #date;
  #isCompleted;
  #isImportant;

  constructor(
    title,
    project,
    description,
    priority,
    date,
    isCompleted,
    isImportant
  ) {
    this.#title = title;
    this.#project = project;
    this.#description = description;
    this.#priority = priority;
    this.#date = date;
    this.#isCompleted = isCompleted;
    this.#isImportant = isImportant;
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
