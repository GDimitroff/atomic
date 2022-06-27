import { projectsController } from '../controllers/projectsController';

export default function createProjectForm() {
  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');

  const projectsCount = projectsController.getProjects().length;

  formContainer.innerHTML = `
    <div class="projects-header">
      <p>Projects (<span class="projects-count">${projectsCount}</span>)</p>
      <i class="fa-solid fa-plus"></i>
    </div>

    <hr />

    <div class="new-project">
      <form class="new-project-form">
        <div class="input">
          <label for="project-name">
            <input
              name="project-name"
              type="text"
              id="project-name"
              placeholder="Name..."
              required
            />
          </label>
        </div>

        <div class="colors">
          <label class="form-control">
            <input
              type="radio"
              name="color"
              class="default"
              value="default"
              checked
            />
          </label>
          <label class="form-control">
            <input type="radio" name="color" class="gold" value="gold" />
          </label>
          <label class="form-control">
            <input
              type="radio"
              name="color"
              class="orange"
              value="orange"
            />
          </label>
          <label class="form-control">
            <input type="radio" name="color" class="cyan" value="cyan" />
          </label>
          <label class="form-control">
            <input
              type="radio"
              name="color"
              class="purple"
              value="purple"
            />
          </label>
          <label class="form-control">
            <input type="radio" name="color" class="pink" value="pink" />
          </label>
          <label class="form-control">
            <input
              type="radio"
              name="color"
              class="green"
              value="green"
            />
          </label>
          <label class="form-control">
            <input type="radio" name="color" class="lime" value="lime" />
          </label>
          <label class="form-control">
            <input type="radio" name="color" class="red" value="red" />
          </label>
        </div>

        <div class="new-project-actions">
          <button type="submit" class="btn">Add</button>
        </div>
      </form>
    </div>
  `;

  return formContainer;
}
