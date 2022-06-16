import './main.css';

const taskCard = document.querySelector('.task-card:not(:first-child)');
taskCard.addEventListener('click', (e) => {
  const classes = e.currentTarget.classList;
  classes.toggle('completed');
});

const changeTheme = document.querySelector('.header-right');
changeTheme.addEventListener('click', (e) => {
  document.querySelector('body').classList.toggle('light');
});

const addNewProject = document.querySelector('.projects-header > .fa-plus');
addNewProject.addEventListener('click', (e) => {
  const divNewProject = document.querySelector('.new-project');
  divNewProject.classList.toggle('show');
});

const newTaskForm = document.querySelector('.new-task-form');
const addNewBtn = document.querySelector('.add-task-button');
addNewBtn.addEventListener('click', (e) => {
  newTaskForm.classList.toggle('show');
});