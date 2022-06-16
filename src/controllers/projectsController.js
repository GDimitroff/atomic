import Project from '../models/Project';
import Task from '../models/Task';

export const projectsController = (() => {
  let projects = [];

  const init = () => {
    if (localStorage.getItem('projects') === null) {
      const defaultProject = new Project('Default', 'default');
      const defaultTask = new Task(
        'Buy gift for my bae',
        defaultProject,
        'If you dare to miss this you are gonna be homeless... and single!',
        'high',
        '11.03.2023',
        false
      );
      defaultProject.addTask(defaultTask);
      projects.push(defaultProject);
    } else {
      projects = localStorage.getItem('projects');
    }
  };

  const getProjects = () => {
    return projects;
  };

  return { init, getProjects };
})();
