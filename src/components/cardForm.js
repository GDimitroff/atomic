import { actionsController } from '../controllers/actionsController';
import { projectsController } from '../controllers/projectsController';

export default function createCardForm(id) {
  const projects = projectsController.getProjects();
  const currentProject = projectsController.getCurrentProject();

  let task = null;
  if (id) {
    task = projectsController.getTaskById(id);
  }

  const select = document.createElement('select');
  select.name = 'projectId';
  select.id = 'projectId';

  projects
    .map((project) => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.title;

      if (currentProject && project.id === currentProject.id) {
        option.defaultSelected = true;
      }

      return option;
    })
    .forEach((option) => select.appendChild(option));

  const cardForm = document.createElement('div');
  cardForm.classList.add('new-task-card');
  cardForm.innerHTML = `
    <form class="new-task-form">
      <div class="card-header">
        <div class="left">
          <input name="title" type="text" placeholder="Title..." required />
          <div class="select">
            ${select.outerHTML}
            <span class="select-focus"></span>
          </div>
        </div>
        <div class="right">
          <button type="button" class="btn close-task">X</button>
        </div>
      </div>
  
      <div class="card-content">
        <textarea name="description" id="description" placeholder="Description..."></textarea>
      </div>

      <div class="card-footer">
        <div class="left">
          <div class="select">
            <select name="priority" id="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <span class="select-focus"></span>
          </div>
          <input type="date" id="date" name="date" />
        </div>
        <div class="right">
          <button type="submit" class="btn btn-submit">Add</button>
        </div>
      </div>
    </form>
  `;

  actionsController.handleCardForm(cardForm);
  return cardForm;
}
