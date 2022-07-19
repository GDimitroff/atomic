import { projectsController } from './projectsController';
import createHeader from '../components/header';
import createSidebar from '../components/sidebar';
import createTasksSection from '../components/tasks';
import createTasksHeader from '../components/tasksHeader';
import createCard from '../components/card';
import createCardForm from '../components/cardForm';
import { isToday, isThisWeek } from 'date-fns';
import createEditCardForm from '../components/editCardForm';

export const displayController = (() => {
  const body = document.querySelector('body');
  const main = body.querySelector('.main');
  const overlay = body.querySelector('.overlay');
  const modal = body.querySelector('.modal');

  overlay.addEventListener('click', (e) => {
    closeEditTaskModal();
  });

  const toggleTheme = () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.className);
  };

  const openSidebar = () => {
    const sidebar = body.querySelector('.sidebar');
    const toggleMenu = body.querySelector('.toggle-menu');
    const tasks = body.querySelector('.tasks');

    sidebar.classList.add('open');
    sidebar.classList.remove('close');
    tasks.classList.add('inactive');
    toggleMenu.querySelector('.fa-bars').style.display = 'none';
    toggleMenu.querySelector('.fa-xmark').style.display = 'flex';
  };

  const closeSidebar = () => {
    const sidebar = body.querySelector('.sidebar');
    const toggleMenu = body.querySelector('.toggle-menu');
    const tasks = body.querySelector('.tasks');

    sidebar.classList.remove('open');
    sidebar.classList.add('close');
    tasks.classList.remove('inactive');
    toggleMenu.querySelector('.fa-bars').style.display = 'flex';
    toggleMenu.querySelector('.fa-xmark').style.display = 'none';
  };

  const openProjectForm = () => {
    const sidebar = body.querySelector('.sidebar');
    const newProjectBtn = sidebar.querySelector('.projects-header > i');
    newProjectBtn.className = 'fa-solid fa-angle-down';

    const newProjectSection = sidebar.querySelector('.new-project');
    newProjectSection.classList.add('show');
  };

  const closeProjectForm = () => {
    const sidebar = body.querySelector('.sidebar');
    const newProjectBtn = sidebar.querySelector('.projects-header > i');
    newProjectBtn.className = 'fa-solid fa-plus';

    const newProjectSection = sidebar.querySelector('.new-project');
    newProjectSection.classList.remove('show');
  };

  const setTasksCount = () => {
    const menuTiles = body.querySelectorAll('.menu-tiles > .tile');

    menuTiles.forEach((tile) => {
      const tasksCount = tile.children[1].children[0];
      const tileId = tile.dataset.id;

      if (tileId === 'all') {
        let count = 0;
        projectsController.getProjects().forEach((project) => {
          count += project.tasks.length;
        });

        tasksCount.textContent = count || '';
      } else if (tileId === 'today') {
        tasksCount.textContent =
          projectsController.getTasksByDate(isToday).length || '';
      } else if (tileId === 'week') {
        tasksCount.textContent =
          projectsController.getTasksByDate(isThisWeek).length || '';
      } else if (tileId === 'important') {
        tasksCount.textContent =
          projectsController.getImportantTasks().length || '';
      } else if (tileId === 'completed') {
        tasksCount.textContent =
          projectsController.getCompletedTasks().length || '';
      }
    });
  };

  const setActiveProject = (filter) => {
    const tiles = body.querySelectorAll('.sidebar .tile');
    const currentProject = projectsController.getCurrentProject();
    const currentTitle = body.querySelector('.tasks-title');

    if (currentTitle.textContent === 'Today' && filter === 'today') return;

    if (currentTitle.textContent === 'This week' && filter === 'week') return;

    if (currentTitle.textContent === 'Important' && filter === 'important')
      return;

    if (currentTitle.textContent === 'Completed' && filter === 'completed')
      return;

    if (currentProject && filter === currentProject.id) return;

    tiles.forEach((tile) => {
      tile.classList.remove('active');
      if (tile.dataset.id === filter) {
        tile.classList.add('active');

        const displayText = tile.querySelector('.left > p').textContent;
        if (tile.parentElement.classList.contains('menu-tiles')) {
          renderTasksHeader(displayText, false);
          projectsController.setCurrentProject(null);
        } else {
          renderTasksHeader(displayText, true);
          projectsController.setCurrentProject(tile.dataset.id);
        }
      }
    });

    renderCards(filter);
    closeSidebar();
  };

  const appendProject = (newProject) => {
    const projectsList = body.querySelector('.projects-list');
    projectsList.prepend(newProject);
  };

  const openTaskForm = () => {
    const tasksCards = body.querySelector('.tasks-cards');
    const firstCard = tasksCards.children[0];
    if (firstCard && firstCard.classList.contains('new-task-card')) return;

    const newTaskForm = createCardForm();
    tasksCards.prepend(newTaskForm);
  };

  const closeTaskForm = () => {
    const tasksCards = body.querySelector('.tasks-cards');
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

  const openEditTaskModal = (id) => {
    overlay.classList.add('active');
    modal.classList.add('active');
    body.classList.add('inactive');

    const editTask = createEditCardForm(id);
    modal.appendChild(editTask);
  };

  const closeEditTaskModal = () => {
    overlay.classList.remove('active');
    modal.classList.remove('active');
    body.classList.remove('inactive');

    modal.innerHTML = '';
  };

  const appendCard = (newCard, projectId) => {
    const currentProject = projectsController.getCurrentProject();
    const cardProject = projectsController.getProjectById(projectId);

    if (cardProject.id === currentProject.id) {
      const taskFormCard = body.querySelector('.new-task-card');
      taskFormCard.after(newCard);
      return;
    }

    setActiveProject(projectId);
  };

  const removeCard = (card) => {
    card.style.animation = '0.4s fade-out';

    card.addEventListener(
      'animationend',
      (e) => {
        card.remove();
      },
      { once: true }
    );
  };

  const updateCard = (id) => {
    const cards = body.querySelectorAll('.task-card');
    let card = null;
    cards.forEach((c) => {
      if (c.dataset.id === id) {
        card = c;
        return;
      }
    });

    const task = projectsController.getTaskById(id);
    const newCard = createCard(task);
    card.innerHTML = newCard.innerHTML;
  };

  const toggleImportant = (task) => {
    task.classList.toggle('important');
  };

  const toggleCompleted = (task) => {
    task.classList.toggle('completed');
  };

  const toggleConfirmationScreen = (element) => {
    element.classList.toggle('inactive');
    element.children[0].classList.toggle('active');
  };

  function renderCards(filter) {
    const tasksCards = body.querySelector('.tasks-cards');
    tasksCards.innerHTML = '';

    let tasks = [];
    if (filter === 'all') {
      tasks = projectsController.getTasks();
    } else if (filter === 'today') {
      tasks = projectsController.getTasksByDate(isToday);
    } else if (filter === 'week') {
      tasks = projectsController.getTasksByDate(isThisWeek);
    } else if (filter === 'important') {
      tasks = projectsController.getImportantTasks();
    } else if (filter === 'completed') {
      tasks = projectsController.getCompletedTasks();
    } else {
      tasks = projectsController.getProjectById(filter).tasks;
    }

    tasks.forEach((task) => {
      tasksCards.appendChild(createCard(task));
    });
  }

  function renderTasksHeader(title, showButton = false) {
    const tasks = body.querySelector('.tasks');
    const currentHeader = body.querySelector('.tasks-header');
    if (currentHeader) {
      tasks.children[0].remove();
    }

    const tasksHeader = createTasksHeader(title, showButton);
    tasks.prepend(tasksHeader);
  }

  const renderHeader = () => {
    const header = createHeader();
    body.prepend(header);
  };

  const renderSidebar = () => {
    const sidebar = createSidebar();
    main.appendChild(sidebar);
  };

  const renderTasks = () => {
    const tasks = createTasksSection();
    main.appendChild(tasks);
    renderCards('all');
  };

  const init = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      theme === 'light'
        ? body.classList.add('light')
        : body.classList.remove('light');
    }

    renderHeader();
    renderSidebar();
    renderTasks();
  };

  return {
    init,
    openSidebar,
    closeSidebar,
    toggleTheme,
    openProjectForm,
    closeProjectForm,
    setTasksCount,
    setActiveProject,
    appendProject,
    toggleConfirmationScreen,
    appendCard,
    removeCard,
    updateCard,
    toggleCompleted,
    toggleImportant,
    openTaskForm,
    closeTaskForm,
    openEditTaskModal,
    closeEditTaskModal,
  };
})();
