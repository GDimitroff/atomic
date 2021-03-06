import { displayController } from './displayController';
import { projectsController } from './projectsController';
import Project from '../models/Project';
import Task from '../models/Task';
import createTile from '../components/tile';
import createCard from '../components/card';
import { v4 as uuidv4 } from 'uuid';

export const actionsController = (() => {
  const handleHeader = (header) => {
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

  const handleMenuTiles = (menuTiles) => {
    Array.from(menuTiles.children).forEach((tile) => {
      tile.addEventListener('click', (e) => {
        displayController.setActiveProject(e.currentTarget.dataset.id);
      });
    });
  };

  const handleProjectTile = (tile) => {
    tile.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const classes = e.target.classList;

      if (classes.contains('fa-trash-can') || classes.contains('cancel')) {
        displayController.toggleConfirmationScreen(tile);
        return;
      }

      if (classes.contains('delete')) {
        projectsController.removeProject(id);
        tile.remove();

        displayController.updateTasksCount();
        displayController.updateProjectsCount();

        const currentProject = projectsController.getCurrentProject();
        if (currentProject) {
          displayController.setActiveProject('all');
        }

        displayController.showNotification(
          `Project deleted successfully!`,
          'bg-red'
        );

        return;
      }

      displayController.setActiveProject(id);
    });
  };

  const handleProjectForm = (formContainer) => {
    formContainer.addEventListener('click', (e) => {
      const classes = e.target.classList;
      const form = formContainer.querySelector('.new-project-form');
      const titleInput = formContainer.querySelector('input[type="text"]');

      if (classes.contains('fa-plus')) {
        displayController.openProjectForm();
        return;
      }

      if (classes.contains('fa-angle-down')) {
        displayController.closeProjectForm();
        titleInput.classList.remove('invalid');
        form.reset();
        return;
      }

      if (e.target.type === 'submit') {
        if (!form.checkValidity()) {
          titleInput.addEventListener('input', () => {
            titleInput.classList.remove('invalid');
            titleInput.setCustomValidity('');
            titleInput.checkValidity();
          });

          titleInput.addEventListener('invalid', () => {
            titleInput.classList.add('invalid');

            if (titleInput.value === '') {
              titleInput.setCustomValidity('Please enter project title!');
            }
          });

          return;
        }

        e.preventDefault();

        const formData = new FormData(form);
        const projectTitle = formData.get('project-title');
        const projectColor = formData.get('color');

        if (projectColor.trim() === '') return;

        const projectId = uuidv4();
        const project = new Project(projectId, projectTitle, projectColor);
        const projectTile = createTile(project);

        projectsController.addProject(project);
        displayController.appendProject(projectTile);
        displayController.setActiveProject(projectId);
        displayController.updateProjectsCount();
        displayController.closeProjectForm();
        displayController.showNotification(
          `Project "${projectTitle}" added successfully!`,
          'bg-green'
        );
        form.reset();
      }
    });
  };

  const handleCardsHeader = (cardsHeader) => {
    cardsHeader.addEventListener('click', (e) => {
      if (e.currentTarget === e.target) return;

      if (e.target.classList.contains('btn-add')) {
        displayController.openTaskForm();
      }
    });
  };

  const handleCard = (card) => {
    card.addEventListener('click', (e) => {
      const classes = e.target.classList;
      const id = card.dataset.id;
      const projectId = card.dataset.projectId;

      if (classes.contains('fa-pen-to-square')) {
        displayController.openEditTaskModal(id);
        return;
      }

      if (classes.contains('fa-trash-can') || classes.contains('cancel')) {
        displayController.toggleConfirmationScreen(card);
        return;
      }

      if (e.target.classList.contains('delete')) {
        projectsController.removeTask(id, projectId);
        displayController.removeCard(card);
        displayController.updateTasksCount();

        displayController.showNotification(
          `Task deleted successfully!`,
          'bg-red'
        );
        return;
      }

      if (classes.contains('fa-star')) {
        projectsController.toggleImportant(id, projectId);
        displayController.toggleImportant(card);
        displayController.updateTasksCount();
        return;
      }

      projectsController.toggleCompleted(id, projectId);
      displayController.toggleCompleted(card);
      displayController.updateTasksCount();
    });
  };

  const handleCardForm = (cardForm) => {
    cardForm.addEventListener('click', (e) => {
      const target = e.target;
      const classes = target.classList;

      if (classes.contains('close-task')) {
        displayController.closeTaskForm();
        return;
      }

      if (target.type === 'submit') {
        const form = cardForm.querySelector('.new-task-form');
        const titleInput = cardForm.querySelector('input[type="text"]');

        if (!form.checkValidity()) {
          titleInput.addEventListener('input', () => {
            titleInput.classList.remove('invalid');
            titleInput.setCustomValidity('');
            titleInput.checkValidity();
          });

          titleInput.addEventListener('invalid', () => {
            titleInput.classList.add('invalid');

            if (titleInput.value === '') {
              titleInput.setCustomValidity('Please enter task title!');
            }
          });

          return;
        }

        e.preventDefault();

        const formData = new FormData(form);
        let { title, projectId, description, priority, date } =
          Object.fromEntries(formData);

        if (projectId.trim() === '' || priority.trim() === '') return;

        if (!date) {
          date = null;
        } else {
          const [year, month, day] = date.split('-');
          date = `${day}.${month}.${year}`;
        }

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

        const newCard = createCard(newTask);

        projectsController.addTask(projectId, newTask);
        displayController.appendCard(newCard, projectId);
        displayController.updateTasksCount();
        displayController.showNotification(
          `Task "${title}" added successfully!`,
          'bg-green'
        );
        form.reset();
      }
    });
  };

  const handleEditTaskForm = (editTaskForm) => {
    editTaskForm.addEventListener('click', (e) => {
      const id = editTaskForm.dataset.id;

      if (e.target.classList.contains('btn-close')) {
        displayController.closeEditTaskModal();
        return;
      }

      if (e.target.type === 'submit') {
        const form = editTaskForm.querySelector('.edit-task-form');
        const titleInput = editTaskForm.querySelector('input[type="text"]');

        if (!form.checkValidity()) {
          titleInput.addEventListener('input', () => {
            titleInput.classList.remove('invalid');
            titleInput.setCustomValidity('');
            titleInput.checkValidity();
          });

          titleInput.addEventListener('invalid', () => {
            titleInput.classList.add('invalid');

            if (titleInput.value === '') {
              titleInput.setCustomValidity('Please enter task title!');
            }
          });

          return;
        }

        e.preventDefault();

        const formData = new FormData(form);
        let { title, projectId, description, priority, date } =
          Object.fromEntries(formData);

        if (title.trim() === '') {
          const nameInput = form.querySelector('input[type="text"]');
          nameInput.classList.add('invalid');

          nameInput.addEventListener('focus', (e) => {
            nameInput.classList.remove('invalid');
          });

          return;
        }

        if (projectId.trim() === '' || priority.trim() === '') return;

        if (!date) {
          date = null;
        } else {
          const [year, month, day] = date.split('-');
          date = `${day}.${month}.${year}`;
        }

        projectsController.updateTask(
          id,
          projectId,
          title,
          description,
          priority,
          date
        );

        displayController.updateCard(id);
        displayController.updateTasksCount();
        displayController.closeEditTaskModal();

        displayController.showNotification(
          `Task "${title}" edited successfully!`,
          'bg-green'
        );

        const currentProject = projectsController.getCurrentProject();
        if (currentProject) {
          displayController.setActiveProject(projectId);
        }

        form.reset();
      }
    });
  };

  return {
    handleHeader,
    handleMenuTiles,
    handleProjectTile,
    handleProjectForm,
    handleCardsHeader,
    handleCard,
    handleCardForm,
    handleEditTaskForm,
  };
})();
