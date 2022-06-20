import { projectsController } from './projectsController';
import createCard from '../components/card';
import createNewCardForm from '../components/new-card-form';
import createTile from '../components/tile';

export const displayController = (() => {
  const body = document.querySelector('body');
  const sidebar = body.querySelector('.sidebar');
  const projectsList = body.querySelector('.projects-list');
  const sectionTasks = body.querySelector('.section-tasks');
  const tasksCards = body.querySelector('.tasks-cards');
  const toggleMenu = body.querySelector('.toggle-menu');
  const newProjectBtn = body.querySelector('.projects-header > .fa-plus');

  const openSidebar = () => {
    sidebar.classList.add('open');
    sidebar.classList.remove('close');
    sectionTasks.classList.add('inactive');
    toggleMenu.querySelector('.fa-bars').style.display = 'none';
    toggleMenu.querySelector('.fa-xmark').style.display = 'flex';
  };

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    sidebar.classList.add('close');
    sectionTasks.classList.remove('inactive');
    toggleMenu.querySelector('.fa-bars').style.display = 'flex';
    toggleMenu.querySelector('.fa-xmark').style.display = 'none';
  };

  const toggleTheme = () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.className);
  };

  const toggleNewProjectForm = () => {
    if (newProjectBtn.className === 'fa-solid fa-plus') {
      newProjectBtn.className = 'fa-solid fa-angle-down';
    } else {
      newProjectBtn.className = 'fa-solid fa-plus';
    }

    const newProjectSection = body.querySelector('.new-project');
    newProjectSection.classList.toggle('show');
  };

  const openNewTaskForm = () => {
    if (tasksCards.children[0].classList.contains('new-task-card')) return;

    const newTaskForm = createNewCardForm();
    tasksCards.prepend(newTaskForm);
  };

  const closeNewTaskForm = () => {
    const newTaskForm = tasksCards.children[0];
    newTaskForm.style.animation = '0.4s fade-out';

    newTaskForm.addEventListener(
      'animationend',
      (e) => {
        newTaskForm.remove();
      },
      { once: true }
    );
  };

  const renderTiles = () => {
    const projects = projectsController.getProjects();
    projects.forEach((project) => {
      const projectTile = createTile(project);

      renderCards(project.id);
      projectsList.appendChild(projectTile);
    });
  };

  const renderCards = (filter) => {
    tasksCards.innerHTML = '';

    const projects = projectsController.getProjects();

    projects
      .filter((project) => project.id === filter || filter === 'all')
      .forEach((project) => {
        project.tasks.forEach((task) => {
          tasksCards.appendChild(
            createCard(project.title, task, project.color)
          );
        });
      });
  };

  const init = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      theme === 'light'
        ? body.classList.add('light')
        : body.classList.remove('light');
    }

    renderTiles();
    renderCards('all');
  };

  return {
    init,
    openSidebar,
    closeSidebar,
    toggleTheme,
    toggleNewProjectForm,
    openNewTaskForm,
    closeNewTaskForm,
  };
})();
