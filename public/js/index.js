console.log('client side file is laoded and it is up and running')


const weatherForm = document.querySelector('form')
const inputForm = document.querySelector('input')
const errorMessage = document.querySelector('#message-i')
const weatherMessage = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = inputForm.value;
    errorMessage.textContent = 'loading....'
    weatherMessage.textContent = ''
    fetch('http://localhost:8000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;
            } else {
                weatherMessage.textContent = 'Location: ' + data.location ;
                errorMessage.textContent = 'Forcast: ' + data.forecast;
            }

        })
    })
})