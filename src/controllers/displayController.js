import { projectsController } from './projectsController';
import createCard from '../components/card';
import createNewCardForm from '../components/new-card-form';

export const displayController = (() => {
  const body = document.querySelector('body');
  const main = body.querySelector('.main');
  const sidebar = body.querySelector('.sidebar');
  const sectionTasks = body.querySelector('.section-tasks');
  const tasksCards = body.querySelector('.tasks-cards');
  const toggleMenu = body.querySelector('.toggle-menu');
  const changeTheme = body.querySelector('.header > .right');
  const newProjectBtn = body.querySelector('.projects-header > .fa-plus');
  const newTaskBtn = body.querySelector('.btn-add');
  const newTaskCard = body.querySelector('.new-task-card');

  toggleMenu.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      sidebar.classList.add('close');
      sectionTasks.classList.remove('inactive');
      toggleMenu.querySelector('.fa-bars').style.display = 'flex';
      toggleMenu.querySelector('.fa-xmark').style.display = 'none';
    } else {
      sidebar.classList.add('open');
      sidebar.classList.remove('close');
      sectionTasks.classList.add('inactive');
      toggleMenu.querySelector('.fa-bars').style.display = 'none';
      toggleMenu.querySelector('.fa-xmark').style.display = 'flex';
    }
  });

  changeTheme.addEventListener('click', (e) => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.className);
  });

  newProjectBtn.addEventListener('click', (e) => {
    if (newProjectBtn.className === 'fa-solid fa-plus') {
      newProjectBtn.className = 'fa-solid fa-angle-down';

      const newProjectForm = body.querySelector('.new-project-form');
      newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('--> new project form submit');
      });
    } else {
      newProjectBtn.className = 'fa-solid fa-plus';
    }

    const newProjectSection = body.querySelector('.new-project');
    newProjectSection.classList.toggle('show');
  });

  newTaskBtn.addEventListener('click', (e) => {
    if (tasksCards.children[0].classList.contains('new-task-card')) return;

    const newTaskForm = createNewCardForm();
    tasksCards.prepend(newTaskForm);

    newTaskForm.querySelector('.btn').addEventListener('click', (e) => {
      newTaskForm.remove();
    });
  });

  const taskCards = document.querySelectorAll('.task-card');
  taskCards.forEach((taskCard) => {
    taskCard.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('completed');
    });
  });

  function renderCards(filter) {
    const projects = projectsController.getProjects();

    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        tasksCards.appendChild(createCard(project.title, task, project.color));
      });
    });
  }

  const init = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      theme === 'light'
        ? body.classList.add('light')
        : body.classList.remove('light');
    }

    renderCards('all');
  };

  return {
    init,
  };
})();
