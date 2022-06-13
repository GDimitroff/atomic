import './main.css';

const taskCard = document.querySelector('.task-card');
taskCard.addEventListener('click', (e) => {
  console.log('hjere');
  const classes = e.currentTarget.classList;
  classes.toggle('completed');
});
