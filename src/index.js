import './main.css';

const taskCard = document.querySelector('.task-card');
taskCard.addEventListener('click', (e) => {
  const classes = e.currentTarget.classList;
  classes.toggle('completed');
});

const changeTheme = document.querySelector('.header-right');
changeTheme.addEventListener('click', (e) => {
  document.querySelector('body').classList.toggle('light');
});