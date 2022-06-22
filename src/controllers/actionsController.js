import { displayController } from './displayController';
import { projectsController } from './projectsController';
import Project from '../models/Project';
import Task from '../models/Task';
import { v4 as uuidv4 } from 'uuid';

export const actionsController = (() => {
  const header = document.querySelector('.header');
  const sidebar = document.querySelector('.sidebar');

  const handleHeader = () => {
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

  const handleSidebar = () => {
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
        const projectName = formData.get('project-name');
        const projectColor = formData.get('color');

        if (projectName.trim() === '' || projectColor.trim() === '') return;

        const projectId = uuidv4();
        const project = new Project(projectId, projectName, projectColor);
        projectsController.addProject(project);
        displayController.renderProjects();
        displayController.setActiveProject(projectId);
        displayController.toggleNewProjectForm();

        form.reset();
      }
    });
  };

  const handleTasksHeader = (tasksHeader, title) => {
    tasksHeader.addEventListener('click', (e) => {
      const target = e.target;
      const classes = target.classList;

      if (classes.contains('btn-add')) {
        const projectName = title;
        displayController.openTaskForm(false, projectName);
        return;
      }
    });
  };

  const handleCardForm = (cardForm) => {
    cardForm.addEventListener('click', (e) => {
      const target = e.target;
      const classes = target.classList;

      if (classes.contains('close-task')) {
        displayController.closeTaskForm();
      }

      if (target.type === 'submit') {
        e.preventDefault();

        const form = cardForm.children[0];
        const formData = new FormData(form);
        const { title, projectId, description, priority, date } =
          Object.fromEntries(formData);

        const newTask = new Task(
          uuidv4(),
          projectId,
          title,
          description,
          priority,
          date,
          false,
          false
        );

        projectsController.addTask(projectId, newTask);
        displayController.appendTask(newTask, projectId);
        displayController.setTasksCount();
        form.reset();
      }
    });
  };

  const handleCard = (card) => {
    card.addEventListener('click', (e) => {
      const classes = e.target.classList;
      const id = e.currentTarget.dataset.id;

      if (classes.contains('fa-trash-can')) {
        projectsController.removeTask(id);
        displayController.removeCard(card);
      }
    });
  };

  const init = () => {
    handleHeader();
    handleSidebar();
  };

  return {
    init,
    handleTasksHeader,
    handleCard,
    handleCardForm,
  };
})();
