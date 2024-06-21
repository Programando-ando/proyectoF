$(document).ready(function() {
    $('#formFecha').submit(function(event) {
      event.preventDefault();
      var formData = $(this).serialize();
      $.ajax({
        type: 'POST',
        url: 'php/ontener_eventos.php',
        data: formData,
        success: function(response) {
          mostrarGrafico(JSON.parse(response));
        }
      });
    });
  });
  
  function mostrarGrafico(data) {
    var meses = [];
    var cantidadEventos = [];
    
    // Preparar datos para Chart.js
    data.forEach(function(item) {
      meses.push(item.nombre_mes); // Utilizamos el nombre del mes enviado desde PHP
      cantidadEventos.push(item.cantidad_eventos);
    });
    
    // Configuración del gráfico
    var ctx = document.getElementById('eventosPorMes').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [{
          label: 'Cantidad de Eventos',
          data: cantidadEventos,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }