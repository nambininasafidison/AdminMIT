const level = ['Tous' , 'L1' , 'L2' , 'L3' , 'M1' , 'M2'];

const chartTraffic = document.getElementById('chart-traffic');
const chartEachConsom =  document.getElementById('chart-each-consom');

const btnChartTraffic = document.querySelectorAll('.chart-top-left .container-chart-traffic .buttons button');

let contentChartTraffic;
let contentEachConsom;

let currentLevelChartTraffic = 'Tous';

fetchDataChartTraffic(currentLevelChartTraffic);

Array.from(btnChartTraffic).forEach((btn , index) => {  
  if(index==0)btn.style.backgroundColor = '#ff0000';
});

Array.from(btnChartTraffic).forEach((btn , index) => {  
  btn.addEventListener('click' , () => {
    Array.from(btnChartTraffic).forEach((btn) => {  
      btn.style.backgroundColor = 'transparent';
    });
    btn.style.backgroundColor = '#ff0000';
    currentLevelChartTraffic = level[index];
    fetchDataChartTraffic(currentLevelChartTraffic);
    console.log(currentLevelChartTraffic);
  })
})

function fetchDataChartTraffic(level){
  if(level == 'Tous') level = 'Generale';
  let jour = [];
  let dataJour = [];
  let siteConsom = [];
  let siteDataConsom = [];
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `./data/Dash/${level}/consommation.php`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let [tabChartTraffic] = JSON.parse(xhr.responseText);
        console.log(tabChartTraffic);
        jour = tabChartTraffic[1].labels;
        dataJour = tabChartTraffic[1].data;
        siteConsom = Object.keys(tabChartTraffic[2]);
        siteDataConsom = Object.values(tabChartTraffic[2]);
        if (!contentChartTraffic && !contentEachConsom) {
          contentChartTraffic = new Chart(chartTraffic, {
            type: 'line',
            data: {
              labels: jour,
              datasets: [{
                label:'Consommation total chaque jour en mo',
                backgroundColor:'#ff0000',
                borderColor:'#ff0000',
                data: dataJour,
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
        contentEachConsom = new Chart(chartEachConsom , {
          type: 'polarArea',
          data: {
            labels: siteConsom,
            datasets: [{
              data: siteDataConsom,
            }]
          } 
        });
      } else {
          contentChartTraffic.data.labels = jour;
          contentChartTraffic.data.datasets[0].data = dataJour;
          contentChartTraffic.update();
          
          contentEachConsom.data.labels = siteConsom;
          contentEachConsom.data.datasets[0].data = siteDataConsom;
          contentEachConsom.update();
        }
      } else {
        console.error('Erreur lors de la récupération des données:', xhr.status);
      }
    }
  };
  xhr.send();
}


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





//CHART FOR POPULAR SITE

const chartSitePop = document.getElementById('chart-sitePop');
const btnSitePop = document.querySelectorAll('.chart-bottom-center .container-chart-traffic-content .buttons button');
let sitePopChart;

let currentLevelSitePop = 'Tous';
Array.from(btnSitePop).forEach((btn , index) => {  
    if(index==0)btn.style.backgroundColor = '#ff0000';
});

fetchDataSitePop(currentLevelSitePop);

Array.from(btnSitePop).forEach((btn , index) => {  
  btn.addEventListener('click' , () => {
    Array.from(btnSitePop).forEach((btn) => {  
      btn.style.backgroundColor = 'transparent';
    });
    btn.style.backgroundColor = '#ff0000';
    currentLevelSitePop = level[index];
    fetchDataSitePop(currentLevelSitePop);
    console.log(currentLevelSitePop);
  })
})


function fetchDataSitePop(level){
  if(level == 'Tous') level = 'Generale';
  let dataSitePop = [];
  let labelSitePop = [];
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `./data/Dash/${level}/index${level}.php`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let tabSitePop = JSON.parse(xhr.responseText);
        console.log(tabSitePop);
        labelSitePop = Object.keys(tabSitePop);
        dataSitePop = Object.values(tabSitePop);
        if (!sitePopChart) {
          sitePopChart = new Chart(chartSitePop, {
            type: 'bar',
            data: {
              datasets: [{
                label: 'Nombre de visite du site',
                data: dataSitePop,
                backgroundColor: "#FFFFFF"
              }],
              labels: labelSitePop,
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                },
                x: [{
                  ticks: {
                      display: false // Masquer les étiquettes de l'axe x par défaut
                  }
                }]
              },
              borderRadius: 10,
              barPercentage: 0.7
            }
          });
        } else {
          sitePopChart.data.labels = labelSitePop;
          sitePopChart.data.datasets[0].data = dataSitePop;
          sitePopChart.update(); 
        }
      } else {
        console.error('Erreur lors de la récupération des données:', xhr.status);
      }
    }
  };
  xhr.send();
}



//CHART FOR CONTENT REPARTITION 
const chartTrafficContent = document.getElementById('chart-traffic-content');

const btnContentRep = document.querySelectorAll('.chart-top-right .container-chart-traffic-content .buttons button');

let contentRepartition;

let currentLevelcontentRep = 'Tous';

fetchDataContentRep(currentLevelSitePop);

Array.from(btnContentRep).forEach((btn , index) => {  
    if(index==0)btn.style.backgroundColor = '#ff0000';
});

Array.from(btnContentRep).forEach((btn , index) => {  
  btn.addEventListener('click' , () => {
    Array.from(btnContentRep).forEach((btn) => {  
      btn.style.backgroundColor = 'transparent';
    });
    btn.style.backgroundColor = '#ff0000';
    currentLevelcontentRep = level[index];
    fetchDataContentRep(currentLevelcontentRep);
    console.log(currentLevelcontentRep);
  })
})

function fetchDataContentRep(level){
  if(level == 'Tous') level = 'Generale';
  let typeContent = [];
  let dataTypeContent = [];
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `./data/Dash/${level}/repartition.php`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let tabContentRep = JSON.parse(xhr.responseText);
        typeContent = Object.keys(tabContentRep);
        dataTypeContent = Object.values(tabContentRep);
        console.log(tabContentRep);
        if (!contentRepartition) {
          contentRepartition = new Chart(chartTrafficContent, {
            type: 'doughnut',
            data: {
              datasets: [{
                label: '',
                data: dataTypeContent,
              }],
              labels:typeContent
            },
         
          });
          
        } else {
          contentRepartition.data.labels = typeContent;
          contentRepartition.data.datasets[0].data = dataTypeContent;
          contentRepartition.update(); 
        }
      } else {
        console.error('Erreur lors de la récupération des données:', xhr.status);
      }
    }
  };
  xhr.send();
}








