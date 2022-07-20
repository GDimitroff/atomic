export default function createNotification(text, color, icon) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.classList.add(color);

  notification.innerHTML = `
    <p>${text}</p>
    ${icon ? `<i class="fa-solid fa-${icon}"></i>` : ''}
  `;

  return notification;
}
