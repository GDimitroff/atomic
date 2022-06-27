export default function createTasksSection() {
  const tasksSection = document.createElement('section');
  tasksSection.classList.add('section-tasks');
  const tasksCards = document.createElement('div');
  tasksCards.classList.add('tasks-cards');

  tasksSection.appendChild(tasksCards);

  return tasksSection;
};