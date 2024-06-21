var sesion = localStorage.getItem('usuario') || "null";
if (sesion === "null") {
    window.location.href = "index.html";
}

var nombre = document.getElementById("nombre");
var apellido = document.getElementById("ap");

const cargarNombre = async () => {
  let datos = new FormData();
  datos.append("usuario", sesion);
  datos.append("action", "select");

  try {
      let respuesta = await fetch("php/usuario.php", { method: 'POST', body: datos });
      if (!respuesta.ok) {
          throw new Error('Network response was not ok');
      }
      let json = await respuesta.json();

      if (json.success === true) {
          document.getElementById("user").innerHTML = `Hola, ${json.mensaje}`;

          // Cargar la imagen de perfil
          if (json.foto && json.foto.trim() !== '') {
              document.getElementById("foto_perfil").src = `php/${json.foto.trim()}`;
          } else {
              document.getElementById("foto_perfil").src = 'assets/img_profile/icono3.jpeg'; // Imagen por defecto
          }
      } else {
          Swal.fire({ title: "ERROR", text: json.mensaje, icon: "error" });
      }
  } catch (error) {
      Swal.fire({ title: "ERROR", text: "Error al cargar los datos", icon: "error" });
  }
}

// Asignación de eventos onclick
document.addEventListener("DOMContentLoaded", function() {
    const btnSalir = document.getElementById("btnSalir");
    if (btnSalir) {
        btnSalir.onclick = async () => {
            Swal.fire({
                title: "¿Estás seguro de cerrar sesión?",
                showDenyButton: true,
                confirmButtonText: "Sí, estoy seguro",
                denyButtonText: "No, cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    window.location.href = "index.html";
                } 
            });
        }
    } else {
        console.error('Elemento "btnSalir" no encontrado en el DOM.');
    }
});
const cargarPerfil = async () => {
    let datos = new FormData();
    datos.append("usuario", sesion);
    datos.append("action", "perfil");

    try {
        let respuesta = await fetch("php/usuario.php", { method: 'POST', body: datos });
        if (!respuesta.ok) {
            throw new Error('Network response was not ok');
        }
        let json = await respuesta.json();

        if (json.success === true) {
            document.getElementById("email").innerHTML = json.usuario;
            document.getElementById("nombre").value = json.nombre;
            document.getElementById("ap").value = json.apellido;
            if (json.foto.trim() !== '') {
                document.getElementById("foto-preview").innerHTML = `<img src="php/${json.foto.trim()}" class="foto-perfil">`;
                document.getElementById("foto-preview1").innerHTML = `<img src="php/${json.foto.trim()}" class="profile-photo">`;
                document.getElementById("foto_perfil").src = `php/${json.foto.trim()}`;
            } else {
                document.getElementById("foto-preview").innerHTML = '';
                document.getElementById("foto_perfil").src = '';
                document.getElementById("foto-preview1").innerHTML = '';
            }
        } else {
            Swal.fire({ title: "ERROR", text: json.mensaje, icon: "error" });
        }
    } catch (error) {
        Swal.fire({ title: "ERROR", text: "Error al cargar el perfil", icon: "error" });
    }
}

const guardarPerfil = async () => {
  let formPerfil = document.getElementById("formPerfil");
  let datos = new FormData(formPerfil);
  datos.append("usuario", sesion);
  datos.set("nombre", nombre.value);
  datos.set("apellido", apellido.value);
  datos.append("action", "saveperfil");

  try {
      let respuesta = await fetch("php/usuario.php", { method: 'POST', body: datos });
      if (!respuesta.ok) {
          throw new Error('Network response was not ok');
      }
      let json = await respuesta.json();

      if (json.success === true) {
          Swal.fire({ title: "ÉXITO!!!", text: json.mensaje, icon: "success" });
          cargarPerfil();
      } else {
          Swal.fire({ title: "ERROR", text: json.mensaje, icon: "error" });
      }
  } catch (error) {
      Swal.fire({ title: "ERROR", text: "Error al guardar el perfil", icon: "error" });
  }
}

document.getElementById("btnGuardar").onclick = guardarPerfil;
document.getElementById("btnguardarf").onclick = guardarPerfil;

// Función para cargar los clientes desde el servidor
// Función para cargar clientes desde el servidor
const cargarClientes = async () => {
    let datos = new FormData();
    datos.append("action", "clientes");

    try {
        let respuesta = await fetch("php/usuario.php", { method: 'POST', body: datos });
        if (!respuesta.ok) {
            throw new Error('Network response was not ok');
        }
        let texto = await respuesta.text(); // Obtener el texto de la respuesta

        try {
            let json = JSON.parse(texto); // Intentar parsear como JSON
            console.log('Respuesta del servidor al cargar clientes:', json);

            if (json.success === true) {
                let selectCl = document.getElementById("clientes");
                if (selectCl) { // Verificar si el elemento existe antes de manipularlo
                    selectCl.innerHTML = '<option value="">Clientes</option>'; // Limpiar las opciones anteriores

                    json.clientes.forEach(cliente => {
                        let option = document.createElement("option");
                        option.value = cliente.idcl;
                        option.text = cliente.nombre;
                        selectCl.appendChild(option);
                    });
                } else {
                    console.error('Elemento "clientes" no encontrado en el DOM.');
                }
            } else {
                Swal.fire({ title: "ERROR", text: json.mensaje, icon: "error" });
            }
        } catch (error) {
            console.error('Error al parsear la respuesta JSON:', error);
            Swal.fire({ title: "ERROR", text: "Error al procesar los datos del servidor", icon: "error" });
        }
    } catch (error) {
        console.error('Error al cargar los clientes:', error);
        Swal.fire({ title: "ERROR", text: "Error al cargar los clientes", icon: "error" });
    }
}

// Llamada a la función para cargar clientes al cargar la página
window.onload = () => {
    cargarNombre();
    cargarPerfil();
    cargarClientes();
}
