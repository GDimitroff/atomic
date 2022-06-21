export default function createTile(project) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.dataset.id = project.id;

  tile.innerHTML = `
    <div class="left">
      <i class="fa-solid fa-circle-dot ${project.color}"></i>
      <p>${project.name}</p>
    </div>
    <div class="right">
      <i class="fa-solid fa-pen-to-square"></i>
      <i class="fa-solid fa-trash-can"></i>
    </div>
  `;

  return tile;
}
