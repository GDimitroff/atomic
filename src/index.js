import './main.css';

const taskCard = document.querySelector('.task-card');
taskCard.addEventListener('click', (e) => {
  const classes = e.currentTarget.classList;
  classes.toggle('completed');
});
