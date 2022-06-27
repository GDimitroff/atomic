export default function createHeader() {
  const header = document.createElement('header');
  header.classList.add('header');

  header.innerHTML = `
    <div class="left">
      <div class="toggle-menu">
        <i class="fa-solid fa-bars"></i>
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="logo">
        <i class="fa-solid fa-rocket"></i>
        <h1>Atomic</h1>
      </div>
    </div>
    <div class="right">
      <i class="fa-solid fa-sun"></i>
      <i class="fa-solid fa-moon"></i>
    </div>
  `;

  return header;
}
