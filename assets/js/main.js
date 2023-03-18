//----------------loading--------------------------------
const loaderContainer = document.querySelector('.loading');
let inicio = new Date;

window.addEventListener('load', () => {
    
    let fin = new Date;
    let segundos = (fin-inicio);

    if(segundos < 1000){
        setTimeout(() => {
            loaderContainer.style.display = 'none';
        }, 1000);
    }else{
        loaderContainer.style.display = 'none';
    }
   console.log(segundos)
    
});
//--------------------------------------------------------

const contenedorProductos = document.querySelector('#contenedor-productos');
const contenedorCarrito = document.querySelector('#contenedor-carrito');
const carritoTotal = document.querySelector('#carrito-total');
const carritoProductos = document.querySelector('#carrito-productos');
const buscador = document.querySelector('#buscador');
const botonComprar = document.querySelector('#boton-comprar');
const precioEnvio = 1000;


let carrito = [];
let productos = [];

// Obtener los productos desde el archivo JSON
fetch('../assets/json/productos.json')
  .then(response => response.json()) // Convertir la respuesta a formato JSON
  .then(data => {
    productos = data; // Almacenar los productos en la variable productos
    mostrarProductos(productos); // Mostrar los productos en el contenedor correspondiente
  })
  .catch(error => console.error(error)); // Manejar errores en caso de que ocurran

// Función para mostrar los productos en el contenedor de productos
function mostrarProductos(productos) {
    contenedorProductos.innerHTML = '';
    productos.forEach((producto) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <p class="card-text">Stock: ${producto.stock}</p>
          <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      `;
      const btnAgregar = div.querySelector('.agregar-carrito'); // Seleccionar el botón "Agregar al carrito"
      btnAgregar.addEventListener('click', () => agregarProducto(producto.id)); // Agregar el event listener
      contenedorProductos.appendChild(div);
    });
  }

// Función para ordenar los productos por nombre o precio
function ordenarProductos(productos, orden) {
  if (orden === 'nombre') {
    productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (orden === 'precio') {
    productos.sort((a, b) => a.precio - b.precio);
  }
  return productos;
}

// Función para filtrar los productos por nombre
function filtrarProductos(productos, texto) {
  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(texto.toLowerCase())
  );
}

// Función para actualizar el contador del carrito
function actualizarCarrito() {
  carritoTotal.innerText = carrito.reduce(
    (total, producto) => (total += producto.cantidad * producto.precio),
    0
  );
  carritoProductos.innerHTML = '';
  carrito.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio} x ${producto.cantidad}</p>
        <button class="btn btn-danger eliminar-carrito" data-id="${producto.id}">Eliminar del carrito</button>
      </div>
    `;
    const btnEliminar = div.querySelector('.eliminar-carrito'); // seleccionar el botón "Eliminar del carrito"
    btnEliminar.addEventListener('click', () => eliminarProducto(producto.id)); // agregar el event listener
    carritoProductos.appendChild(div);
  });
}

// Función para agregar un producto al carrito
function agregarProducto(id) {
  const producto = productos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });
  }
  actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
  
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito.cantidad > 1) {
    productoEnCarrito.cantidad--;
  } else {
    carrito = carrito.filter((producto) => producto.id !== id);
  }
  actualizarCarrito(); // Agregar esta línea para actualizar el carrito después de eliminar el producto
}
//funcion actulizar carrito
function actualizarCarrito() {
  let precioTotal = carrito.reduce(
    (total, producto) => (total += producto.cantidad * producto.precio),
    0
  );
  if (document.querySelector('#envio').checked) {
    precioTotal += precioEnvio;
  }
  carritoTotal.innerText = precioTotal;
  carritoProductos.innerHTML = '';
  carrito.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <<p class="card-text">$${producto.precio} x ${producto.cantidad}</p>
        <button class="btn btn-danger eliminar-carrito" data-id="${producto.id}">Eliminar del carrito</button>
      </div>
    `;
    carritoProductos.appendChild(div);
  });
}

// Función principal
function main() {
    // Cargar los productos desde el archivo JSON
    fetch('../assets/json/productos.json')
      .then((response) => response.json())
      .then((productos) => {
        mostrarProductos(productos);
        // Agregar el event listener al botón "Comprar"
        botonComprar.addEventListener('click', () => {
          const precioTotal = carritoTotal.innerText;
          const envio = confirm('¿Desea agregar envío?');
          let totalConEnvio = envio ? parseFloat(precioTotal) + 10 : parseFloat(precioTotal);
          alert(`Total de la compra: $${totalConEnvio}`);
          carrito = [];
          actualizarCarrito();
        });
      });
  
    // Agregar el event listener al buscador
    buscador.addEventListener('input', () => {
      const textoBusqueda = buscador.value;
      const productosFiltrados = filtrarProductos(productos, textoBusqueda);
      mostrarProductos(productosFiltrados);
    });
  }
  

//// map contactos ////
function iniciarMap(){
    var coord = {lat:-36.2363956 ,lng: -61.1231523};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
}
 
//// CONTACTO ////

///Función para guardar los datos en el localStorage: ///
function guardarDatos() {
    // Obtener los valores de los campos del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const comment = document.getElementById("comment").value;
    
  
    // Crear un objeto con los datos //
    const datos = { name, email, phone, comment};
  
    // Convertir el objeto a una cadena JSON
    const datosJson = JSON.stringify(datos);
  
    // Guardar la cadena JSON en el localStorage
    localStorage.setItem("datos", datosJson);
  }

  ///Funcion para recuperar los datos guardados en el localStorage //
  function recuperarDatos() {
    // Obtener la cadena JSON del localStorage
    const datosJson = localStorage.getItem("datos");
  
    // Convertir la cadena JSON a un objeto
    const datos = JSON.parse(datosJson);
  
    // Asignar los valores a los campos del formulario
    document.getElementById("name").value = datos.name;
    document.getElementById("email").value = datos.email;
    document.getElementById("phone").value = datos.phone;
    document.getElementById("comment").value = datos.phone;
  }

//// USUARIO ///

// Función para mostrar/ocultar formularios
function toggleForms(formToShow, formToHide) {
    document.getElementById(formToShow).style.display = "block";
    document.getElementById(formToHide).style.display = "none";
  }
  
  // Formulario para crear cuenta
  const newAccountForm = document.getElementById("new-account-form");
  newAccountForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const email = event.target.email.value;
    // Aquí se podría enviar una solicitud para crear la cuenta en el servidor
    console.log(`Creando cuenta con usuario ${username}, contraseña ${password} y correo electrónico ${email}`);
    toggleForms("user-account", "create-account-form");
  });
  
  // Formulario para iniciar sesión
  const loginForm = document.getElementById("login-account-form");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    // Aquí se podría enviar una solicitud para verificar las credenciales en el servidor
    console.log(`Iniciando sesión con usuario ${username} y contraseña ${password}`);
    toggleForms("user-account", "login-form");
  });
  
  // Botón para mostrar formulario de creación de cuenta
  const createAccountButton = document.getElementById("create-account-button");
  createAccountButton.addEventListener("click", () => {
    toggleForms("create-account-form", "login-form");
  });
  
  // Botón para mostrar formulario de inicio de sesión
  const loginButton = document.getElementById("login-button");
  loginButton.addEventListener("click", () => {
    toggleForms("login-form", "create-account-form");
  });
  
  // Botón para cerrar sesión
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    toggleForms("create-account-form", "user-account");
  });
  
  // Al cargar la página, se ocultan los formularios de creación de cuenta e inicio de sesión
  toggleForms("create-account-form", "login-form");

 



