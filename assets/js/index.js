(() => {
  axios.get("https://api.covid19api.com/summary")
    .then(res => {
      let today = new Date();
      let todayFormated = dateFns.format(today, 'DD-MM-YYYY HH:mm');

      document.getElementById("confirmed").innerText = res.data.Global.TotalConfirmed.toLocaleString("PT");
      document.getElementById("death").innerText = res.data.Global.TotalDeaths.toLocaleString("PT");
      document.getElementById("recovered").innerText = res.data.Global.TotalRecovered.toLocaleString("PT");
      document.getElementById("date").innerText = 'Update Date: ' + todayFormated;

      RenderPizza(res);
      RenderBar();
    });


})();

function RenderPizza(res) {
  new Chart(document.getElementById("pizza"), {
    type: 'pie',
    data: {
      labels: ["Confirmed", "Recovered", "Deaths"],
      datasets: [{
        data: [res.data.Global.TotalConfirmed, res.data.Global.TotalRecovered, res.data.Global.TotalDeaths],
        backgroundColor: ["#FE6283", "#36A2EB", "#FFD267"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: "Distribution of new cases"
        }
      }
    }
  })
}

function RenderBar() {
  new Chart(document.getElementById("barras"), {
    type: 'bar',
    data: {
      labels: ["Palio", "Uno", "Gol", "Corsa", "Up", "Onix"],
      datasets: [
        {
          label: "Total Deaths by country - Top 10",
          data: [10, 35, 24, 11, 12, 19],
          backgroundColor: "#0F0F0F"
        },
      ]
    },
    options: {
      reponsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: "Vendas de Veiculos"
        }
      }
    }
  });
}




