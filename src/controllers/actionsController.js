import { displayController } from './displayController';

export const actionsController = (() => {
  document.addEventListener('click', (e) => {
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

    if (classes.contains('fa-plus') || classes.contains('fa-angle-down')) {
      displayController.toggleNewProjectForm();
      return;
    }

    if (classes.contains('btn-add')) {
      displayController.openNewTaskForm();
      return;
    }

    if (classes.contains('close-task')) {
      displayController.closeNewTaskForm();
      return;
    }
  });
})();
