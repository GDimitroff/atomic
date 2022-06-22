export default function createCard(task, project) {
  const card = document.createElement('div');
  card.classList.add('task-card');
  card.dataset.id = task.id;

  if (task.isCompleted) {
    card.classList.add('completed');
  }

  card.innerHTML = `
    <div class="card-header">
      <div class="left">
        <h3>${task.title}</h3>
      </div>
      <div class="right">
        <p class="${project.color}">${project.name}</p>
      </div>
    </div>
    <p class="card-date">${task.date}</p>
    <div class="card-content">
      <p>${task.description}</p>
    </div>
    <div class="card-footer">
      <div class="left">
        <i class="fa-solid fa-circle ${task.priority}"></i>
      </div>
      <div class="right">
        <div class="card-actions">
          <i class="fa-solid fa-star ${
            task.isImportant ? 'important' : ''
          }"></i>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  `;

  return card;
}
