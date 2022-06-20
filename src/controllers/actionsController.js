import { displayController } from './displayController';

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

      if (classes.contains('tile')) {
        displayController.setActiveProjects(e.target);
        return;
      }

      if (e.target.parentElement.parentElement.classList.contains('tile')) {
        displayController.setActiveProjects(
          e.target.parentElement.parentElement
        );
        return;
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
