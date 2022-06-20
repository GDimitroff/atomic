import { defaultData } from '../data';

export const projectsController = (() => {
  let projects = [];

  const getProjects = () => {
    return projects;
  };

  const init = () => {
    if (localStorage.getItem('projects') === null) {
      projects = defaultData();
    } else {
      // projects = localStorage.getItem('projects');
    }
  };

  return { init, getProjects };
})();
