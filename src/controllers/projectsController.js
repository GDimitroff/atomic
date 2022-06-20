import Project from '../models/Project';
import Task from '../models/Task';
import { defaultData } from '../data';

export const projectsController = (() => {
  let projects = [];

  const init = () => {
    if (localStorage.getItem('projects') === null) {
      projects = defaultData();
    } else {
      // projects = localStorage.getItem('projects');
    }
  };

  const getProjects = () => {
    return projects;
  };

  return { init, getProjects };
})();
