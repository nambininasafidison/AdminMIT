authLog("-");

document
  .querySelector("#f_authlog")
  .addEventListener("input", async function (event) {
    var search = {};
    search["input"] = event.target.value;
    authLog(search);
  });

document
  .querySelector("#authlog_d")
  .addEventListener("change", async function (event) {
    var search = {};
    search["date"] = event.target.value;
    //    alert(search["date"]);
    authLog(search);
  });

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

async function authLog(requetes) {
  var reponse = await postData("php/authLog.php", requetes);
  var body = document.querySelector("#authlog");
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  // console.log(reponse);
  // if(reponse == null){
  //     var link = "error.php?message='There is an error!!'";
  //     window.location.href=link;
  // }
  // if((typeof reponse['Error'] !== 'undefined')&&(reponse['Error'] !== null)){
  //     var link = "error.php?message="+reponse['Error'];
  //     window.location.href=link;
  // }
  var b1 = document.createElement("div");
  b1.className = "th th1 th3";

  var b = document.createElement("div");
  b.className = "contenu";

  var h1 = document.createElement("h1");
  h1.innerHTML = "Date";
  b.appendChild(h1);

  var h2 = document.createElement("h1");
  h2.innerHTML = "Ip";
  b.appendChild(h2);

  var h3 = document.createElement("h1");
  h3.innerHTML = "Session";
  b.appendChild(h3);

  var h3 = document.createElement("h1");
  h3.innerHTML = "User";
  b.appendChild(h3);

  var h3 = document.createElement("h1");
  h3.innerHTML = "By";
  b.appendChild(h3);

  var h3 = document.createElement("h1");
  h3.innerHTML = "Status";
  b.appendChild(h3);

  var h3 = document.createElement("h1");
  h3.innerHTML = "Etudiant";
  b.appendChild(h3);

  b1.appendChild(b);
  body.appendChild(b1);

  //Contenu tableau
  var i = 0;
  for (let rep of reponse) {
    if (i == reponse.length - 1) break;
    var elt = document.createElement("div");
    if (rep[2] == "closed") elt.className = "th th1 th3";
    else elt.className = "th tr th0";

    var div1 = document.createElement("div");
    div1.className = "contenu";

    var j = 0;
    for (let inp of rep) {
      var h1 = document.createElement("h1");
      h1.innerHTML = inp;
      div1.appendChild(h1);
      j++;
      test = 1;
    }

    var a = document.createElement("a");
    a.href = "../modify/database.php?ip=" + rep[1];
    a.innerHTML = "Qui?";
    div1.appendChild(a);

    elt.appendChild(div1);
    body.appendChild(elt);
    i++;
  }

  //Affiche la stat rapide

  var div = document.getElementById("first_session");

  if (reponse[reponse.length - 1][0]["First session opened"] == null) {
    div.innerHTML = "- - First session opened: Undefined.";
  } else
    div.innerHTML =
      "- - First session opened: At " +
      reponse[reponse.length - 1][0]["First session opened"][0] +
      ", by " +
      reponse[reponse.length - 1][0]["First session opened"][1] +
      ", on user " +
      reponse[reponse.length - 1][0]["First session opened"][2] +
      ".";
  if (reponse[reponse.length - 1][1]["Last session closed"] == null) {
    div.innerHTML = "- - Last session closed: Undefined.";
  } else div = document.getElementById("last_session");
  div.innerHTML =
    "- - First session closed: At " +
    reponse[reponse.length - 1][1]["Last session closed"][0] +
    ", by " +
    reponse[reponse.length - 1][1]["Last session closed"][1] +
    ", on user " +
    reponse[reponse.length - 1][1]["Last session closed"][2] +
    ".";
}

//Les titres: date - nom - ip - niveau - hostname - level - facility - message - detailEtudiant
