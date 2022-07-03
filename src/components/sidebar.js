import createMenu from './menu';
import createProjectForm from './projectForm';
import createProjectsList from './projectsList';

export default function createSidebar() {
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar');

  const menu = createMenu();
  const formContainer = createProjectForm();
  const projects = createProjectsList();

  sidebar.append(menu, formContainer, projects);
  return sidebar;
}
