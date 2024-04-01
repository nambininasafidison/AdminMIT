authLog("SELECT * FROM authLog");


document.querySelector("#filter_authLog").addEventListener('input',async function(event){
    search = event.target.value;
    requete = "SELECT* FROM authLog WHERE concat(date , nom , ip , niveau , hostname , level , facility , message) LIKE '%"+search+"%' ORDER BY date DESC;";
    history(requete);
});

document.querySelector("#authLog_date").addEventListener('change',async function(event){
    search = event.target.value;
    requete = "SELECT* FROM authLog WHERE DATE(date) LIKE '"+search+"%' ORDER BY date DESC;";
    history(requete);
});

async function authLog(requetes){
    var reponse=await postData("php/authLog.php",requetes);
    var body=document.querySelector("#history");
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
    if(reponse == null){
        var link = "error.php?message='There is an error!!'";
        window.location.href=link;
    }
    if((typeof reponse['Error'] !== 'undefined')&&(reponse['Error'] !== null)){
        var link = "error.php?message="+reponse['Error'];
        window.location.href=link;
    }
    var i=0; //gestion div
    var k=0;
    for(let rep of reponse){
        var elt = document.createElement("div");
        if(i==0)elt.className="th tr th"+i;
        else elt.className="th th1 th"+i;
    
        var div1 = document.createElement("div");
        div1.className="contenu";
    
        var j=0;
        for(let inp of rep){
            var h1 = document.createElement("h1");
            h1.innerHTML=inp;
            if(j>0)h1.classList.add("value");
            div1.appendChild(h1);
            j++;
        }    
        elt.appendChild(div1);
        body.appendChild(elt);        
        if(i==0)i=3;
        else i=0;
        k++;
    }
}

//Les titres: date - nom - ip - niveau - hostname - level - facility - message - detailEtudiant