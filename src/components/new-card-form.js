export default function createNewCardForm(edit = false) {
  const newCardForm = document.createElement('div');
  newCardForm.classList.add('new-task-card');
  newCardForm.innerHTML = `
    <form class="new-task-form">
      <div class="card-header">
        <div class="left">
          <input type="text" placeholder="Task title..." required />
          <div class="select">
            <select name="projects" id="projects">
              <option value="default">Default</option>
              <option value="education">Education</option>
              <option value="workout">Workout</option>
            </select>
            <span class="select-focus"></span>
          </div>
        </div>
        <div class="right">
          <button type="button" class="btn close-task">X</button>
        </div>
      </div>
  
      <div class="card-content">
        <textarea id="task-description" placeholder="Your description here..."></textarea>
      </div>

      <div class="card-footer">
        <div class="left">
          <div class="select">
            <select name="priority" id="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <span class="select-focus"></span>
          </div>
          <input type="date" id="date" name="date" value="2022-06-17" />
        </div>
        <div class="right">
          <button type="submit" class="btn btn-submit">Add</button>
        </div>
      </div>
    </form>
  `;

  return newCardForm;
}
