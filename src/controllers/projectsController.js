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

  const getTasks = () => {
    let tasks = [];
    projects.forEach((project) => {
      tasks.push(...project.tasks);
    });

    return tasks;
  };

  const getTasksByDate = (filter) => {
    let tasks = [];
    projects.forEach((project) => {
      project.tasks.filter((task) => {
        if (task.date) {
          const [day, month, year] = task.date.split('.');
          const date = new Date(year, Number(month) - 1, day);

          if (filter(date)) {
            tasks.push(task);
          }
        }
      });
    });

    return tasks;
  };

  const getImportantTasks = () => {
    const importantTasks = [];
    projects.forEach((project) => {
      project.tasks.filter((task) => {
        if (task.isImportant) {
          importantTasks.push(task);
        }
      });
    });

    return importantTasks;
  };

  const getCompletedTasks = () => {
    const completedTasks = [];
    projects.forEach((project) => {
      project.tasks.filter((task) => {
        if (task.isCompleted) {
          completedTasks.push(task);
        }
      });
    });

    return completedTasks;
  };

  const addTask = (id, newTask) => {
    const project = getProjectById(id);
    project.addTask(newTask);
    updateStorage();
  };

  const removeTask = (id, projectId) => {
    const project = getProjectById(projectId);
    project.tasks = project.tasks.filter((task) => task.id !== id);
    updateStorage();
  };

  const toggleImportant = (id, projectId) => {
    const project = getProjectById(projectId);
    const task = project.tasks.find((task) => task.id === id);
    task.isImportant = !task.isImportant;
    updateStorage();
  };

  const toggleCompleted = (id, projectId) => {
    const project = getProjectById(projectId);
    const task = project.tasks.find((task) => task.id === id);
    task.isCompleted = !task.isCompleted;
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
    getTasks,
    getTasksByDate,
    getImportantTasks,
    getCompletedTasks,
    addTask,
    removeTask,
    toggleImportant,
    toggleCompleted,
  };
})();
