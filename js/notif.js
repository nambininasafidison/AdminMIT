const bell = document.querySelector(".bell");
const notifNbr = document.querySelector(".bell span");
const containerNotif = document.querySelector(".container-notification");
const allNotif = document.querySelector(".all-notif");
let tabNotifAll = [];

let totalNotif = 3;
notifNbr.textContent = `${totalNotif}`;

bell.addEventListener("click", () => {
  if (containerNotif.style.display == "none") {
    containerNotif.style.display = "block";
    bell.style.backgroundColor = "#000";
    bell.style.color = "#fff";
  } else {
    containerNotif.style.display = "none";
    bell.style.backgroundColor = "#fff";
    bell.style.color = "#1E1E1E";
  }
});

//get notif presence
getDataNotifPresence();

//get Notif count if it exist
getDataNotifAccount();

setInterval(() => {
  allNotif.innerHTML = "";
  getDataNotifPresence();
  getDataNotifAccount();
}, 36000);

function getDataNotifPresence() {
  ajaxGetData("GET", "./data/backend_test/presence.php", (tabPresence) => {
    displayNotifPresence(tabPresence[0]);
  });
}

function getDataNotifAccount() {
  ajaxGetData("GET", "./data/backend_test/account.php", (tabAccount) => {
    if (tabAccount) {
      for (let account of tabAccount) {
        displayNotifAccount(account);
      }
    }
  });
}

function displayNotifAccount(account) {
  const notifText = `${account.name} ${account.firstName} ${
    account.level
  } veut créer un compte ${
    account.type == "ADMIN"
      ? "en tant qu'ADMINISTRATEUR"
      : "en tant que DELEGUE"
  }`;
  createNotif(notifText, account.date);
}

function displayNotifPresence(presence) {
  const notifTextPresence =
    presence.presence.count != 0
      ? `Il y avait ${presence.presence.count} ${
          presence.presence.count == 1
            ? "étudiant absent hier."
            : "étudiants absents hier."
        }`
      : `Tous les étudiants étaient présents hier.`;
  const notifTextPcNonPris =
    presence.pc_non_pris.count != 0
      ? `Il y avait ${presence.pc_non_pris.count} ${
          presence.pc_non_pris.count == 1
            ? "pc non pris hier."
            : "pc non prises hier."
        }`
      : `Tous les pc étaient pris hier.`;
  const notifTextPcNonRemis =
    presence.pc_non_remis.count != 0
      ? `Il y avait ${presence.pc_non_remis.count} ${
          presence.pc_non_remis.count == 1
            ? "pc non remis hier."
            : "pc non remis hier."
        }`
      : `Tous les pc étaient remis hier.`;

  createNotif(notifTextPresence, "");
  createNotif(notifTextPcNonPris, "");
  createNotif(notifTextPcNonRemis, "");
}

function createNotif(text, date) {
  const notifElement = document.createElement("div");
  notifElement.classList.add("notif");

  const notifDeco = document.createElement("div");
  notifDeco.classList.add("notif-deco");

  const notifContent = document.createElement("div");
  notifContent.classList.add("notif-content");
  notifContent.textContent = text;

  const notifDate = document.createElement("p");
  notifDate.classList.add("date");
  notifDate.textContent = date;

  notifElement.append(notifDeco);
  notifElement.append(notifContent);
  notifElement.append(notifDate);

  allNotif.append(notifElement);
}

function ajaxGetData(requestType, backFileToRequest, getResponse) {
  let xhr = new XMLHttpRequest();
  xhr.open(requestType, backFileToRequest, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        getResponse(JSON.parse(xhr.responseText));
      } else {
        console.error(
          "Erreur lors de la récupération des données:",
          xhr.status
        );
      }
    }
  };
  xhr.send();
}
