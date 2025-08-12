/* Navegación móvil sencilla (si la añades) */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => nav.classList.toggle('show'));
}

/* Endpoint del Worker (escucha en /contacto) */
 const WORKER_URL = "https://contacto.sgagestudio.workers.dev/contact";

  const form = document.getElementById("contacto-form");
  const submitBtn = document.getElementById("contacto-submit");
  const statusBox = document.getElementById("contacto-status");

  function setStatus(msg, ok = true) {
    statusBox.textContent = msg;
    statusBox.style.color = ok ? "#065f46" : "#b91c1c";
  }

  async function sendForm(data) {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.ok === false) {
      throw new Error(json.error || `HTTP_${res.status}`);
    }
    return json;
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
  }

  window.onRequestPost = async (ev) => {
    ev.preventDefault();

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    // Campos del formulario
    const nombre = (data.nombre || "").trim();
    const email = (data.email || "").trim();
    const telefono = (data.telefono || "").trim();
    const mensaje = (data.mensaje || "").trim();
    const empresa = (data.empresa || "").trim(); // honeypot

    // Validaciones mínimas en cliente
    if (!nombre || !email || !mensaje) {
      setStatus("Por favor, completa nombre, email y mensaje.", false);
      return false;
    }
    if (!validEmail(email)) {
      setStatus("El email no parece válido.", false);
      return false;
    }
    if (mensaje.length > 4000) {
      setStatus("El mensaje es demasiado largo.", false);
      return false;
    }

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    setStatus("Enviando…", true);

    try {
      await sendForm({ nombre, email, telefono, mensaje, empresa });
      setStatus("¡Gracias! Te responderemos en menos de 24 horas.");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.", false);
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-busy");
    }

    return false;
  };
})();