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



const level = ['Tous' , 'L1' , 'L2' , 'L3' , 'M1' , 'M2'];


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
        labelSitePop = Array.keys(tabSitePop);
        dataSitePop = Array.values(tabSitePop);
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
                }
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








