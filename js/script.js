const btnPrevious = document.querySelector('.btn-previous');
const btnNext = document.querySelector('.btn-next');
const optionProxy = document.querySelector('#option-proxy');
const optionAcl = document.querySelector('#option-acl');
const bell = document.querySelector('.bell');
const containerNotif = document.querySelector('.container-notification');
const allNotif = document.querySelector('.all-notif');

/*
<div class="notif">
                <div class="notif-deco"></div>
                <div class="notif-content">
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <span>X</span>
            </div>

*/

bell.addEventListener('click' , () => {
    console.log(containerNotif.style.opacity);
    if(containerNotif.style.opacity == 0){
        containerNotif.style.opacity = 1;
        bell.style.backgroundColor = "#FF0000";
        bell.style.color = "#FFFFFF";
        fetch('../data/data_notif.txt')
        .then((response) => {
            response.text()
            .then((data) => {
                const tabNotif = data.split('\n').reverse();
                for(let line of tabNotif){
                    const notif = line.split('|');
                    console.log(notif);
                }
            })
        })
        .catch((err) => console.log("error fetching : " + err))
    }
    else{
        containerNotif.style.opacity = 0;
        bell.style.backgroundColor = "#FFFFFF";
        bell.style.color = "#1E1E1E";        
    }
})

optionProxy.addEventListener('click' , () => console.log("optionProxy"));

optionAcl.addEventListener('click' , () => console.log("optionAcl"));

btnPrevious.addEventListener('click' , () => {
    console.log('btn previous click !!');
})

btnNext.addEventListener('click' , () => {
    console.log('btn next click !!');
})


