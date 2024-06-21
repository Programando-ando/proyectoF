document.addEventListener('DOMContentLoaded', function() {
    fetchEvents();
    fetchComplementos(); // Asegurarse de cargar los complementos al inicio
    fetchServicios(); // Asegurarse de cargar los servicios al inicio

    document.getElementById('eventForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const eventsalon = document.getElementById('Salon');
        const varlorsalon = eventsalon.value;
        let ss = 0;
        let direccion = "";

        if (varlorsalon == "Jardin") {
            ss = 1;
            direccion = "calle arcadio estevez mz18 lt13, Ecatepec de Morelos";
        } else if (varlorsalon == "Formal") {
            ss = 2;
            direccion = "Calle Tepozotlan Mz:BJ LT:31 Lomas de tecamac";
        } else if (varlorsalon == "Elegante") {
            ss = 3;
            direccion = "Independencia 22 colonia 5 de Mayo Tecamac";
        } else if (varlorsalon == "Conferencia") {
            ss = 4;
            direccion = "calle mariano abazolo Mz11 Lt11 colonia lomas de San Pedro Atzompa";
        } else if (varlorsalon == "Juvenil") {
            ss = 5;
            direccion = "Cda Sierra la Estrella LT6 V23 COND26 MZ50";
        }

        const formData = new FormData();
        formData.append('action', 'agregar_evento');
        formData.append('name', eventName);
        formData.append('date', eventDate);
        formData.append('description', eventDescription);
        formData.append('direccion', direccion);
        formData.append('salon', ss);

        fetch('php/eventos.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes("Error")) {
                Swal.fire("Error", "No se pudo añadir el evento. " + data, "error");
            } else {
                Swal.fire("Válido", "Evento añadido exitosamente.", "success");
                fetchEvents(); // Actualizar la lista de eventos después de agregar uno
                document.getElementById('eventForm').reset();
                calcularTotalGeneral(); // Calcular el total general después de añadir evento
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire("Error", "No se pudo añadir el evento.", "error");
        });
    });

    var btnservicio = document.getElementById("btnservicio");
    btnservicio.addEventListener('click', async () => {
        const eventserv = document.getElementById('Servicio').value;
        const cantserv = document.getElementById("cantserv").value;

        const formData = new FormData();
        formData.append('action', 'agregar_servicio');
        formData.append('nombre', eventserv);
        formData.append('cantidad', cantserv);

        fetch('php/eventos.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes("Error")) {
                Swal.fire("Error", "No se pudo añadir el servicio. " + data, "error");
            } else {
                Swal.fire("Válido", "Servicio añadido exitosamente.", "success");
                fetchServicios(); // Actualizar la lista de servicios después de agregar uno
                document.getElementById('cantserv').value = ''; // Limpiar el campo de cantidad
                calcularTotalGeneral(); // Calcular el total general después de añadir servicio
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire("Error", "No se pudo añadir el servicio.", "error");
        });
    });

    var btncomplementos = document.getElementById("btncomplementos");
    btncomplementos.addEventListener('click', async () => {
        const eventcomple = document.getElementById('Complemento').value;
        const cantcom = document.getElementById("cantcom").value;

        const formData = new FormData();
        formData.append('action', 'agregar_complemento');
        formData.append('complemento', eventcomple);
        formData.append('cant', cantcom);

        fetch('php/eventos.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes("Error")) {
                Swal.fire("Error", "No se pudo añadir el complemento. " + data, "error");
            } else {
                Swal.fire("Válido", "Complemento añadido exitosamente.", "success");
                fetchComplementos(); // Actualizar la lista de complementos después de agregar uno
                document.getElementById('cantcom').value = ''; // Limpiar el campo de cantidad
                calcularTotalGeneral(); // Calcular el total general después de añadir complemento
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire("Error", "No se pudo añadir el complemento.", "error");
        });
    });

    // Función para calcular el total general
    function calcularTotalGeneral() {
        fetch('php/eventos.php?action=calcular_total_general')
        .then(response => response.json())
        .then(data => {
            const totalServiciosElement = document.getElementById('totalServicios');
            const totalComplementosElement = document.getElementById('totalComplementos');
            const totalGeneralElement = document.getElementById('totalGeneral');

            totalServiciosElement.textContent = `Total de Servicios: ${data.total_servicios}`;
            totalComplementosElement.textContent = `Total de Complementos: ${data.total_complementos}`;
            totalGeneralElement.textContent = `Total General: ${data.total_general}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Función para obtener y mostrar eventos
    function fetchEvents() {
        fetch('php/eventos.php?action=obtener_eventos')
        .then(response => response.json())
        .then(data => {
            const eventTable = document.getElementById('tablaregistro');
            eventTable.innerHTML = ''; // Limpiar la tabla antes de agregar datos nuevos

            data.forEach(event => {
                const row = eventTable.insertRow();
                row.innerHTML = `
                    <td>${event.id}</td>
                    <td>${event.name}</td>
                    <td>${event.date}</td>
                    <td>${event.description}</td>
                    <td>${event.direccion}</td>
                    <td>${event.salon}</td>
                `;
            });
        });
    }

    // Función para obtener y mostrar servicios
    function fetchServicios() {
        fetch('php/eventos.php?action=obtener_servicios')
        .then(response => response.json())
        .then(data => {
            const serviciosTable = document.getElementById('tablaservicios');
            serviciosTable.innerHTML = ''; // Limpiar la tabla antes de agregar datos nuevos

            data.forEach(servicio => {
                const row = serviciosTable.insertRow();
                row.innerHTML = `
                    <td>${servicio.nombre}</td>
                    <td>${servicio.cantidad}</td>
                `;
            });
        });
    }

    // Función para obtener y mostrar complementos
    function fetchComplementos() {
        fetch('php/eventos.php?action=obtener_complementos')
        .then(response => response.json())
        .then(data => {
            const complementoTable = document.getElementById('tablacomplemento');
            complementoTable.innerHTML = ''; // Limpiar la tabla antes de agregar datos nuevos

            data.forEach(complemento => {
                const row = complementoTable.insertRow();
                row.innerHTML = `
                    <td>${complemento.complemento}</td>
                    <td>${complemento.cant}</td>
                `;
            });
        });
    }
});
