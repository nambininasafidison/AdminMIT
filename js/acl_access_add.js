function signal_access_add()
{
    let bouton_add = document.getElementById('access_confirm_add');
    let checked=[];
    let response;
    let exist = false;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', './php/acl_access_get_all_declaration.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        if(xhr.readyState === 4  && xhr.status === 200){
            response = JSON.parse(xhr.responseText);

            bouton_add.addEventListener('click', () => {
                let auto = (document.getElementsByName('access_radio').checked)?"deny":"allow";
    
                for(let i of response)
                {
                    let check_box =  document.getElementById(i).checked;
                    if(check_box)
                    {
                        exist = true;
                        checked.push(i);
                    }
                }
    
                if(exist)
                {
                    let json = {
                        name: checked,
                        autorisation: auto
                    };
        
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', './php/acl_access_add_name.php', true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.onload = function(){
                        if(xhr.status === 200){
                            console.log(xhr.responseText);
                        }
                    };      
                    xhr.send(JSON.stringify(json));

                    get_and_print_data_status();
                    get_and_print_data_status();
                    get_and_print_data_access();
                    get_and_print_data_access();
                }
            });

        }
        else{
            let error = xhr.responseText;
        }
    };
    xhr.send();
}

function get_add_print_all_declaration()
{
    let response;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './php/acl_access_get_all_declaration.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        if(xhr.readyState === 4  && xhr.status === 200){
            response = JSON.parse(xhr.responseText);

            let button_add = document.getElementById('access_add'); // Pour le bouton d'ajout d'access
            button_add.addEventListener('click', () => {
                //console.log(response);

                let space = document.getElementById('access_choise_declaration');
                for(let i of response)
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
                    

                    one_div.appendChild(check_box);
                    one_div.appendChild(texte);

                    space.appendChild(one_div);
                }


            });
        }
        else{
            let error = xhr.responseText;
            console.log('Erreur: '+error);
        }
    };
    xhr.send();
}

get_add_print_all_declaration();
signal_access_add();
