import { displayController } from './displayController';
import { projectsController } from './projectsController';
import Project from '../models/Project';
import Task from '../models/Task';
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
        const projectName = formData.get('project-name');
        const projectColor = formData.get('color');

        if (projectName.trim() === '' || projectColor.trim() === '') return;

        const projectId = uuidv4();
        const project = new Project(projectId, projectName, projectColor);
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
        const projectName =
          sectionTasks.children[0].children[0].children[0].textContent;
        console.log(projectName);
        displayController.openTaskForm(false, projectName);
        return;
      }

      if (classes.contains('fa-trash-can')) {
        const taskId =
          e.target.parentElement.parentElement.parentElement.parentElement
            .dataset.id;
        projectsController.removeTask(taskId);
        displayController.removeCard(taskId);
        return;
      }

      if (classes.contains('close-task')) {
        displayController.closeTaskForm();
        return;
      }

      if (e.target.type === 'submit') {
        e.preventDefault();

        const form = e.target.parentElement.parentElement.parentElement;
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
