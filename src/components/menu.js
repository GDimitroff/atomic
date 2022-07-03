import { projectsController } from '../controllers/projectsController';
import { actionsController } from '../controllers/actionsController';
import { isToday, isThisWeek } from 'date-fns';

export default function createMenu() {
  const allTasksCount = projectsController.getTasks().length || '';
  const todayCount = projectsController.getTasksByDate(isToday).length || '';
  const weekCount = projectsController.getTasksByDate(isThisWeek).length || '';
  const importantCount = projectsController.getImportantTasks().length || '';
  const completedCount = projectsController.getCompletedTasks().length || '';

  const menuTiles = document.createElement('div');
  menuTiles.classList.add('menu-tiles');

  menuTiles.innerHTML = `
    <div class="tile active" data-id="all">
      <div class="left">
        <i class="fa-solid fa-globe"></i>
        <p>All tasks</p>
      </div>
      <div class="right">
        <p>${allTasksCount}</p>
      </div>
    </div>
    <div class="tile" data-id="today">
      <div class="left">
        <i class="fa-solid fa-calendar-day"></i>
        <p>Today</p>
      </div>
      <div class="right">
        <p>${todayCount}</p>
      </div>
    </div>
    <div class="tile" data-id="week">
      <div class="left">
        <i class="fa-solid fa-calendar-days"></i>
        <p>This week</p>
      </div>
      <div class="right">
        <p>${weekCount}</p>
      </div>
    </div>
    <div class="tile" data-id="important">
      <div class="left">
        <i class="fa-solid fa-star"></i>
        <p>Important</p>
      </div>
      <div class="right">
        <p>${importantCount}</p>
      </div>
    </div>
    <div class="tile" data-id="completed">
      <div class="left">
        <i class="fa-solid fa-check-double"></i>
        <p>Completed</p>
      </div>
      <div class="right">
        <p>${completedCount}</p>
      </div>
    </div>
  `;

  actionsController.handleMenuTiles(menuTiles);
  return menuTiles;
}
