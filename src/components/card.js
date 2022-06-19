export default function createCard(cardInfo) {
  const card = document.createElement('div');
  card.classList.add('task-card');
  card.innerHTML = `
    <div class="card-header">
      <div class="left">
        <h3>Buy gift for my bae</h3>
      </div>
      <div class="right">
        <p class="pink">Personal</p>
      </div>
    </div>
    <p class="card-date">11.03.2023</p>
    <div class="card-content">
      <p>If you dare to miss this you are gonna be homeless... and single!</p>
    </div>
    <div class="card-footer">
      <div class="left">
        <i class="fa-solid fa-circle red"></i>
      </div>
      <div class="right">
        <div class="card-actions">
          <i class="fa-solid fa-star important"></i>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  `;

  return card;
}
