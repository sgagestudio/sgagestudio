/* Navegación móvil sencilla (si la añades) */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if(toggle){
  toggle.addEventListener('click', () => nav.classList.toggle('show'));
}

window.onRequestPost = async (event) => {
  event.preventDefault();
  const form = document.getElementById('contacto-form');
  const btn = document.getElementById('contacto-submit');
  const status = document.getElementById('contacto-status');

  if (!form) return false;

  try {
    btn.disabled = true;
    status.textContent = 'Enviando...';

    const formData = new FormData(form);

    // IMPORTANTE: tu Pages Function estará, por ejemplo, en /contacto (functions/contacto.js)
    const res = await fetch('/contacto', { method: 'POST', body: formData });

    if (!res.ok) throw new Error(await res.text());

    status.textContent = 'Mensaje enviado correctamente. Te contactaremos en breve.';
    form.reset();
  } catch (err) {
    status.textContent = 'No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.';
    console.error(err);
  } finally {
    btn.disabled = false;
  }

  return false; // evita envío nativo
};