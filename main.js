/* Navegación móvil sencilla (si la añades) */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => nav.classList.toggle('show'));
}

/* Endpoint del Worker (escucha en /contacto) */
const WORKER_ENDPOINT = 'https://contacto.sgagestudio.workers.dev/contacto';

/**
 * Manejo del envío del formulario de contacto.
 * Envía FormData al Worker y muestra estado al usuario.
 */
window.onRequestPost = async (event) => {
  event.preventDefault();

  const form   = document.getElementById('contacto-form');
  const btn    = document.getElementById('contacto-submit');
  const status = document.getElementById('contacto-status');

  if (!form) return false;

  // Honeypot anti-spam: input oculto name="empresa"
  const honeypot = form.querySelector('input[name="empresa"]');
  if (honeypot && honeypot.value && honeypot.value.trim() !== '') {
    setStatus(status, 'Mensaje enviado correctamente.');
    form.reset();
    return false;
  }

  // Validación sencilla lado cliente
  const nombre   = form.querySelector('#nombre')?.value?.trim() || '';
  const email    = form.querySelector('#email')?.value?.trim() || '';
  const telefono = form.querySelector('#telefono')?.value?.trim() || '';
  const mensaje  = form.querySelector('#mensaje')?.value?.trim() || '';

  if (!nombre || !email || !mensaje) {
    setStatus(status, 'Por favor, completa nombre, email y mensaje.');
    return false;
  }

  try {
    if (btn) btn.disabled = true;
    setStatus(status, 'Enviando...');

    const formData = new FormData(form);

    // POST directo al Worker
    const res = await fetch(WORKER_ENDPOINT, {
      method: 'POST',
      body: formData
    });

    let payload = null;
    try { payload = await res.json(); } catch (_) {}

    if (!res.ok || (payload && payload.error)) {
      const msg = (payload && (payload.error || payload.details)) || `Error HTTP ${res.status}`;
      throw new Error(msg);
    }

    setStatus(status, 'Mensaje enviado correctamente. Te contactaremos en breve.');
    form.reset();
  } catch (err) {
    console.error(err);
    setStatus(status, 'No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.');
  } finally {
    if (btn) btn.disabled = false;
  }

  return false; // evita envío nativo
};

function setStatus(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
