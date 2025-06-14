// Configuración de imágenes de rompecabezas
const rompecabezas = [
  {
    nombre: "nivel1",
    piezas: [
      "img/nivel1/pieza1.jpg",
      "img/nivel1/pieza2.jpg",
      "img/nivel1/pieza3.jpg",
      "img/nivel1/pieza4.jpg",
      "img/nivel1/pieza5.jpg",
      "img/nivel1/pieza6.jpg"
    ],
    completa: "img/nivel1/cuando_nos_conocimos.jpg"
  },
  {
    nombre: "nivel2",
    piezas: [
      "img/nivel2/pieza1.jpg",
      "img/nivel2/pieza2.jpg",
      "img/nivel2/pieza3.jpg",
      "img/nivel2/pieza4.jpg",
      "img/nivel2/pieza5.jpg",
      "img/nivel2/pieza6.jpg"
    ],
    completa: "img/nivel2/1ra_salida.jpg"
  },
  {
    nombre: "nivel3",
    piezas: [
      "img/nivel3/pieza1.jpg",
      "img/nivel3/pieza2.jpg",
      "img/nivel3/pieza3.jpg",
      "img/nivel3/pieza4.jpg",
      "img/nivel3/pieza5.jpg",
      "img/nivel3/pieza6.jpg"
    ],
    completa: "img/nivel3/huacachina.jpg"
  }
];

// Variables principales
let indiceActual = 0;
let piezaArrastrada = null;
let piezasCorrectas = 0;

// Elementos HTML
const contenedor = document.getElementById("rompecabezas");
const zonaArmado = document.getElementById("zona-armado");
const botonSiguiente = document.getElementById("siguiente");
const mensajeFinal = document.getElementById("mensaje-final");

// Cargar un rompecabezas específico
function cargarRompecabezas(indice) {
  contenedor.innerHTML = "";
  zonaArmado.innerHTML = "";
  piezasCorrectas = 0;

  const datos = rompecabezas[indice];
  const piezas = [...datos.piezas];

  // Mezclar piezas
  piezas.sort(() => Math.random() - 0.5);

  // Crear piezas
  piezas.forEach((ruta, i) => {
    const pieza = document.createElement("div");
    pieza.classList.add("pieza");
    pieza.style.backgroundImage = `url('${ruta}')`;
    pieza.setAttribute("draggable", "true");
    pieza.setAttribute("id", `pieza${i}`);
    pieza.dataset.ruta = ruta;
    contenedor.appendChild(pieza);
  });

  // Crear slots
  datos.piezas.forEach((rutaCorrecta, i) => {
    const slot = document.createElement("div");
    slot.classList.add("zona-slot");
    slot.dataset.correcta = rutaCorrecta;
    zonaArmado.appendChild(slot);
  });

  agregarEventos();
}

// Eventos de drag & drop
function agregarEventos() {
  const piezas = document.querySelectorAll(".pieza");
  const slots = document.querySelectorAll(".zona-slot");

  piezas.forEach(pieza => {
    pieza.addEventListener("dragstart", () => {
      piezaArrastrada = pieza;
      setTimeout(() => (pieza.style.display = "none"), 0);
    });

    pieza.addEventListener("dragend", () => {
      pieza.style.display = "block";
      piezaArrastrada = null;
    });
  });

  slots.forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());

    slot.addEventListener("drop", e => {
      e.preventDefault();
      if (!slot.hasChildNodes()) {
        if (piezaArrastrada.dataset.ruta === slot.dataset.correcta) {
          slot.appendChild(piezaArrastrada);
          piezaArrastrada.setAttribute("draggable", "false");
          piezaArrastrada.style.cursor = "default";
          slot.style.borderColor = "#e60073";
          piezasCorrectas++;

          if (piezasCorrectas === 6) {
            mostrarBotonSiguiente();
          }
        } else {
          alert("¡Esa pieza no va aquí!");
        }
      } else {
        alert("Este espacio ya está ocupado.");
      }
    });
  });
}

// Mostrar botón siguiente
function mostrarBotonSiguiente() {
  if (indiceActual < rompecabezas.length - 1) {
    botonSiguiente.style.display = "inline-block";
  } else {
    mensajeFinal.style.display = "block";
  }
}

// Cambiar al siguiente rompecabezas
botonSiguiente.addEventListener("click", () => {
  indiceActual++;
  botonSiguiente.style.display = "none";
  cargarRompecabezas(indiceActual);
});

// Iniciar juego
cargarRompecabezas(indiceActual);
