import { displayController } from './displayController';
import { projectsController } from './projectsController';
import Project from '../models/Project';
import { v4 as uuidv4 } from 'uuid';

export const actionsController = (() => {
  const header = document.querySelector('.header');
  const sidebar = document.querySelector('.sidebar');
  const sectionTasks = document.querySelector('.section-tasks');

  const handleHeaderClicks = () => {
    header.addEventListener('click', (e) => {
      const classes = e.target.classList;

      if (classes.contains('fa-bars')) {
        displayController.openSidebar();
        return;
      }

      if (classes.contains('fa-xmark')) {
        displayController.closeSidebar();
        return;
      }

      if (classes.contains('fa-sun') || classes.contains('fa-moon')) {
        displayController.toggleTheme();
        return;
      }
    });
  };

  const handleSidebarClicks = () => {
    sidebar.addEventListener('click', (e) => {
      const classes = e.target.classList;

      if (classes.contains('fa-plus') || classes.contains('fa-angle-down')) {
        displayController.toggleNewProjectForm();
        return;
      }

      if (classes.contains('fa-trash-can')) {
        // TODO: Modal to confirm removal should be implemented
        const projectId = e.target.parentElement.parentElement.dataset.id;
        projectsController.removeProject(projectId);

        displayController.setTasksCount();
        displayController.renderProjects();
        displayController.setActiveProject('all');
        return;
      }

      if (classes.contains('tile')) {
        displayController.setActiveProject(e.target.dataset.id);
        return;
      }

      if (e.target.parentElement.parentElement.classList.contains('tile')) {
        displayController.setActiveProject(
          e.target.parentElement.parentElement.dataset.id
        );
        return;
      }

      if (e.target.type === 'submit') {
        e.preventDefault();

        const form = e.target.parentElement.parentElement;
        const formData = new FormData(form);
        const projectTitle = formData.get('project-title');
        const projectColor = formData.get('color');

        if (projectTitle.trim() === '' || projectColor.trim() === '') return;

        const projectId = uuidv4();
        const project = new Project(projectId, projectTitle, projectColor);
        projectsController.addProject(project);
        displayController.renderProjects();
        displayController.setActiveProject(projectId);

        form.reset();
      }
    });
  };

  const handleTasksClicks = () => {
    sectionTasks.addEventListener('click', (e) => {
      const classes = e.target.classList;

      if (classes.contains('btn-add')) {
        displayController.openNewTaskForm();
        return;
      }

      if (classes.contains('close-task')) {
        displayController.closeNewTaskForm();
        return;
      }
    });
  };

  const init = () => {
    handleHeaderClicks();
    handleSidebarClicks();
    handleTasksClicks();
  };

  return {
    init,
  };
})();
