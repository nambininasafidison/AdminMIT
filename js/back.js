var default_url="php/datas.php";
displayData(default_url,"");
history("SELECT* FROM history_acl ORDER BY date DESC;");

document.querySelector("#type").addEventListener('change',async function(){
    data = {"type": document.querySelector("#type").value};
    var reponse = await postData("php/change_type.php",data);
    displayData(default_url,"");
});

document.querySelector("#restore").addEventListener('click',async function(event){
    var conf= confirmer("Voulez-vous vraiment restaurer les modifications faites?");
    if(conf){
        displayData("php/restore.php","");
        history("SELECT* FROM history_acl ORDER BY date DESC;");
    }
});

document.querySelector("#filter_History").addEventListener('input',async function(event){
    search = event.target.value;
    requete = "SELECT* FROM history_acl WHERE action LIKE '%"+search+"%' ORDER BY date DESC;";
    history(requete);
});

document.querySelector("#history_date").addEventListener('change',async function(event){
    search = event.target.value;
    requete = "SELECT* FROM history_acl WHERE DATE(date) LIKE '"+search+"%' ORDER BY date DESC;";
    history(requete);
});

document.querySelector("#add_acl").addEventListener('click',function(){
    var conf = confirmer("Voulez-vous vraiment ajouter ce regle?");
    if(conf){
        var data={};

        var div = document.querySelector(".add-directive .containeradd .dir .s1 input");

        data[div.name]=div.value;
        
        div = document.querySelectorAll("#add-content input");
        for(let i of div){
            data[i.name]=i.value;
        }

        div = document.querySelectorAll("#add-content select");
        if(div.length>0){
            for(let i of div){
                data[i.name]=i.value;
            }
        }
        displayData("php/ajout.php",data);
    }
});

async function displayData(url,donnee){
    var reponse = await postData(url,donnee);
    if(reponse == null){
        var link = "error.php?message='There is an error!!'";
        window.location.href=link;
    }
    if((typeof reponse['Error'] !== 'undefined')&&(reponse['Error'] !== null)){
        var link = "error.php?message="+reponse['Error'];
        window.location.href=link;
    }

    var body=document.querySelector("#directive");    
    var titre=document.querySelector("#title");
    var i=0;
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
    while (titre.firstChild) {
        titre.removeChild(titre.firstChild);
    }    
    if (reponse[0].length==3){
        var h1 = document.createElement("h1");
        h1.innerHTML="Nom";
        titre.appendChild(h1);    

        var h2 = document.createElement("h1");
        h2.innerHTML="Source";
        titre.appendChild(h2);            
        
        var h3 = document.createElement("h1");
        h3.innerHTML="Destination";
        titre.appendChild(h3);            
    }

    else{
        var h1 = document.createElement("h1");
        h1.innerHTML="Nom";
        titre.appendChild(h1);    

        var h2 = document.createElement("h1");
        h2.innerHTML="Valeur";
        h2.classList.add("value");
        titre.appendChild(h2);    
    }
    for(let rep of reponse){
        var elt = document.createElement("div");
        elt.className="th tr";

        var div1 = document.createElement("div");
        div1.className="mac-and-ip";

        var j=0;
        for(let inp of rep){
            var h1 = document.createElement("h1");
            h1.innerHTML=inp;
            if(j>0)h1.classList.add("value");
            div1.appendChild(h1);
            j++;
        }

        var div2 = document.createElement("div");
        div2.className="actions";

        div2.innerHTML="<div class=\"logo-actions\"><div><button onclick='activeModify(this,"+i+")'><i class=\"fa fa-edit\"></i></button></div><div><button onClick='delet(this,"+i+")'><i class=\"fa fa-trash\"></i></button></div></div>";
    
        elt.appendChild(div1);
        elt.appendChild(div2);
        body.appendChild(elt);
    
        i++;
    }
}

async function delet(elt,i){
    var conf = confirmer("Voulez-vous vraiment supprimer ce regle?");
    if(conf){
        var data = {"lineD":i};
        displayData("php/delete.php",data);
        history("SELECT* FROM history_acl ORDER BY date DESC;");
    }
}

function activeModify(elt,i){
    var val = Array.from(elt.parentNode.parentNode.parentNode.previousSibling.children);

    for(let value of val){
        if(value.classList.contains('value')){
            let list = value;
            list.contentEditable=true;
        }
    }
    elt.parentNode.parentNode.parentNode.innerHTML="<div class=\"logo-actions\"><div><button onclick='modify(this,"+i+")'><i class=\"fa fa-save\"></i></button></div><div><button onClick='delet(this,"+i+")'><i class=\"fa fa-trash\"></i></button></div></div>";
}

function modify(elt,position){
    var conf = confirmer("Voulez-vous vraiment modifier ce regle?");
    if(conf){    
        var line = elt.parentNode.parentNode.parentNode.previousSibling;
        var cell = Array.from(line.children);
        var tmp=[];
        for(let i=0;i<cell.length;i++){
            let str=(cell[i].innerHTML).split("<");
            tmp.push(str[0]);
        }

        var data;

        if(cell.length==3){
            data={
                "lineM" : position,
                "name" : tmp[0],
                "valueSrc" : tmp[1],
                "valueDst" : tmp[2]
            }        
        }
        else if(cell.length==2){
            data={
                "lineM" : position,
                "name" : tmp[0],
                "value" : tmp[1]
            }        
        }    
        var reponse = displayData("php/modify.php",data);
        history("SELECT* FROM history_acl ORDER BY date DESC;");
    }
}

async function postData(url="", donnee={}) {
    var data = null;
    try {
        const reponse = await fetch(
            url,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                body: JSON.stringify(donnee),
            }
        );
        if (!reponse.ok) {
            throw new Error(`HTTP error! status: ${reponse.status}`);
        }

        data = await reponse.json();
    } catch (error) {
        console.error("Error:", error);
    }
    return data;
}

async function history(requetes){
    var reponse=await postData("php/history.php",requetes);
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
    var i=0;
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
    }
}

function confirmer(mess){
    var conf = confirm(mess);
    // var btnOui = document.querySelector('.confirmOK');
    // var btnNon = document.querySelector('.confirmCancel');
    // btnOui.textContent="Oui";
    // btnNon.textContent="Non";
    return conf;
}
