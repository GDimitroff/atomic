import { projectsController } from './projectsController';
import createSidebar from '../components/sidebar';
import createTasksHeader from '../components/tasksHeader';
import createCard from '../components/card';
import createCardForm from '../components/cardForm';
import Project from '../models/Project';
import { v4 as uuidv4 } from 'uuid';
import { isToday, isThisWeek } from 'date-fns';
import createTile from '../components/tile';
import createHeader from '../components/header';
import createTasksSection from '../components/tasks';

export const displayController = (() => {
  const body = document.querySelector('body');
  const main = body.querySelector('.main');

  let header = null;
  let sidebar = null;
  let sectionTasks = null;
  
  let tasksCards = null;
  let toggleMenu = null;

  function handleHeader(e) {
    const classes = e.target.classList;

    if (classes.contains('fa-bars')) {
      openSidebar(toggleMenu);
      return;
    }

    if (classes.contains('fa-xmark')) {
      closeSidebar(toggleMenu);
      return;
    }

    if (classes.contains('fa-sun') || classes.contains('fa-moon')) {
      toggleTheme();
      return;
    }
  }

  function handleSidebar(e) {
    const projectsTiles = sidebar.querySelectorAll('.menu-tiles > .tile');
    const projectsList = sidebar.querySelector('.projects-list');
    const classes = e.target.classList;

    if (classes.contains('fa-plus') || classes.contains('fa-angle-down')) {
      toggleNewProjectForm();
      return;
    }

    if (classes.contains('fa-trash-can')) {
      const projectTile = e.target.parentElement.parentElement;
      const projectId = projectTile.dataset.id;

      projectsController.removeProject(projectId);
      projectTile.remove();

      setTasksCount(projectsTiles);
      setActiveProject('all');
      return;
    }

    if (classes.contains('tile')) {
      setActiveProject(e.target.dataset.id);
      return;
    }

    if (e.target.parentElement.parentElement.classList.contains('tile')) {
      setActiveProject(e.target.parentElement.parentElement.dataset.id);
      return;
    }

    if (e.target.type === 'submit') {
      e.preventDefault();

      const form = e.target.parentElement.parentElement;
      const formData = new FormData(form);
      const projectName = formData.get('project-name');
      const projectColor = formData.get('color');

      if (projectName.trim() === '' || projectColor.trim() === '') return;

      const projectId = uuidv4();
      const project = new Project(projectId, projectName, projectColor);

      projectsController.addProject(project);
      projectsList.prepend(createTile(project));
      setActiveProject(projectId);
      toggleNewProjectForm();
      form.reset();
    }
  }

  function openSidebar(toggleMenu) {
    sidebar.classList.add('open');
    sidebar.classList.remove('close');
    sectionTasks.classList.add('inactive');
    toggleMenu.querySelector('.fa-bars').style.display = 'none';
    toggleMenu.querySelector('.fa-xmark').style.display = 'flex';
  }

  function closeSidebar(toggleMenu) {
    sidebar.classList.remove('open');
    sidebar.classList.add('close');
    sectionTasks.classList.remove('inactive');
    toggleMenu.querySelector('.fa-bars').style.display = 'flex';
    toggleMenu.querySelector('.fa-xmark').style.display = 'none';
  }

  function toggleTheme() {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.className);
  }

  function toggleNewProjectForm() {
    const newProjectBtn = sidebar.querySelector('.projects-header > i');

    if (newProjectBtn.className === 'fa-solid fa-plus') {
      newProjectBtn.className = 'fa-solid fa-angle-down';
    } else {
      newProjectBtn.className = 'fa-solid fa-plus';
    }

    const newProjectSection = sidebar.querySelector('.new-project');
    newProjectSection.classList.toggle('show');
  }

  function setTasksCount(projectsTiles) {
    projectsTiles.forEach((tile) => {
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
  }

  function setActiveProject(filter) {
    const projectTiles = sidebar.querySelectorAll('.tile');

    projectTiles.forEach((tile) => {
      tile.classList.remove('active');
      if (tile.dataset.id === filter) {
        tile.classList.add('active');

        const displayText = tile.querySelector('.left > p').textContent;
        if (tile.parentElement.classList.contains('projects-tiles')) {
          renderTasksHeader(displayText, false);
        } else {
          renderTasksHeader(displayText, true);
        }
      }
    });

    renderTasks(filter);
    closeSidebar(toggleMenu);
  }

  const openTaskForm = (mode, projectName) => {
    const firstCard = tasksCards.children[0];
    if (firstCard && firstCard.classList.contains('new-task-card')) return;

    const newTaskForm = createCardForm(mode, projectName);
    tasksCards.prepend(newTaskForm);
  };

  const closeTaskForm = () => {
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

  const appendTask = (newTask, projectId) => {
    const tasksTitle = body.querySelector('.tasks-title');
    const project = projectsController.getProjectById(projectId);

    if (project.name === tasksTitle.textContent) {
      const taskFormCard = body.querySelector('.new-task-card');
      taskFormCard.after(createCard(newTask, project));
      return;
    }

    setActiveProject(projectId);
  };

  const removeCard = (task) => {
    task.style.animation = '0.4s fade-out';

    task.addEventListener(
      'animationend',
      (e) => {
        task.remove();
      },
      { once: true }
    );
  };

  const toggleImportant = (task) => {
    task.classList.toggle('important');
  };

  const toggleCompleted = (task) => {
    task.classList.toggle('completed');
  };

  const toggleConfirmationScreen = (card) => {
    card.classList.toggle('inactive');
    card.children[0].classList.toggle('active');
  };

  function renderHeader() {
    header = createHeader();
    toggleMenu = header.querySelector('.toggle-menu');
    header.addEventListener('click', handleHeader);
    body.prepend(header);
  }

  function renderSidebar() {
    sidebar = createSidebar();
    sidebar.addEventListener('click', handleSidebar);

    main.appendChild(sidebar);
  }

  function renderTasksSection() {
    sectionTasks = createTasksSection();
    tasksCards = sectionTasks.querySelector('.tasks-cards');

    main.appendChild(sectionTasks);
  }

  const renderTasksHeader = (title, showButton = false) => {
    const currentHeader = sectionTasks.querySelector('.tasks-header');
    if (currentHeader) {
      sectionTasks.children[0].remove();
    }

    const tasksHeader = createTasksHeader(title, showButton);
    sectionTasks.prepend(tasksHeader);
  };

  const renderTasks = (filter) => {
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
      const project = projectsController.getProjectById(task.projectId);
      tasksCards.appendChild(createCard(task, project));
    });
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
    renderTasksSection();
    renderTasksHeader('All tasks');
    renderTasks('all');
  };

  return {
    init,
  };
})();
