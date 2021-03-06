import { defaultData } from '../data';
import Project from '../models/Project';
import Task from '../models/Task';

export const projectsController = (() => {
  let projects = [];
  let currentProject = null;

  const getProjects = () => {
    return projects;
  };

  const getProjectById = (id) => {
    return projects.find((project) => project.id === id);
  };

  const getCurrentProject = () => {
    return currentProject;
  };

  const setCurrentProject = (id) => {
    if (!id) {
      currentProject = null;
      return;
    }

    currentProject = getProjectById(id);
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

  const getTaskById = (id) => {
    let task = null;
    projects.forEach((project) => {
      project.tasks.find((t) => {
        if (t.id === id) {
          task = t;
          return;
        }
      });
    });

    return task;
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

  const updateTask = (id, projectId, title, description, priority, date) => {
    const task = getTaskById(id);
    task.projectId = projectId;
    task.title = title;
    task.description = description;
    task.priority = priority;
    task.date = date;

    projects.forEach((project) => {
      project.tasks = project.tasks.filter((t) => t.id !== id);
    });

    addTask(projectId, task);
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
    getCurrentProject,
    setCurrentProject,
    addProject,
    removeProject,
    getTasks,
    getTaskById,
    getTasksByDate,
    getImportantTasks,
    getCompletedTasks,
    addTask,
    removeTask,
    updateTask,
    toggleImportant,
    toggleCompleted,
  };
})();
