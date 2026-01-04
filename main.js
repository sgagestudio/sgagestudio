/* Navegación móvil + detalles de UI */
(() => {
  const header = document.querySelector('header.site-header') || document.querySelector('header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  const normalizePath = (p) => {
    try {
      const u = new URL(p, window.location.origin);
      const pathname = (u.pathname || '/').replace(/\/+$/, '/');
      return pathname === '' ? '/' : pathname;
    } catch {
      return (p || '/').replace(/\/+$/, '/');
    }
  };

  const setMenuOpen = (open) => {
    if (!toggle || !nav) return;
    nav.classList.toggle('show', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  // Mobile menu
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('show');
      setMenuOpen(open);
    });

    // Close on link click
    nav.addEventListener('click', (e) => {
      const a = e.target && e.target.closest && e.target.closest('a');
      if (a) setMenuOpen(false);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('show')) return;
      const insideNav = nav.contains(e.target);
      const insideToggle = toggle.contains(e.target);
      if (!insideNav && !insideToggle) setMenuOpen(false);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    });

    // Reset menu on desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    });
  }

  // Active nav item
  const current = normalizePath(window.location.pathname);
  document.querySelectorAll('.nav-links a[href]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    const target = normalizePath(href);
    if (target === current) a.setAttribute('aria-current', 'page');
  });

  // Header shadow on scroll
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 4);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

(() => {
  const WORKER_URL = "https://contacto.sgagestudio.workers.dev/contact";

  const form = document.getElementById("contacto-form");
  if (!form) return; // solo en /contacto/

  const submitBtn = document.getElementById("contacto-submit");
  const statusBox = document.getElementById("contacto-status");

  function setStatus(msg, ok = true) {
    if (!statusBox) return;
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

  // Importante: se llama desde el onsubmit del formulario
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

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
    }
    setStatus("Enviando…", true);

    try {
      await sendForm({ nombre, email, telefono, mensaje, empresa });
      setStatus("¡Gracias! Te responderemos en menos de 24 horas.");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.", false);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
      }
    }

    return false;
  };
})();
