
const weatherForm = document.querySelector('form')
const inputForm = document.querySelector('input')
const errorMessage = document.querySelector('#message-i')
const weatherMessage = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = inputForm.value;
    errorMessage.textContent = 'loading....'
    weatherMessage.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;
            } else {
                weatherMessage.textContent = 'Location: ' + data.location ;
                errorMessage.textContent = 'Forcast: ' + data.forecast + ' The highest temperature will be '+ data.high +' and lowest temperature will be ' + data.low ;
            }

        })
    })
})