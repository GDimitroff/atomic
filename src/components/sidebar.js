import { actionsController } from '../controllers/actionsController';
import createMenu from './menu';
import createProjectForm from './projectForm';
import createProjectsList from './projectsList';

export default function createSidebar() {
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar');

  const menu = createMenu();
  const projectForm = createProjectForm();
  const projects = createProjectsList();
  sidebar.append(menu, projectForm, projects);

  actionsController.handleSidebar(sidebar);
  return sidebar;
}
