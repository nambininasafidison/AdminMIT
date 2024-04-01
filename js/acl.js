const directiveBtn = document.querySelector(".directive-add-btn");
const addDirective = document.querySelector(".add-directive");
const accessBtn = document.querySelector(".access-add-btn");
const addAccess = document.querySelector(".add-access");
const cancel = document.querySelectorAll(".cancel");
const ok = document.querySelectorAll(".ok");

directiveBtn.addEventListener("click", async () => {
  var type = await postData("php/give_type.php","");

  document.querySelector(".add-directive .containeradd .dir .section .title").innerHTML=type;

  var body=document.querySelector(".add-directive .containeradd .dir .s2");
  while (body.firstChild) {
      body.removeChild(body.firstChild);
  }

  if(type=="HTTP_Method"){
    var select= document.createElement("select");
    select.name="i0";
    select.innerHTML = "<option>POST</option><option>GET</option>";
    document.querySelector("#add-content").appendChild(select);
  }

  if((type == "Ip")||(type=="Domain_name")||type=="Port"){
    var select= document.createElement("select");
    select.name="sOd";
    select.innerHTML = "<option value='src'>Source</option><option value='dst'>Destination</option>";
    document.querySelector("#add-content").appendChild(select);
  }

  if(type=="Ip"){
    var select = document.createElement("select");
    select.name="tp";
    select.setAttribute("onChange","ipSelect(this)");
    select.setAttribute("id","type-selection-ip");
    select.innerHTML="<option value=1>Indivudual</option><option value=2>In Group</option><option value=3>Network</option>";
    document.querySelector("#add-content").appendChild(select);
    //Listener
  }

  if(type=="Time"){
    document.querySelector("#add-content").innerHTML="From";
    var jours= await postData("php/give_days.php","");
    var select = document.createElement("select");
    select.name="D";
    select.setAttribute("id","select-days-time");

    for(let cle in jours){
      var option = document.createElement("option");
      option.value=cle;
      option.innerHTML=jours[cle];
      select.appendChild(option); //+listen
    }

    document.querySelector("#add-content").appendChild(select);

    var button= document.createElement("button");
    button.className="plus";
    button.type="button";
    button.style.display="inline";
    button.setAttribute("id","addSelect");
    button.innerHTML="To";

    document.querySelector("#add-content").appendChild(button);
    
    var p = document.createElement("p");
    var reg = regex(type);
    var key=Object.keys(reg);

    p.innerHTML="At <input "+key[0]+"="+reg[key[0]]+" name=\"H\"/><button type='button'class='plus' style='display:block;' onClick='addInput(this,2)'>To</button>";

    document.querySelector("#add-content").appendChild(p);

    listen_day(jours);
  }

  if((type!=="Time")&&((type!=="HTTP_Method"))){    
    if(type!="Ip"){
      var content=document.querySelector("#add-content");
      var reg = regex(type);
      var key=Object.keys(reg);
      console.log(key[0]+"="+reg[key[0]]);
      content.innerHTML+="<br><p>"+type+"<input "+key[0]+"="+reg[key[0]]+" name=\"i0\" required/></p>";
    }
    if(type!="Snmp_community"){
      document.querySelector(".add-directive .containeradd .dir .plus").style.display="block";
    }
    else if ((type==="HTTP_Method")||(type==="Snmp_community")) {
      document.querySelector(".add-directive .containeradd .dir .plus").style.display="none";
    }
  }

  addDirective.style.display = "flex";
});

accessBtn.addEventListener("click", () => {
  addAccess.style.display = "flex";
});


function ipSelect(elt){
  var value=elt.value;
  var reg = regex("Ip");
  var key=Object.keys(reg);
  var div=document.getElementById("add-content");
  var inp = document.querySelectorAll("#add-content > :not(select)");
  for (let i of inp) {
      div.removeChild(i);
  }
  if((value==1)||(value==3)){
    var inp=document.createElement("input");
    inp.setAttribute("name","i0");  
    inp.setAttribute(key,reg[key[0]]);
    div.appendChild(inp);
  }
  if(value==2){
    var inp=document.createElement("div");
    inp.innerHTML="From <input "+key[0]+"="+reg[key[0]]+" name=\"ia0\"/> to <input "+key[0]+"="+reg[key[0]]+" name=\"ib0\"/>";
    div.appendChild(inp);
  }
  var d=document.querySelector(".add-directive .containeradd .dir .plus");
  d.removeAttribute("onclick");
  d.setAttribute("onclick","addInput(this,"+value+")");
}

function addInput2(elt) {
  var reg = regex("Ip");
  var key=Object.keys(reg);
  var form = document.querySelector('#add-content'); // Récupérer le formulaire parent
  var nInp = document.createElement('p');
  var dernierInput = form.querySelectorAll('input');
  var name=dernierInput[dernierInput.length -1].name + "1";
  nInp.innerHTML="From <input "+key[0]+"="+reg[key[0]]+" name='"+name+"'/> to <input "+key[0]+"="+reg[key[0]]+" name='"+name+"1'/>";
  form.appendChild(nInp);
}

async function addInput(elt,mode) {
  var type = await postData("php/give_type.php","");
  var reg = regex(type);
  var key=Object.keys(reg);
  var type = await postData("php/give_type.php","");
  if((type == "Ip")&&(mode == 2)){
    addInput2(elt);
  }
  else{
    var form = document.querySelector('#add-content');
    var newInput = document.createElement('input');

      var dernierInput = form.querySelectorAll('input');
      newInput.setAttribute(key[0],reg[key[0]]);
      var a=dernierInput[dernierInput.length -1];
      newInput.name = a.name + '1';
    
//mode == 2 (in-dray hatao ihany) 
    if(mode==2){
        var i=0;
        var allInput=form.querySelectorAll("input");
        for(let inp of allInput){
            if(inp.name=="H1"){
                i=1;
            }
        }
        if(i==0){
            newInput.name = form.querySelector("input[type=text]").name + '1';
            elt.parentNode.appendChild(newInput);
        }
    }
//Averina foana    
    else form.appendChild(newInput);
  }
}

function listen_day(jours){
  document.getElementById("addSelect").addEventListener('click',function(){
    var i=0;
    var form=document.getElementById('add-content');
    var allInput=form.querySelectorAll("select");

    for(let inp of allInput){
        if(inp.name=="toD"){
            i=1;
        }
    }
    if(i==0){
        var select= document.createElement('select');
        select.name='toD';
        for(let cle in jours){
          var option = document.createElement("option");
          option.value=cle;
          option.innerHTML=jours[cle];
          select.appendChild(option); //+listen
        }
        document.querySelector("#add-content").insertBefore(select,this.nextSibling);
    }
});
}

/*ilay misy pattern*/
function regex(type){
  var att={};
  if((type=="Port")||(type=="HTTP_Status")||(type=="Max_user_ip")||(type=="Max_connection")){
    att["type"]="number";    
  }
  if(type=="URL"){
    att["type"]="url";
  }
  if(type=="Time"){
    var reg = "([01][0-9]|2[0-3]):[0-5][0-9]";
    att["pattern"]=reg;
  }
  if(type=="Ip"){
    var reg = "^([0-9]{3}.){2}([0-9])$";
    att["pattern"]=reg;
  }
  if(type=="Mac"){
    var reg="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$";
    att["pattern"]=reg;
  }
  if((type=="Domain_name")||(type=="Server_name")){
    var reg="([0-9A-Fa-f][.])+|localhost";
    att["pattern"]=reg;
  }
  if(type=="File"){
    att["placeholder"]="\\.exe";
  }
  if(type=="Protocol"){
    att["placeholder"]="HTTP FTP";
  }
  if(type=="Header_name"){
    att["placeholder"]="User-Agent Mozilla/5.0 ";
  }
  return att;
}

Array.from(cancel).map((item) => {
  item.addEventListener("click", () => {
    addAccess.style.display = "none";
    addDirective.style.display = "none";
  });
});

Array.from(ok).map((item) => {
    item.addEventListener("click", () => {
  addAccess.style.display = "none";
  addDirective.style.display = "none";
});
});
