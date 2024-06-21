// Verificar si ya existe una sesión activa
var sesion = localStorage.getItem('usuario') || "null";
if (sesion !== "null") {
  window.location.href = "inicio.html";
}

function validarCorreo(correo) {
  var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
  return regex.test(correo.trim());
}

function validarPassword(password) {
  var regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  return regex.test(password.trim());
}

const login = async () => {
  let usuario = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  if (usuario.trim() === "" || password === "") {
      Swal.fire("ERROR", "Tienes campos vacíos", "error");
      return;
  }

  if (!validarCorreo(usuario)) {
      Swal.fire("ERROR", "Correo no valido", "error");
      return;
  }
  if (!validarPassword(password)) {
      Swal.fire("ERROR", "Password no valido", "error");
      return;
  }

  let datos = new FormData();
  datos.append("usuario", usuario);
  datos.append("password", password);
  datos.append("action", "login");
  let respuesta = await fetch("php/usuario.php", { method: 'POST', body: datos });
  let json = await respuesta.json();

  if (json.success === true) {
      Swal.fire("¡INICIO DE SESION CORRECTO!", json.mensaje, "success").then(() => {
          localStorage.setItem("usuario", usuario);
          window.location.href = "inicio.html";
      });
  } else {
      Swal.fire("ERROR", json.mensaje, "error");
  }
}

const Registrar = async () => {
  let usuario = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("ap").value;
  if (usuario.trim() === "" || password.trim() === "" || nombre.trim() === "" || apellido.trim() === "") {
      Swal.fire("ERROR", "Tienes campos vacíos", "error");
      return;
  }

  if (!validarCorreo(usuario)) {
      Swal.fire("ERROR", "Correo no valido", "error");
      return;
  }
  if (!validarPassword(password)) {
      Swal.fire("ERROR", "Password no valido", "error");
      return;
  }

  let datos = new FormData();
  datos.append("usuario", usuario);
  datos.append("password", password);
  datos.append("nombre", nombre);
  datos.append("apellido", apellido);
  datos.append("action", "registrar");

  let respuesta = await fetch("php/usuario.php", { method: 'POST', body: datos });
  let json = await respuesta.json();

  if (json.success === true) {
      Swal.fire("¡REGISTRO ÉXITOSO!", json.mensaje, "success").then(() => {
          document.getElementById("registroForm").reset();
      });
  } else {
      Swal.fire("ERROR", json.mensaje, "error");
  }
}

function togglePassword() {
    var passwordInput = document.getElementById('pass');
    var toggleIcon = document.getElementById('toggleIcon');
  
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.classList.add('fa-eye-slash');
      toggleIcon.classList.remove('fa-eye');
    } else {
      passwordInput.type = 'password';
      toggleIcon.classList.add('fa-eye');
      toggleIcon.classList.remove('fa-eye-slash');
    }
  }
  
  