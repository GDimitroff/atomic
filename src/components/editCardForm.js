import { projectsController } from '../controllers/projectsController';
import { actionsController } from '../controllers/actionsController';
import { format } from 'date-fns';

export default function createEditCardForm(id) {
  const projects = projectsController.getProjects();

  const task = projectsController.getTaskById(id);
  let date = null;
  if (task.date) {
    const [day, month, year] = task.date.split('.');
    date = `${year}-${month}-${day}`;
    date = format(new Date(date), 'yyyy-MM-dd');
  }

  const select = document.createElement('select');
  select.name = 'projectId';
  select.id = 'projectId';

  projects
    .map((project) => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.title;

      if (task.projectId === project.id) {
        option.defaultSelected = true;
      }

      return option;
    })
    .forEach((option) => select.appendChild(option));

  const editCardForm = document.createElement('div');
  editCardForm.classList.add('edit-task');
  editCardForm.dataset.id = id;

  editCardForm.innerHTML = `
    <div class="edit-task-header">
      <h4>Edit task</h4>
    </div>
    <form class="edit-task-form">
      <div class="edit-form-header">
        <div class="left">
          <div class="input">
            <label for="title">Title</label>
            <input id="title" name="title" type="text" value="${
              task.title
            }" required />
          </div>
        </div>
        <div class="right">
          <div class="input">
            <label for="">Project</label>
            <div class="select">
              ${select.outerHTML}
              <span class="select-focus"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="input">
        <label for="description">Description</label>
        <textarea name="description" id="description">${
          task.description
        }</textarea>
      </div>

      <div class="edit-form-content">
        <div class="input">
          <label for="priority">Priority</label>
          <div class="select">
            <select name="priority" id="priority">
              <option value="low" ${
                task.priority === 'low' ? 'selected' : ''
              }>Low</option>
              <option value="medium" ${
                task.priority === 'medium' ? 'selected' : ''
              }>Medium</option>
              <option value="high" ${
                task.priority === 'high' ? 'selected' : ''
              }>High</option>
            </select>
            <span class="select-focus"></span>
          </div>
        </div>
        <div class="input">
          <label for="priority">Priority</label>
          <input type="date" id="date" name="date" value="${
            task.date ? date : ''
          }"/>
        </div>
      </div>

      <div class="edit-form-footer">
        <button type="button" class="btn btn-close">Cancel</button>
        <button type="submit" class="btn btn-submit">Save</button>
      </div>
    </form>
  `;

  actionsController.handleEditTaskForm(editCardForm);
  return editCardForm;
}
