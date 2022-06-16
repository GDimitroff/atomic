import { projectsController } from './projectsController';

export const displayController = (() => {
  const body = document.querySelector('body');
  const changeTheme = body.querySelector('.header-right');
  const newProjectBtn = body.querySelector('.projects-header > .fa-plus');
  const newTaskBtn = body.querySelector('.add-task-button');
  const newTaskForm = body.querySelector('.new-task-form');

  changeTheme.addEventListener('click', (e) => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.className);
  });

  newProjectBtn.addEventListener('click', (e) => {
    const newProjectSection = body.querySelector('.new-project');
    newProjectSection.classList.toggle('show');
  });

  newTaskBtn.addEventListener('click', (e) => {
    newTaskForm.classList.toggle('show');
  });

  const taskCards = document.querySelectorAll('.task-card');
  taskCards.forEach((taskCard) => {
    taskCard.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('completed');
    });
  });

  const init = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      theme === 'light'
        ? body.classList.add('light')
        : body.classList.remove('light');
    }

    const projects = projectsController.getProjects();
  };

  return {
    init,
  };
})();
