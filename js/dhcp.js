const inputNetwork = document.querySelector('.containerInput .input #reseau');
const inputCidr = document.querySelector('.containerInput .input #cid');
const inputDns = document.querySelector('.containerInput .input #dns');

inputNetwork.addEventListener('input' , () => {
    const networkValue = inputNetwork.value;

    console.log(networkValue);
});


inputCidr.addEventListener('input' , () => {
    const cidrValue = inputCidr.value;
    console.log(cidrValue);
})


inputDns.addEventListener('input' , () => {
    const dnsValue = inputDns.value;
    console.log(dnsValue);
})





