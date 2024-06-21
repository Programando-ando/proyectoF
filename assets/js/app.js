document.addEventListener('DOMContentLoaded', () => {
    const clienteForm = document.getElementById('cliente-form');
    const clientesTableBody = document.querySelector('#clientes-table tbody');

    if (clienteForm) {
        clienteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(clienteForm);
            const id = document.getElementById('cliente-id').value;
            const action = id ? 'edit' : 'add';
            formData.append('action', action);
            formData.append('id', id);

            const response = await fetch('php/crud.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                Swal.fire("Exito!", "Se registro Correctamente", "success");
                limpiar();
            } else {
                Swal.fire("Error", result.message , "error");
                //alert(result.message);
            }
        });

        const urlParams = new URLSearchParams(window.location.search);
        const clienteId = urlParams.get('id');
        if (clienteId) {
            fetchCliente(clienteId);
        }
    }

    if (clientesTableBody) {
        loadClientes();
    }
});

async function loadClientes() {
    const response = await fetch('php/crud.php?action=list');
    const clientes = await response.json();
    const clientesTableBody = document.querySelector('#clientes-table tbody');
    clientesTableBody.innerHTML = '';
    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.correo}</td>
            <td>${cliente.telefono}</td>
            <td>
                <a href="form.html?id=${cliente.id}">Editar</a>
                <button onclick="deleteCliente(${cliente.id})">Eliminar</button>
            </td>
        `;
        clientesTableBody.appendChild(row);
    });
}

async function fetchCliente(id) {
    const response = await fetch(`php/crud.php?action=get&id=${id}`);
    const cliente = await response.json();
    document.getElementById('nombre').value = cliente.nombre;
    document.getElementById('correo').value = cliente.correo;
    document.getElementById('telefono').value = cliente.telefono;
}

async function deleteCliente(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        const response = await fetch(`php/crud.php?action=delete&id=${id}`, {
            method: 'POST'
        });
        const result = await response.json();
        if (result.success) {
            loadClientes();
        } else {
            alert(result.message);
        }
    }
}

function limpiar() {
    var nombre=document.getElementById('nombre');
    var correo=document.getElementById('correo');
    var telefono=document.getElementById('telefono');
    nombre.value="";
    correo.value="";
    telefono.value="";
}