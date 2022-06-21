import { projectsController } from './projectsController';
import createCard from '../components/card';
import createNewCardForm from '../components/new-card-form';
import createTile from '../components/tile';

export const displayController = (() => {
  const body = document.querySelector('body');
  const sidebar = body.querySelector('.sidebar');
  const projectsTiles = body.querySelectorAll('.projects-tiles > .tile');
  const projectsList = body.querySelector('.projects-list');
  const projectsCount = body.querySelector('.projects-count');
  const sectionTasks = body.querySelector('.section-tasks');
  const tasksTitle = body.querySelector('.tasks-title');
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

  const setTasksCount = () => {
    projectsTiles.forEach((tile) => {
      const tasksCount = tile.children[1].children[0];

      if (tile.dataset.id === 'all') {
        let count = 0;
        projectsController.getProjects().forEach((project) => {
          project.tasks.forEach((task) => {
            count += 1;
          });
        });

        tasksCount.textContent = count;
      } else {
        // TODO: Implement correct dates first
        tasksCount.textContent = '';
      }
    });
  };

  const setActiveProject = (id) => {
    const projectTiles = body.querySelectorAll('.tile');
    projectTiles.forEach((tile) => {
      tile.classList.remove('active');
      if (tile.dataset.id === id) {
        tasksTitle.textContent = tile.querySelector('.left > p').textContent;
        tile.classList.add('active');
      }
    });

    renderTasks(id);
    closeSidebar();
  };

  const renderProjects = () => {
    projectsList.innerHTML = '';

    const projects = projectsController.getProjects();

    projects.forEach((project) => {
      const projectTile = createTile(project);

      renderTasks(project.id);
      projectsList.appendChild(projectTile);
    });

    projectsCount.textContent = projects.length;
  };

  const renderTasks = (filter) => {
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

    setTasksCount();
    renderProjects();
    renderTasks('all');
  };

  return {
    init,
    openSidebar,
    closeSidebar,
    toggleTheme,
    toggleNewProjectForm,
    openNewTaskForm,
    closeNewTaskForm,
    setActiveProject,
    renderProjects,
  };
})();
