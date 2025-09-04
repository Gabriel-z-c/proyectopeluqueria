// == funciones ==
function saludarUsuario(nombre) {
  const saludoDiv = document.getElementById("saludo");
  if (saludoDiv) {
    saludoDiv.textContent = `¡Bienvenido/a, ${nombre}, a Estilo Único!`;
  }
}

// == función constructora ==
function Cliente(nombre, email) {
  this.nombre = nombre;
  this.email = email;
  this.presentarse = function () {
    return `Hola, soy ${this.nombre} y mi correo es ${this.email}`;
  };
}

// == datos de servicios base ==
const serviciosBase = [
  { nombre: "Corte", precio: 2500 },
  { nombre: "Tinte", precio: 4000 },
  { nombre: "Peinado", precio: 3500 }
];

const precios = serviciosBase.map(s => s.precio);
const preciosConIVA = precios.map(p => (p * 1.21).toFixed(2));
const serviciosCaros = serviciosBase.filter(s => s.precio > 3000);

// == carrito ==
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  Swal.fire({
    title: "Producto agregado",
    text: `${nombre} fue agregado al carrito.`,
    icon: "success",
    confirmButtonText: "OK"
  });
}

function mostrarCarritoEnNosotros() {
  const contenedor = document.getElementById("carrito-nosotros");
  const totalTexto = document.getElementById("total-nosotros");
  if (!contenedor || !totalTexto) return;

  contenedor.innerHTML = "";
  if (carrito.length === 0) {
    contenedor.innerHTML = "<li>No hay productos en el carrito.</li>";
    totalTexto.textContent = "";
    return;
  }

  let total = 0;
  carrito.forEach(producto => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    contenedor.appendChild(li);
    total += producto.precio;
  });

  totalTexto.textContent = `Total parcial: $${total}`;
}

// == servicios base en otras páginas ==
function mostrarServiciosDisponibles() {
  const contenedor = document.getElementById("lista-servicios-disponibles");
  if (contenedor) {
    contenedor.innerHTML = "<h3>Servicios disponibles:</h3>";
    const ul = document.createElement("ul");
    serviciosBase.forEach(serv => {
      const li = document.createElement("li");
      li.textContent = `${serv.nombre}`;
      ul.appendChild(li);
    });
    contenedor.appendChild(ul);
  }
}

// == servicios catálogo para servicios.html ==
const serviciosCatalogo = [
  { nombre: "Corte Profesional", precio: 5000 },
  { nombre: "Coloración", precio: 7000 },
  { nombre: "Peinado", precio: 6000 }
];

function mostrarServicios() {
  const listaServicios = document.getElementById("lista-servicios");
  if (!listaServicios) return;

  listaServicios.innerHTML = ""; // limpia contenido previo

  serviciosCatalogo.forEach(servicio => {
    const div = document.createElement("div");
    div.className = "servicio";
    div.innerHTML = `
      <h3>${servicio.nombre}</h3>
      <p>Precio: $${servicio.precio}</p>
      <button onclick="agregarAlCarrito('${servicio.nombre}', ${servicio.precio})">Agregar al carrito</button>
    `;
    listaServicios.appendChild(div);
  });

  // Mostrar promoción
  obtenerPromocion().then(msg => {
    const promo = document.createElement("p");
    promo.textContent = msg;
    promo.style.color = "green";
    listaServicios.appendChild(promo);
  });
}

// == servicios y simulación async ==
function obtenerServicios() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(["Corte", "Coloración", "Peinados"]);
    }, 2000);
  });
}

async function mostrarServiciosEnDOM() {
  const contenedor = document.getElementById("servicios-async");
  if (contenedor) {
    contenedor.textContent = "Cargando servicios desde API simulada...";
    const lista = await obtenerServicios();
    contenedor.innerHTML = "<h3>Servicios disponibles (API):</h3><ul>" +
      lista.map(s => `<li>${s}</li>`).join("") +
      "</ul>";
  }
}

// == promoción ==
async function obtenerPromocion() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("¡10% de descuento si reservas hoy!");
    }, 2000);
  });
}

// == formulario de contacto ==
function manejarFormularioContacto() {
  const form = document.getElementById("formulario-contacto");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
      Swal.fire("Error", "Por favor completá todos los campos.", "error");
      return;
    }

    Swal.fire("Mensaje enviado", `Gracias por escribirnos, ${nombre}.`, "success");
    form.reset();
  });
}

// == DOMContentLoaded ==
document.addEventListener("DOMContentLoaded", () => {
  saludarUsuario("Cliente");

  const clienteEjemplo = new Cliente("Lucía", "lucia@email.com");
  const presentacion = document.getElementById("presentacion-cliente");
  if (presentacion) {
    presentacion.textContent = clienteEjemplo.presentarse();
  }

  mostrarServiciosDisponibles();
  mostrarServiciosEnDOM();
  mostrarCarritoEnNosotros();
  manejarFormularioContacto();
  mostrarServicios();

  // Mostrar precios con IVA
  const preciosIva = document.getElementById("precios-iva");
  if (preciosIva) {
    const serviciosIVA = serviciosBase.map(s => `${s.nombre}: $${(s.precio * 1.21).toFixed(2)} (IVA incluido)`);
    preciosIva.innerHTML = serviciosIVA.join("<br>");
  }

  // Servicios caros
  const carosCont = document.getElementById("servicios-caros");
  if (carosCont) {
    const caros = serviciosCaros.map(s => s.nombre).join(", ");
    carosCont.textContent = `Servicios con precio mayor a $3000: ${caros}`;
  }
});
