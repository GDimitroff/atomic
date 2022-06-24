import { projectsController } from './projectsController';
import createCard from '../components/card';
import createCardForm from '../components/cardForm';
import createTile from '../components/tile';
import createTasksHeader from '../components/tasksHeader';

export const displayController = (() => {
  const body = document.querySelector('body');
  const sidebar = body.querySelector('.sidebar');
  const projectsTiles = body.querySelectorAll('.projects-tiles > .tile');
  const projectsList = body.querySelector('.projects-list');
  const projectsCount = body.querySelector('.projects-count');
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

  const setActiveProject = (filter) => {
    const projectTiles = body.querySelectorAll('.tile');
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
    closeSidebar();
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
      projectsController.getProjects().forEach((project) => {
        tasks.push(...project.tasks);
      });
    } else if (filter === 'important') {
      tasks = projectsController.getImportantTasks();
    } else if (filter === 'completed') {
      tasks = projectsController.getCompletedTasks();
    } else {
      projectsController.getProjects().forEach((project) => {
        if (project.id === filter) {
          tasks.push(...project.tasks);
        }
      });
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

    setTasksCount();
    renderProjects();
    renderTasksHeader('All tasks');
    renderTasks('all');
  };

  return {
    init,
    openSidebar,
    closeSidebar,
    toggleTheme,
    toggleNewProjectForm,
    openTaskForm,
    closeTaskForm,
    setActiveProject,
    appendTask,
    removeCard,
    toggleImportant,
    toggleCompleted,
    renderProjects,
    setTasksCount,
  };
})();
