/* Navegación móvil sencilla (si la añades) */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if(toggle){
  toggle.addEventListener('click', () => nav.classList.toggle('show'));
}