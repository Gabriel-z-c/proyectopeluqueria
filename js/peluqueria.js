
// FUNCIONES BÁSICAS
function saludarUsuario(nombre) {
  const saludoDiv = document.getElementById("saludo");
  if (saludoDiv) {
    saludoDiv.textContent = `¡Bienvenido/a, ${nombre}, a Estilo Único!`;
  }
}
saludarUsuario("Cliente");

// ARRAYS
const serviciosDisponibles = ["Corte", "Tinte", "Peinado"];
function mostrarServiciosDisponibles() {
  const contenedor = document.getElementById("lista-servicios-disponibles");
  if (contenedor) {
    contenedor.innerHTML = "<h3>Servicios disponibles:</h3>";
    const ul = document.createElement("ul");
    serviciosDisponibles.forEach(servicio => {
      const li = document.createElement("li");
      li.textContent = servicio;
      ul.appendChild(li);
    });
    contenedor.appendChild(ul);
  }
}
mostrarServiciosDisponibles();

// FUNCIÓN CONSTRUCTORA
function Cliente(nombre, email) {
  this.nombre = nombre;
  this.email = email;
  this.presentarse = function () {
    return `Hola, soy ${this.nombre} y mi correo es ${this.email}`;
  };
}
const clienteEjemplo = new Cliente("Lucía", "lucia@email.com");

// FUNCIONES DE ORDEN SUPERIOR
const precios = [2500, 4000, 3500];
const preciosConIVA = precios.map(precio => (precio * 1.21).toFixed(2));
const serviciosCaros = precios.filter(precio => precio > 3000);

// ASINCRONISMO - FETCH SIMULADO
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

// PROMOCIÓN ASÍNCRONA (SIMULACIÓN)
async function obtenerPromocion() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("¡10% de descuento si reservas hoy!");
    }, 2000);
  });
}

// DOM - AL CARGAR EL DOCUMENTO
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar presentación cliente ejemplo
  const presentacionDiv = document.getElementById("presentacion-cliente");
  if (presentacionDiv) {
    presentacionDiv.textContent = clienteEjemplo.presentarse();
  }

  // Mostrar precios con IVA y servicios caros
  const preciosIVACont = document.getElementById("precios-iva");
  if (preciosIVACont) {
    preciosIVACont.textContent = "Precios con IVA: " + preciosConIVA.join(", ");
  }
  const carosCont = document.getElementById("servicios-caros");
  if (carosCont) {
    carosCont.textContent = "Servicios mayores a $3000: " + serviciosCaros.join(", ");
  }

  // Mostrar servicios asincrónicos
  mostrarServiciosEnDOM();

  // Mostrar servicios en servicios.html (si existe)
  const servicios = [
    { nombre: "Corte Profesional", precio: 5000 },
    { nombre: "Coloración", precio: 7000 },
    { nombre: "Peinado", precio: 6000 }
  ];

  const listaServicios = document.getElementById("lista-servicios");
  if (listaServicios) {
    servicios.forEach(servicio => {
      const div = document.createElement("div");
      div.className = "servicio";
      div.innerHTML = `
        <h3>${servicio.nombre}</h3>
        <p>Precio: $${servicio.precio}</p>
      `;
      listaServicios.appendChild(div);
    });

    obtenerPromocion().then(msg => {
      const promo = document.createElement("p");
      promo.textContent = msg;
      promo.style.color = "green";
      listaServicios.appendChild(promo);
    });
  }

  // Formulario de contacto
  const formulario = document.getElementById("formulario-contacto");
  if (formulario) {
    formulario.addEventListener("submit", e => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      const salida = document.getElementById("salida-contacto");
      if (!nombre || !email || !mensaje) {
        salida.textContent = "Por favor, completa todos los campos.";
        salida.style.color = "red";
        return;
      }

      const cliente = new Cliente(nombre, email);
      localStorage.setItem("cliente", JSON.stringify(cliente));

      salida.innerHTML = `
        <h3>Gracias por contactarnos, ${cliente.nombre}.</h3>
        <p>Te responderemos pronto a <strong>${cliente.email}</strong>.</p>
        <p>Mensaje: ${mensaje}</p>
      `;
      salida.style.color = "green";

      formulario.reset();
    });

    // Mostrar nombre en tiempo real (opcional)
    const nombreInput = document.getElementById("nombre");
    if (nombreInput) {
      nombreInput.addEventListener("input", () => {
        const nombreLive = document.getElementById("nombre-live");
        if (nombreLive) {
          nombreLive.textContent = `Nombre ingresado: ${nombreInput.value}`;
        }
      });
    }
  }
});
