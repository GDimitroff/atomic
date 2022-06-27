import { displayController } from './displayController';
import { projectsController } from './projectsController';
import Task from '../models/Task';
import { v4 as uuidv4 } from 'uuid';

export const actionsController = (() => {

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
        let { title, projectId, description, priority, date } =
          Object.fromEntries(formData);

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
      const projectId = e.currentTarget.dataset.projectId;

      if (
        classes.contains('fa-trash-can') ||
        e.target.classList.contains('cancel')
      ) {
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

  return;
})();
