const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
 const message1 = document.querySelector('#meassageone');
const message2 = document.querySelector('#meassagetwo');

weatherForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const location = search.value;
    console.log(location);
    fetch('/weather?address=' +location).then((response)=> {     
    response.json().then((data) => {
        console.log(data)
        message1.textContent ='loading'
    if(data.error) {
        message1.textContent  = 'unable to find location'
}
else {
    message1.textContent  = data.forecastdata
    message2.textContent = data.location
}
})
})
})