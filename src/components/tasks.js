import createTasksHeader from './tasksHeader';

export default function createTasksSection() {
  const tasksSection = document.createElement('section');
  tasksSection.classList.add('tasks');
  
  const tasksHeader = createTasksHeader('All tasks');
  tasksSection.appendChild(tasksHeader);
  const tasksCards = document.createElement('div');
  tasksCards.classList.add('tasks-cards');
  tasksSection.appendChild(tasksCards);

  return tasksSection;
}
