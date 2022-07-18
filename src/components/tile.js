import { actionsController } from '../controllers/actionsController';

export default function createTile(project) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.dataset.id = project.id;

  tile.innerHTML = `
    <div class="confirm confirm-project">
      <p>Are you sure?</p>
      <div class="confirm-buttons">
        <button type="button" class="confirm-btn cancel">Cancel</button>
        <button type="button" class="confirm-btn delete">Delete</button>
      </div>
    </div>
    <div class="left">
      <i class="fa-solid fa-circle-dot ${project.color}"></i>
      <p>${project.title}</p>
    </div>
    <div class="right">
      <i class="fa-solid fa-trash-can"></i>
    </div>
  `;

  actionsController.handleProjectTile(tile);
  return tile;
}
