const chartTraffic = document.getElementById('chart-traffic');


new Chart(chartTraffic, {
    type: 'line',
    data: {
      labels: ['1', '2', '3', '4', '5', '6' , '1', '2', '3', '4', '5', '6'],
      datasets: [{
        data: [12, 19, 3, 5],
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stepSize:100
        },
        x: {
          grid:{
            display:false
          }
        }
      },
      borderRadius:10
    }
});

//chart-traffic-content
//'doughnut

const chartTrafficContent = document.getElementById('chart-traffic-content');

new Chart(chartTrafficContent, {
    type: 'doughnut',
    data: {
      datasets: [{
        label: 'Analyse du traffic réseau',
        data: [12, 19, 3],
      }]
    }
});

//chart-sitePop

const chartSitePop = document.getElementById('chart-sitePop');
let dataSitePop = [];
let labelSitePop = [];
let sitePopChart;

function fetchData() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', './data/backend_test/json.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              let tabSitePop = JSON.parse(xhr.responseText);
              labelSitePop = [];
              dataSitePop = [];
              for(let sitePop of tabSitePop){
                   labelSitePop.push(sitePop.domain);
                   dataSitePop.push(sitePop.number);
              }
              console.log(dataSitePop);
              console.log(labelSitePop);
              
              if (!sitePopChart) {
                sitePopChart = new Chart(chartSitePop, {
                  type: 'bar',
                  data: {
                    datasets: [{
                      label:'Nombre de visite du site',
                      data: dataSitePop,
                      backgroundColor:"#FFFFFF"
                    }],
                    labels: labelSitePop,
                  },
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    },
                    borderRadius: 10,
                    barPercentage: 0.7
                  }
                });
              }
          } else {
              console.error('Erreur lors de la récupération des données:', xhr.status);
          }
      }
  };
  xhr.send();
}

fetchData();
//setInterval(fetchData, 1000);


//chart-proxyCharge

const chartProxyCharge = document.getElementById('chart-proxyCharge');

new Chart(chartProxyCharge , {
  type: 'pie',
  data: {
    datasets: [{
      data: [65 , 35],
      backgroundColor:['#E7BB2D' ,'#202124']
    }],
    labels: ['utilisé', 'libre']
  }
})