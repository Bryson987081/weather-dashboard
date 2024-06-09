const qInput = document.querySelector('#q');
const searchForm = document.querySelector('#search-form');
const resultList = document.querySelector('#results');
const recentSearch = document.querySelector('#recent-search');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const q = qInput.value.trim();

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + q + '&appid=3c5908744bd76026f872444cdb7a76b6&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Search');
            console.log(data);

            for (let list of data.list) {
                const columnEl = document.createElement('div');
                const cardDateEl = document.createElement('p');
                const cardTempEl = document.createElement('p');
                const cardWindEl = document.createElement('p');
                const cardHumidityEl = document.createElement('p');


                columnEl.className = 'col card p-3 m-3 ';
                cardDateEl.textContent = `${list.dt_txt}` 
                //cardImgEl.textContent = ``
                cardTempEl.textContent = `Temp: ${list.main.temp} `; 
                cardWindEl.textContent = `Wind: ${list.wind.speed}`; 
                cardHumidityEl.textContent = `Humidity: ${list.main.humidity}`; 
        
                columnEl.appendChild(cardDateEl);
                //columnEl.appendChild(cardImgEl);
                columnEl.appendChild(cardTempEl);
                columnEl.appendChild(cardWindEl);
                columnEl.appendChild(cardHumidityEl);
                resultList.appendChild(columnEl);
                
            }
            const recentBtnDiv = document.createElement('div');
            const recentBtn = document.createElement('button')
            recentBtn.className = 'btn btn-primary mb-3';
            recentBtn.textContent = (qInput.value.trim());
            recentBtnDiv.appendChild(recentBtn);
            recentSearch.appendChild(recentBtnDiv);

        })
        .catch(function (err) {
            console.log(err);
        });


});

