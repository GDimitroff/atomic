import { projectsController } from './projectsController';

export const displayController = (() => {
  const body = document.querySelector('body');
  const sidebar = body.querySelector('.sidebar');
  const main = body.querySelector('.main');
  const toggleMenu = body.querySelector('.toggle-menu');
  const changeTheme = body.querySelector('.header-right');
  const newProjectBtn = body.querySelector('.projects-header > .fa-plus');
  const newTaskBtn = body.querySelector('.add-task-button');
  const newTaskForm = body.querySelector('.new-task-form');

  if (window.innerWidth < 704) {
    sidebar.classList.add('hide');
    main.classList.add('full-width');
  } else {
    sidebar.classList.remove('hide');
  }

  window.addEventListener('resize', (e) => {
    main.classList.remove('inactive');
    main.classList.remove('full-width');

    if (window.innerWidth < 704) {
      sidebar.classList.add('hide');
    } else {
      sidebar.classList.remove('hide');
    }
  });

  toggleMenu.addEventListener('click', (e) => {
    sidebar.style.display = 'block';
    sidebar.classList.toggle('hide');
    main.classList.toggle('full-width');

    if (window.innerWidth < 704) {
      main.classList.toggle('inactive');
    }
  });

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
