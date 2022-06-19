import Project from '../models/Project';
import Task from '../models/Task';

export const projectsController = (() => {
  let projects = [];

  const init = () => {
    if (localStorage.getItem('projects') === null) {
      const defaultProject1 = new Project('Workout', 'purple');
      const defaultProject2 = new Project('Education', 'gold');
      const defaultTask1 = new Task(
        'Buy gift for my bae',
        defaultProject1,
        'If you dare to miss this you are gonna be homeless... and single!',
        'high',
        '11.03.2023',
        false,
        true
      );
      const defaultTask2 = new Task(
        'Finish education',
        defaultProject2,
        'If you dare to miss this you are gonna be homeless... and single!',
        'medium',
        '11.03.2023',
        false,
        false
      );
      defaultProject1.addTask(defaultTask1);
      defaultProject2.addTask(defaultTask2);
      projects.push(defaultProject1);
      projects.push(defaultProject2);
    } else {
      projects = localStorage.getItem('projects');
    }
  };

  const getProjects = () => {
    return projects;
  };

  return { init, getProjects };
})();
