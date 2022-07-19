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

        displayController.setTasksCount();
        displayController.setActiveProject('all');
        return;
      }

      displayController.setActiveProject(id);
    });
  };

  const handleProjectForm = (formContainer) => {
    formContainer.addEventListener('click', (e) => {
      const classes = e.target.classList;

      if (classes.contains('fa-plus')) {
        displayController.openProjectForm();
        return;
      }

      if (classes.contains('fa-angle-down')) {
        displayController.closeProjectForm();
        return;
      }

      if (e.target.type === 'submit') {
        e.preventDefault();

        const form = e.target.parentElement.parentElement;
        const formData = new FormData(form);
        const projectTitle = formData.get('project-title');
        const projectColor = formData.get('color');

        if (projectTitle.trim() === '') {
          const nameInput = form.querySelector('input[type="text"]');
          nameInput.classList.add('invalid');

          nameInput.addEventListener('focus', (e) => {
            nameInput.classList.remove('invalid');
          });
          return;
        }

        if (projectColor.trim() === '') return;

        const projectId = uuidv4();
        const project = new Project(projectId, projectTitle, projectColor);
        const projectTile = createTile(project);

        projectsController.addProject(project);
        displayController.appendProject(projectTile);
        displayController.setActiveProject(projectId);
        displayController.closeProjectForm();
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
        displayController.setTasksCount();
        return;
      }

      if (classes.contains('fa-star')) {
        projectsController.toggleImportant(id, projectId);
        displayController.toggleImportant(card);
        displayController.setTasksCount();
        return;
      }

      projectsController.toggleCompleted(id, projectId);
      displayController.toggleCompleted(card);
      displayController.setTasksCount();
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
        displayController.setTasksCount();
        form.reset();
      }
    });
  };

  const handleEditTaskForm = (editTaskForm) => {
    editTaskForm.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-close')) {
        displayController.closeEditTaskModal();
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
    handleEditTaskForm
  };
})();
