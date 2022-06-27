import { projectsController } from '../controllers/projectsController';
import createTile from './tile';

export default function createProjectsList() {
  const projectsList = document.createElement('div');
  projectsList.classList.add('projects-list');

  const projects = projectsController.getProjects();
  projects.forEach((project) => {
    const projectTile = createTile(project);
    projectsList.appendChild(projectTile);
  });

  return projectsList;
}
