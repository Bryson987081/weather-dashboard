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
                const cardImgEl = document.createElement('a');
                const cardTempEl = document.createElement('p');
                const cardWindEl = document.createElement('p');
                const cardHumidityEl = document.createElement('p');


                columnEl.className = 'col card m-3 p-4';
                cardDateEl.textContent = `${list.dt_txt}`;
                cardImgEl.textContent = `https://openweathermap.org/img/wn/'${list.weather.icon}'@2x.png`;
                cardTempEl.textContent = `Temp: ${list.main.temp} `;
                cardWindEl.textContent = `Wind: ${list.wind.speed}`;
                cardHumidityEl.textContent = `Humidity: ${list.main.humidity}`;

                columnEl.appendChild(cardDateEl);
                columnEl.appendChild(cardImgEl);
                columnEl.appendChild(cardTempEl);
                columnEl.appendChild(cardWindEl);
                columnEl.appendChild(cardHumidityEl);
                resultList.appendChild(columnEl);

            }
            
            const recentBtnDiv = document.createElement('div');
            const recentBtn = document.createElement('button')
            recentBtn.className = 'btn btn-primary col-2 m-3 p-2';
            recentBtn.type = 'submit';
            recentBtn.textContent = (qInput.value.trim());
            recentBtnDiv.appendChild(recentBtn);
            recentSearch.appendChild(recentBtnDiv);

        })
        .catch(function (err) {
            console.log(err);
        });

        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const cardColumn = document.getElementById('results');
            const cards = cardColumn.querySelectorAll('.card');
            cards.forEach(card => {
                card.remove();
            })
        })


        });
        
       
