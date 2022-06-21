import { defaultData } from '../data';
import Project from '../models/Project';
import Task from '../models/Task';

export const projectsController = (() => {
  let projects = [];

  const getProjects = () => {
    return projects;
  };

  const addProject = (project) => {
    projects.push(project);
    updateStorage();
  };

  const loadStorage = () => {
    const storage = JSON.parse(localStorage.getItem('projects'));
    const convertedProjects = storage.map((proj) => {
      const project = Object.assign(new Project(), proj);
      project.tasks = project.tasks.map((task) =>
        Object.assign(new Task(), task)
      );

      return project;
    });

    return convertedProjects;
  };

  const updateStorage = () => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const init = () => {
    if (localStorage.getItem('projects') === null) {
      projects = defaultData();
    } else {
      projects = loadStorage();
    }
  };

  return { init, getProjects, addProject };
})();
