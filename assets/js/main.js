// Variables globales para DataTables
let dataTableEventos;
let dataTableComplementos;
let dataTableServicios;

// Función para cargar eventos desde el servidor
const cargarEventos = async () => {
    try {
        let response = await fetch("php/eventos.php?action=obtener_eventos");
        let eventos = await response.json();
        return eventos;
    } catch (error) {
        console.error("Error al cargar eventos:", error);
        return [];
    }
};

// Función para inicializar DataTable de eventos
const initDataTableEventos = async () => {
    let eventos = await cargarEventos();

    // Configuración de DataTable para eventos registrados
    dataTableEventos = $('#tablaregistro').DataTable({
        data: eventos,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'date' },
            { data: 'description' },
            { data: 'salon' },
            {
                data: null,
                render: function(data, type, row) {
                    return `
                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#actualizarR" onclick="editarEvento(${row.id})">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarEvento(${row.id})">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    `;
                }
            }
        ],
        lengthMenu: [5, 10, 15, 20, 100, 200, 500],
        columnDefs: [
            { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
            { orderable: false, targets: [5] },
            { searchable: true, targets: [0, 1, 2, 3, 4] }
        ],
        pageLength: 5,
        destroy: true,
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Ningún evento encontrado",
            info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ eventos",
            infoEmpty: "Ningún evento encontrado",
            infoFiltered: "(filtrados desde _MAX_ eventos totales)",
            search: "Buscar:",
            loadingRecords: "Cargando...",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            }
        }
    });
};

// Función para inicializar DataTable de complementos
const initDataTableComplementos = () => {
    dataTableComplementos = $('#tablacomplemento').DataTable({
        // Configuración básica para complementos
        lengthMenu: [5, 10, 15, 20, 100, 200, 500],
        destroy: true,
        language: {
            // Configuración de idioma
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Ningún complemento encontrado",
            info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ complementos",
            infoEmpty: "Ningún complemento encontrado",
            infoFiltered: "(filtrados desde _MAX_ complementos totales)",
            search: "Buscar:",
            loadingRecords: "Cargando...",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            }
        }
    });
};

// Función para inicializar DataTable de servicios
const initDataTableServicios = () => {
    dataTableServicios = $('#tablaservicios').DataTable({
        // Configuración básica para servicios
        lengthMenu: [5, 10, 15, 20, 100, 200, 500],
        destroy: true,
        language: {
            // Configuración de idioma
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Ningún servicio encontrado",
            info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ servicios",
            infoEmpty: "Ningún servicio encontrado",
            infoFiltered: "(filtrados desde _MAX_ servicios totales)",
            search: "Buscar:",
            loadingRecords: "Cargando...",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            }
        }
    });
};

// Cargar los DataTables cuando la página esté completamente cargada
$(document).ready(function() {
    initDataTableEventos();
    initDataTableComplementos();
    initDataTableServicios();
});
