import { projectsController } from '../controllers/projectsController';

export default function createCardForm(mode, headerTitle) {
  const projects = projectsController.getProjects();
  const select = document.createElement('select');
  select.name = 'projectId';
  select.id = 'projectId';

  projects
    .map((project) => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.name;

      if (option.textContent === headerTitle) {
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
          <input name="title" type="text" placeholder="Task title..." required />
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
        <textarea name="description" id="description" placeholder="Your description here..."></textarea>
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

  return cardForm;
}
