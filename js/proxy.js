<<<<<<< HEAD
const port = document.querySelector('.port #port');
const maxCache = document.querySelector('.input #max');
const minCache = document.querySelector('.input #min');
const timeMaxCache = document.querySelector('.input #cachemin');
const journalFormat = document.querySelector('.input #sensR');
const hostname = document.querySelector('.input #host');

=======
const port = document.querySelector(".port #port");
const maxCache = document.querySelector(".input #max");
const minCache = document.querySelector(".input #min");
const timeMaxCache = document.querySelector(".input #cachemin");
const journalFormat = document.querySelector(".input #sensR");
const hostname = document.querySelector(".input #host");
>>>>>>> faad2f3bc5d22f03b7fbe3732a9b4fd04062dd17

const selectElement = document.getElementById("sensL");
const optionsContainer = document.querySelector(".option");

<<<<<<< HEAD


=======
>>>>>>> faad2f3bc5d22f03b7fbe3732a9b4fd04062dd17
function updateOptions(selectedValue) {
  let htmlContent = "";

  if (selectedValue == "1") {
    htmlContent = `
      <div class="input">
        <label for="swapDir">Swap directory</label>
        <input type="text" id="swapDir" name="rep" placeholder="/var/spool/squid">
      </div>
      <div class="input">
        <label for="swapSize">Taille du swap directory</label>
        <input type="number" id="swapSize" name="stck" placeholder="9999 MB" min="0">
      </div>
      <div class="input">
        <label for="subDirCount">Nombre de sous-répertoire</label>
        <input type="number" id="subDirCount" name="srep" placeholder="16" min="0">
      </div>
      <div class="input">
        <label for="fileCount">Nombre de fichier</label>
        <input type="number" id="fileCount" name="file" placeholder="256" min="0">
      </div>`;
<<<<<<< HEAD
  
      optionsContainer.innerHTML = htmlContent;
    } else {
=======

    optionsContainer.innerHTML = htmlContent;
  } else {
>>>>>>> faad2f3bc5d22f03b7fbe3732a9b4fd04062dd17
    htmlContent = `
      <div class="input">
        <label for="memorySize">Taille du mémoire:</label>
        <input type="number" id="memorySize" name="stck" placeholder="9999 MB" min="0">
      </div>`;
<<<<<<< HEAD
      optionsContainer.innerHTML = htmlContent;
    
    }
  
=======
    optionsContainer.innerHTML = htmlContent;
  }

>>>>>>> faad2f3bc5d22f03b7fbe3732a9b4fd04062dd17
  optionsContainer.style.display = "block";
}

selectElement.addEventListener("change", () => {
  updateOptions(selectElement.value);
});

let response;
let check = [];
let xhr = new XMLHttpRequest();
xhr.open('GET', '../php/default.php');
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onload = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    response = JSON.parse(xhr.responseText);

    // console.log(response + "ICI");

    if (response !== null) {
      const resultsDiv = document.getElementById("results");

      response.forEach((result) => {
        const p = document.createElement("p");
        p.textContent = result;
        resultsDiv.appendChild(p);
      });
    }
  } else {
    response = xhr.responseText;
  }
};
xhr.send();
