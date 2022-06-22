import { actionsController } from '../controllers/actionsController';

export default function createTasksHeader(title, showButton) {
  const header = document.createElement('header');
  header.classList.add('tasks-header');

  header.innerHTML = `
  <div class="left">
    <h2 class="tasks-title">${title}</h2>
  </div>
  `;

  if (showButton) {
    const right = document.createElement('div');
    right.classList.add('right');
    right.innerHTML = `
      <button class="btn btn-add">Add new</button>
    `;
    header.appendChild(right);
  }

  actionsController.handleTasksHeader(header, title);
  return header;
}
