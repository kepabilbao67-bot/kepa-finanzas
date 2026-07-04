/* =========================================================
   KepaFinanzas - script principal
   Las preguntas y respuestas del asistente están en preguntas.js
   ========================================================= */

/* ============ CONFIGURACIÓN (edita solo esta parte) ============

   1) WHATSAPP: tu número en formato internacional, solo dígitos.
   2) PRECIOS:  actualiza aquí los precios cuando quieras.
                La fecha se muestra en el ticker para ser transparentes.
   =============================================================== */
const WHATSAPP_NUMERO = '34611918310';
const WHATSAPP_MENSAJE = 'Hola KepaFinanzas, me gustaría recibir información sobre la inversión en oro y plata.';

const PRECIOS = {
  fecha: '04/07/2026',            // 👈 cambia la fecha cuando actualices precios
  metales: [
    { icono: '🥇', nombre: 'ORO',     precio: '116,49€/g', cambio: '+0,23%', sube: true },
    { icono: '🥈', nombre: 'PLATA',   precio: '1,82€/g',   cambio: '-0,8%',  sube: false },
    { icono: '⬜', nombre: 'PLATINO', precio: '29,4€/g',   cambio: '+0,5%',  sube: true },
    { icono: '🔲', nombre: 'PALADIO', precio: '27,1€/g',   cambio: '+1,2%',  sube: true },
    { icono: '📊', nombre: 'RATIO ORO/PLATA', precio: '64,0', cambio: '', sube: true }
  ]
};

/* =============== FIN DE LA CONFIGURACIÓN ====================== */

function abrirWhatsApp(texto) {
  const msg = encodeURIComponent(texto || WHATSAPP_MENSAJE);
  return 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + msg;
}

/* --- Ticker de precios (generado desde PRECIOS) --- */
(function pintarTicker() {
  const cont = document.getElementById('tickerContent');
  if (!cont) return;
  function bloque() {
    let html = '';
    PRECIOS.metales.forEach((m) => {
      const flecha = m.cambio ? (m.sube
        ? ' <span class="ticker__up">▲ ' + m.cambio + '</span>'
        : ' <span class="ticker__down">▼ ' + m.cambio + '</span>') : '';
      html += '<span class="ticker__item">' + m.icono + ' ' + m.nombre +
              ': <span class="ticker__price">' + m.precio + '</span>' + flecha + '</span>';
    });
    html += '<span class="ticker__item ticker__note">Precios orientativos · ' + PRECIOS.fecha + '</span>';
    return html;
  }
  cont.innerHTML = bloque() + bloque(); // duplicado para el bucle infinito
})();

/* --- Año del footer --- */
document.getElementById('year').textContent = new Date().getFullYear();

/* --- Botón volver arriba --- */
const toTop = document.getElementById('toTop');
if (toTop) {
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* --- Header con sombra al hacer scroll --- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  if (toTop) toTop.classList.toggle('show', window.scrollY > 500);
});

/* --- Menú móvil --- */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  navToggle.classList.toggle('active');
});
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

/* --- Enlaces de WhatsApp --- */
['whatsappFloat', 'ctaWhatsapp', 'contactWhatsapp'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.setAttribute('href', abrirWhatsApp());
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  }
});

/* --- Botones "Contratar" de cada plan --- */
document.querySelectorAll('.plan-buy').forEach((el) => {
  const plan = el.dataset.plan || '';
  el.setAttribute('href', abrirWhatsApp('Hola KepaFinanzas, me interesa contratar el plan ' + plan + '. ¿Me dais más información para empezar?'));
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});

/* --- Scroll reveal --- */
const revealTargets = document.querySelectorAll(
  '.card, .plan, .way, .custody__media, .custody__content, .section__head, .contact__info, .contact__form, .trust__stat, .faq__item'
);
revealTargets.forEach((el) => el.classList.add('reveal'));
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealTargets.forEach((el) => obs.observe(el));

/* --- Formulario de contacto: valida y envía por WhatsApp --- */
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const interes = form.interes.value;
    const mensaje = form.mensaje.value.trim();
    const acepta = form.privacidad.checked;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || !email || !mensaje) {
      feedback.textContent = 'Por favor completa todos los campos.';
      feedback.className = 'form__feedback error';
      return;
    }
    if (!emailRegex.test(email)) {
      feedback.textContent = 'Ingresa un correo electrónico válido.';
      feedback.className = 'form__feedback error';
      return;
    }
    if (!acepta) {
      feedback.textContent = 'Debes aceptar la política de privacidad para continuar.';
      feedback.className = 'form__feedback error';
      return;
    }

    const texto = 'Hola, soy ' + nombre + ' (' + email + ').\n' +
                  'Me interesa: ' + interes + '.\n\n' + mensaje;
    window.open(abrirWhatsApp(texto), '_blank', 'noopener');

    feedback.textContent = '¡Gracias ' + nombre + '! Se ha abierto WhatsApp con tu mensaje. Si no se abrió, revisa el bloqueador de ventanas.';
    feedback.className = 'form__feedback success';
    form.reset();
  });
}

/* --- Calculadora de ahorro --- */
const cM = document.getElementById('calcMonthly');
const cY = document.getElementById('calcYears');
const cG = document.getElementById('calcGrowth');
function updateCalc() {
  if (!cM) return;
  const m = +cM.value, y = +cY.value, g = +cG.value / 100;
  document.getElementById('calcMonthlyVal').textContent = m + '€/mes';
  document.getElementById('calcYearsVal').textContent = y + (y === 1 ? ' año' : ' años');
  document.getElementById('calcGrowthVal').textContent = (g * 100) + '%';
  const inv = m * 12 * y;
  const mr = g / 12;
  let fv = 0;
  for (let i = 0; i < y * 12; i++) fv = (fv + m) * (1 + mr);
  const pr = fv - inv;
  document.getElementById('calcInvested').textContent = inv.toLocaleString('es-ES') + '€';
  document.getElementById('calcValue').textContent = Math.round(fv).toLocaleString('es-ES') + '€';
  document.getElementById('calcProfit').textContent = (pr >= 0 ? '+' : '') + Math.round(pr).toLocaleString('es-ES') + '€';
}
if (cM) {
  cM.addEventListener('input', updateCalc);
  cY.addEventListener('input', updateCalc);
  cG.addEventListener('input', updateCalc);
  updateCalc();
}

/* =========================================================
   ASISTENTE (usa las preguntas de preguntas.js)
   ========================================================= */
const chatToggle = document.getElementById('chatToggle');
const chat = document.getElementById('chat');
const chatClose = document.getElementById('chatClose');
const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatSuggestions = document.getElementById('chatSuggestions');

/* Si preguntas.js no se cargó, usamos una lista vacía para no romper la web */
const LISTA_PREGUNTAS = (typeof PREGUNTAS !== 'undefined') ? PREGUNTAS : [];

const SUGERENCIAS = [
  '¿Por qué invertir en oro?',
  '¿Cómo funciona la custodia?',
  'Ver los planes',
  'Quiero ser partner',
  'Hablar por WhatsApp'
];

function normaliza(txt) {
  return txt.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/[¿?¡!.,;:]/g, ' ');
}

function buscarRespuesta(texto) {
  const t = ' ' + normaliza(texto) + ' ';
  let mejor = null, mejorPuntos = 0;
  LISTA_PREGUNTAS.forEach((item) => {
    let puntos = 0;
    (item.palabras || []).forEach((clave) => {
      const c = normaliza(clave);
      if (t.includes(' ' + c + ' ') || t.includes(c)) {
        puntos += c.split(' ').length; // frases más largas valen más
      }
    });
    if (puntos > mejorPuntos) { mejorPuntos = puntos; mejor = item; }
  });
  if (mejor) return mejor.respuesta;
  return 'Buena pregunta. 🤔 Puedo ayudarte con temas de oro, plata, inversión, custodia, los planes de compra o cómo ser partner. ' +
    'Para una respuesta más detallada sobre tu caso, lo mejor es hablar con nuestro equipo por WhatsApp: ' +
    '<a href="' + abrirWhatsApp() + '" target="_blank" rel="noopener">abrir WhatsApp</a>.';
}

function añadirMensaje(texto, tipo) {
  const div = document.createElement('div');
  div.className = 'msg msg--' + tipo;
  div.innerHTML = texto;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function respuestaBot(textoUsuario) {
  const pensando = document.createElement('div');
  pensando.className = 'msg msg--bot';
  pensando.textContent = 'Escribiendo…';
  chatBody.appendChild(pensando);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    pensando.remove();
    if (/whatsapp/i.test(normaliza(textoUsuario))) {
      añadirMensaje('Te dejo el acceso directo: <a href="' + abrirWhatsApp() +
        '" target="_blank" rel="noopener">abrir WhatsApp</a> 💬', 'bot');
    } else {
      añadirMensaje(buscarRespuesta(textoUsuario), 'bot');
    }
  }, 500);
}

function pintarSugerencias() {
  chatSuggestions.innerHTML = '';
  SUGERENCIAS.forEach((s) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.textContent = s;
    chip.addEventListener('click', () => {
      añadirMensaje(s, 'user');
      respuestaBot(s);
    });
    chatSuggestions.appendChild(chip);
  });
}

let chatIniciado = false;
function abrirChat() {
  chat.classList.add('open');
  chat.setAttribute('aria-hidden', 'false');
  chatToggle.classList.add('hidden');
  if (!chatIniciado) {
    chatIniciado = true;
    añadirMensaje('¡Hola! 👋 Soy el asistente de KepaFinanzas. Pregúntame lo que quieras sobre <strong>oro</strong>, <strong>plata</strong>, los <strong>planes</strong> o cómo ser <strong>partner</strong>.', 'bot');
    pintarSugerencias();
  }
  setTimeout(() => chatInput.focus(), 200);
}
function cerrarChat() {
  chat.classList.remove('open');
  chat.setAttribute('aria-hidden', 'true');
  chatToggle.classList.remove('hidden');
}

chatToggle.addEventListener('click', abrirChat);
chatClose.addEventListener('click', cerrarChat);
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = chatInput.value.trim();
  if (!texto) return;
  añadirMensaje(texto, 'user');
  chatInput.value = '';
  respuestaBot(texto);
});
