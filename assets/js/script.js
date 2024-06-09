const qInput = document.querySelector('#q');
const searchForm = document.querySelector('#search-form');
const resultList = document.querySelector('#results');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const q = qInput.value.trim();

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + q + '&cnt=6&appid=3c5908744bd76026f872444cdb7a76b6&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Search');
            console.log(data);

            for (let list of data.list) {
                const columnEl = document.createElement('div');
                const cardEl = document.createElement('div');
                const cardHeaderEl = document.createElement('h2');

                columnEl.className = 'col-12';
                cardEl.className = 'card p-3 m-3';
                cardHeaderEl.textContent = qInput;
                cardEl.textContent = `${list.dt_txt}Temp: ${list.main.temp} Wind: ${list.wind.speed} Humidity: ${list.main.humidity}`; 
                
                columnEl.appendChild(cardHeaderEl);
                columnEl.appendChild(cardEl);
                resultList.appendChild(columnEl);
                
            }
        })
        .catch(function (err) {
            console.log(err);
        });
});

