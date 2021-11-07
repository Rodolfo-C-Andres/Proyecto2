// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

// Bar Chart Example
var ctxBarChart = document.getElementById("myBarChart");
var ctxPieChart = document.getElementById("myPieChart");


async function getReporte() {
  const rawResponse = await fetch("http://127.0.0.1:4000/usuarios/reporte", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // Datos del reporte
  const response = await rawResponse.json();

  // Arreglo de claves
  const edades_ = Object.keys(response.data)

  // Arreglo de valores
  const valores_ = Object.values(response.data)

  var myBarChart = new Chart(ctxBarChart, {
    type: "bar",
    data: {
      //labels: ["January", "February", "March", "April", "May", "June"],
      labels: edades_,
      datasets: [
        {
          label: "Reporte edades",
          backgroundColor: "#4e73df",
          hoverBackgroundColor: "#2e59d9",
          borderColor: "#4e73df",
          //data: [4215, 5312, 6251, 7841, 9821, 14984],
          data: valores_,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0,
        },
      },
      scales: {
        xAxes: [
          {
            time: {
              unit: "edades",
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              maxTicksLimit: 6,
              callback: function (value, index, values) {
                return value + " años";
              },
            },
            maxBarThickness: 25,
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              max: Math.max(...valores_),
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return value + " personas";
              },
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2],
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        titleMarginBottom: 10,
        titleFontColor: "#6e707e",
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
          label: function (tooltipItem, chart) {
            var datasetLabel =
              chart.datasets[tooltipItem.datasetIndex].label || "";
            return datasetLabel + ": " + tooltipItem.yLabel + " personas";
          },
        },
      },
    },
  });

  const coloresPie = edades_.map(edad => colorRandom())

  var myPieChart = new Chart(ctxPieChart, {
    type: 'doughnut',
    data: {
      labels: edades_.map(edad => edad + " años"),
      datasets: [{
        data: valores_,
        backgroundColor: coloresPie,
        hoverBackgroundColor: coloresPie,
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
}

// jsPDF

function colorRandom(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

getReporte();
