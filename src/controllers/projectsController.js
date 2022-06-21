import { defaultData } from '../data';
import Project from '../models/Project';
import Task from '../models/Task';

export const projectsController = (() => {
  let projects = [];

  const getProjects = () => {
    return projects;
  };

  const getProjectById = (id) => {
    return projects.find((project) => project.id === id);
  };

  const addProject = (project) => {
    projects.unshift(project);
    updateStorage();
  };

  const removeProject = (id) => {
    projects = projects.filter((project) => project.id !== id);
    updateStorage();
  };

  const addTask = (project, newTask) => {
    project.addTask(newTask);
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

  return {
    init,
    getProjects,
    getProjectById,
    addProject,
    removeProject,
    addTask,
  };
})();
