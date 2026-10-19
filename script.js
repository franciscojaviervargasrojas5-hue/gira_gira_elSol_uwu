// 10 frases únicas para 8 pétalos grandes + 2 hojas
const datosFrases = [
  { frase: "Eres mi todo, mi princesa mágica, te amo inmensamente 🌻", foto: "foto1.jpg.jpeg" },
  { frase: "Tu sonrisa hace todos los dias mas bonitos e iluminan mis dias ✨", foto: "foto2.jpg.jpeg" },
  { frase: "Gracias por estar a mi lado, me haces muy feliz amorshito ❤️", foto: "foto3.jpg.jpeg" },
  { frase: "Siempre brillas a cada lugar que vas, mi princesa 🌟", foto: "foto4.jpg.jpeg" },
  { frase: "Eres la mujer con la que siempre quiero compartir todo 💕", foto: "foto5.jpg.jpeg" },
  { frase: "Cada momento junto a ti es mágico e inolvidable ⏳💛", foto: "foto6.jpg.jpeg" },
  { frase: "Que pues mamasita, eres la flor mas hermosa que existe 🌸", foto: "foto7.jpg.jpeg" },
  { frase: "El mundo se detiene siempre al lado tuyo uwu 🌍❤️", foto: "foto8.jpg.jpeg" },
  { frase: "Nunca olvides lo valiosa que eres para mí, amor mio ✨", foto: "foto9.jpg.jpeg" },
  { frase: "Te amo muchísimo mi cucha🌻", foto: "foto10.jpg.jpeg" }
];

const girasolContainer = document.getElementById('girasolContainer');
const modal = document.getElementById('modalFrase');
const modalTexto = document.getElementById('modalTexto');
const modalImagen = document.getElementById('modalImagen');
const cerrarModal = document.getElementById('cerrarModal');
const btnReiniciar = document.getElementById('btnReiniciar');
const btnMusica = document.getElementById('btnMusica');
const musicaFondo = document.getElementById('musicaFondo');

let musicaSonando = false;
let frasesDisponibles = [];

// Control del MP3
btnMusica.addEventListener('click', () => {
  if (musicaSonando) {
    musicaFondo.pause();
    btnMusica.textContent = '🎵 Reproducir Música';
  } else {
    musicaFondo.play();
    btnMusica.textContent = '⏸️ Pausar Música';
  }
  musicaSonando = !musicaSonando;
});

// Mezclador para garantizar que ninguna frase se repita
function mezclarFrases() {
  frasesDisponibles = [...datosFrases];
  frasesDisponibles.sort(() => Math.random() - 0.5);
}

// Construcción de la flor
function construirGirasol() {
  girasolContainer.innerHTML = '';
  mezclarFrases();

  // 1. Tallo
  const tallo = document.createElement('div');
  tallo.className = 'tallo';
  girasolContainer.appendChild(tallo);

  // 2. Hoja Izquierda
  const hojaIzquierda = document.createElement('div');
  hojaIzquierda.className = 'hoja-tallo hoja-izquierda';
  hojaIzquierda.addEventListener('click', (e) => quitarElemento(e.target));
  girasolContainer.appendChild(hojaIzquierda);

  // 3. Hoja Derecha
  const hojaDerecha = document.createElement('div');
  hojaDerecha.className = 'hoja-tallo hoja-derecha';
  hojaDerecha.addEventListener('click', (e) => quitarElemento(e.target));
  girasolContainer.appendChild(hojaDerecha);

  // 4. Exactamente 8 Pétalos Grandes
  const totalPetalos = 8;
  for (let i = 0; i < totalPetalos; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'petalo-wrapper';
    const angulo = (360 / totalPetalos) * i;
    wrapper.style.transform = `rotate(${angulo}deg)`;

    const petalo = document.createElement('div');
    petalo.className = 'petalo';
    petalo.addEventListener('click', (e) => quitarElemento(e.target));
    
    wrapper.appendChild(petalo);
    girasolContainer.appendChild(wrapper);
  }

  // 5. Centro del Girasol
  const centro = document.createElement('div');
  centro.className = 'centro-girasol';
  girasolContainer.appendChild(centro);
}

// Al quitar pétalo u hoja
function quitarElemento(elemento) {
  if (!musicaSonando) {
    musicaFondo.play().then(() => {
      musicaSonando = true;
      btnMusica.textContent = '⏸️ Pausar Música';
    }).catch(() => {});
  }

  elemento.classList.add('cayendo');

  if (frasesDisponibles.length === 0) {
    mezclarFrases();
  }

  // Se extrae la frase para evitar repeticiones
  const datoSeleccionado = frasesDisponibles.pop();

  setTimeout(() => {
    modalTexto.textContent = datoSeleccionado.frase;
    modalImagen.src = datoSeleccionado.foto;
    modal.classList.remove('oculto');
  }, 350);

  setTimeout(() => {
    elemento.remove();
  }, 1000);
}

// Eventos de Modal
cerrarModal.addEventListener('click', () => {
  modal.classList.add('oculto');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('oculto');
  }
});

btnReiniciar.addEventListener('click', construirGirasol);

// Carga inicial
construirGirasol();
