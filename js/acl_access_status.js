
// Pour avoir les données et affichier le tableau
function get_and_print_data_access()
{
    let response;
    let check = [];
    let xhr = new XMLHttpRequest();     // Un requête pour avoir les données
    xhr.open('GET', './php/acl_access_get_active.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        if(xhr.readyState === 4  && xhr.status === 200){
            response = JSON.parse(xhr.responseText);

            // console.log(response+'erreur');

            if(response !== null)
            {
                for(let i=0;i<response[0].length;i++) check[i]=true;
                print_tableau(response, check);     // Pour afficher le tableau
            }
        }
        else{
            response = xhr.responseText;
        }
    };
    xhr.send();
}

// Pour afficher le tableau
function print_tableau(response, check)
{
    let tableau = document.getElementById('access_tableau');
    tableau.innerHTML = '';
    let access = response[0];
    let name = response[1];

    // console.log(check);
    // console.log(response);

    for(let i=0;i<access.length;i++){
        if(check[i])
        {
            let tr = document.createElement('div');
            tr.classList.add('th');
            tr.classList.add('tr');

            let td1 = document.createElement('div');
            td1.classList.add('mac-and-ip');
            let titre = document.createElement('h1');
                titre.innerHTML = name[i];
            let button_autorise  = document.createElement('button');
            button_autorise.classList.add('access');
                button_autorise.innerHTML = (access[i]==="deny")?"Réfuser":"Autoriser";
            button_autorise.addEventListener('click', () => {       // Pour le bouton changement des données 
                (access[i]==="deny")?access[i]="allow":access[i]="deny";
                response[0]=access;
                response[1]=name;
                print_tableau(response, check);

/*                let json = {
                    name1: name,
                    access1: access,
                    indice1: i
                };
            
                var xhr = new XMLHttpRequest();
                
                xhr.open('POST', './php/acl_access_changed.php', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function(){
                    if(xhr.status === 200){
                        console.log(xhr.responseText);
                    }
                };
                
                xhr.send(JSON.stringify(json));     */
            });

            td1.appendChild(titre);
            td1.appendChild(button_autorise);

            tr.appendChild(td1);

            let td2 = document.createElement('div');
            td2.classList.add('actions');
            let td21 = document.createElement('div');
            td21.classList.add('logo-actions');
            let td211 = document.createElement('div');

            let modify1 = document.createElement('button');
            modify1.classList.add('access-modif-btn');
            modify1.addEventListener('click', () => {
                modAccess.style.display = "flex";
                // console.log(name);

                let all_access;
                let xhr = new XMLHttpRequest();
                xhr.open('GET', './php/acl_access_get_all_declaration.php');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function(){
                    if(xhr.readyState === 4  && xhr.status === 200){
                        all_access = JSON.parse(xhr.responseText);

                        let space = document.getElementById('access_choise_declaration_modif');
                        // console.log(space);
                        if(space.innerHTML === '')
                        {
                            for(let i of all_access)
                            {
                                let one_div = document.createElement('div');
                                one_div.classList.add('checks');
                                let check_box = document.createElement('input');
                                let texte = document.createElement('label');
                                
                                check_box.type = 'checkbox';
                                check_box.name = i;
                                check_box.id = i;
                                check_box.value = i;
                                texte.innerHTML = i;
                                texte.for = i;
                                if(name.includes(i))
                                    check_box.checked = true;
                                

                                one_div.appendChild(check_box);
                                one_div.appendChild(texte);

                                space.appendChild(one_div);
                            }
                        }
                    }
                    else{
                        let error = xhr.responseText;
                        console.log('Erreur: '+error);
                    }
                };
                xhr.send();

            let btns1 = document.getElementById('btns1');
            let button_cancel = document.createElement('button');
            button_cancel.classList.add('cancel');
            button_cancel.innerHTML = 'Annuler';
            button_cancel.addEventListener('click', () => {
                modAccess.style.display = "none";
            });
            let button_confirm_modif = document.createElement('button');
            button_confirm_modif.classList.add('ok');
            button_confirm_modif.innerHTML = 'Modifier';

            btns1.innerHTML = '';
            btns1.appendChild(button_cancel);
            btns1.appendChild(button_confirm_modif);
            // let button_modify = document.getElementById(name);
            let exist = false;
            let checked = [];

            let xhr1 = new XMLHttpRequest();
            xhr1.open('GET', './php/acl_access_get_all_declaration.php');
            xhr1.setRequestHeader('Content-Type', 'application/json');
            xhr1.onload = function(){
                if(xhr1.readyState === 4  && xhr1.status === 200){
                    let mod = JSON.parse(xhr1.responseText);

                    button_confirm_modif.addEventListener('click', () => {
                        modAccess.style.display = "none";
                        for(let j of mod)
                        {
                            let check_box =  document.getElementById(j).checked;
                            if(check_box)
                            {
                                exist = true;
                                checked.push(j);
                            }
                        }
            
                        if(exist)
                        {
                            let json = {
                                name: checked,
                                indice: i
                            };
                
                            let xhr2 = new XMLHttpRequest();
                            xhr2.open('POST', './php/acl_access_modif_name.php', true);
                            xhr2.setRequestHeader('Content-Type', 'application/json');
                            xhr2.onload = function(){
                                if(xhr2.status === 200){
                                    // console.log(xhr2.responseText);
                                }
                            };      
                            xhr2.send(JSON.stringify(json));

                            get_and_print_data_status();
                            get_and_print_data_status();
                            get_and_print_data_access();
                            get_and_print_data_access();
                        }
                    });
                }
                else{
                    let error = xhr1.responseText;
                }
            };
            xhr1.send();

            });

            let modify = document.createElement('i');
            modify.classList.add('fa');
            modify.classList.add('fa-edit');
            modify1.appendChild(modify);

            let td212 = document.createElement('div');
            let del1 = document.createElement('div');
            let del = document.createElement('i');
            del.classList.add('fa');
            del.classList.add('fa-trash');
            del.addEventListener('click', () => {       // Pour le bouton effacer
                check[i]=false;
                print_tableau(response, check);
            });
            del1.appendChild(del);
            td211.appendChild(modify1);
            td212.appendChild(del1);
            td21.appendChild(td211);
            td21.appendChild(td212);
            td2.appendChild(td21);

            tr.appendChild(td2);
            tableau.appendChild(tr);
        }
    }

// Pour le sauvegarde
    let bouton_save = document.getElementById('access_save');
    bouton_save.addEventListener('click', () => {
        let json = {
            name1: name,
            access1: access,
            check1: check
        };
    
        var xhr = new XMLHttpRequest();
        xhr.open('POST', './php/acl_access_save.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function(){
            if(xhr.status === 200){
                // console.log(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(json));

        get_and_print_data_access();
        get_and_print_data_access();
        get_and_print_data_status();
        get_and_print_data_status();
    });

// Pour le bouton de resauration
    let bouton_restore = document.getElementById('access_restore');
    bouton_restore.addEventListener('click', () => {
        get_and_print_data_access();
    });
}

get_and_print_data_access();


        /************************************
         *          Pour le status          *
         ************************************/

// Pour avoir et afficher le status
function get_and_print_data_status()
{
    let response;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './php/acl_access_get_name.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        if(xhr.readyState === 4  && xhr.status === 200){
            response = JSON.parse(xhr.responseText);

            //console.log(response);

            // if(tableau[0] !== null)
                print_tableau_status_active(response[0]);       // Affichage des status activées
            // if(tableau[1] !== null)
                print_tableau_status_disable(response[1]);      // Affichage des status désactivées
        }
        else{
            response = xhr.responseText;
        }
    };
    xhr.send();
}

// Pour afficher les status activées
function print_tableau_status_active(tableau)
{
    let tr = document.getElementById('status_tableau');
    tr.innerHTML = '';

    let th = document.createElement('div');
    th.classList.add('th');
    let titre  = document.createElement('h1');
    titre.innerHTML = 'Noms';
    let state = document.createElement('h1');
    state.innerHTML = 'Status';
    th.appendChild(titre);
    th.appendChild(state);
    tr.appendChild(th);

    if(tableau[1] !== null && tableau[0] !== null)
    {
        let name = tableau[1];
        let access = tableau[0];

        for(let i=0;i<name.length;i++)
        {
            let data = document.createElement('div');
            data.classList.add('data');
            let nom  = document.createElement('p');
                nom.innerHTML = name[i];
            let status = document.createElement('button');
            status.innerHTML = 'Activer';
            status.addEventListener('click', () => {    // Désactivation des states
                let json = {
                    name1: name,
                    access1: access,
                    indice1: i
                };

                let xhr = new XMLHttpRequest();
                xhr.open('POST', './php/acl_access_disable_name.php', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function(){
                    if(xhr.status === 200){
                        // console.log(xhr.responseText);
                    }
                };      
                xhr.send(JSON.stringify(json));

                get_and_print_data_status();
                get_and_print_data_status();
                get_and_print_data_access();
                get_and_print_data_access();
            });
            data.appendChild(nom);
            data.appendChild(status);
            tr.appendChild(data);
        }
    }
}
    
// Pour afficher les status désactivées
function print_tableau_status_disable(tableau)
{
    let tr = document.getElementById('status_tableau');
    let name = tableau[1];
    let access = tableau[0];

    for(let i=0;i<name.length;i++)
    {
        let data = document.createElement('div');
        data.classList.add('data');
        let nom  = document.createElement('p');
            nom.innerHTML = name[i];
        let status = document.createElement('button');
        status.innerHTML = 'Désactiver';
        status.addEventListener('click', () => {        // Activation des states
            let json = {
                name1: name,
                access1: access,
                indice1: i
            };
        
            var xhr = new XMLHttpRequest();            
            xhr.open('POST', './php/acl_access_active_name.php', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function(){
                if(xhr.status === 200){
                    // console.log(xhr.responseText);
                }
            };
            xhr.send(JSON.stringify(json));

            get_and_print_data_status();
            get_and_print_data_status();
            get_and_print_data_access();
            get_and_print_data_access();
        });
        data.appendChild(nom);
        data.appendChild(status);
        tr.appendChild(data);
    }
}

get_and_print_data_status();