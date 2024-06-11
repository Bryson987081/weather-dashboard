const qInput = document.querySelector('#q');
const searchForm = document.querySelector('#search-form');
const resultList = document.querySelector('#results');
const recentSearch = document.querySelector('#recent-search');



const createCard = function () {

    const q = qInput.value.trim();

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + q + '&appid=3c5908744bd76026f872444cdb7a76b6&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Search');
            console.log(data);
            const dataJSON = JSON.stringify(data)
            localStorage.setItem('recent', dataJSON);

            // for (let list of data.list) {
            for (let i = 0; i < data.list.length; i = i + 8) {
                const list = data.list[i];
                const columnEl = document.createElement('div');
                const cardDateEl = document.createElement('h3');
                const cardImgEl = document.createElement('img');
                const cardTempEl = document.createElement('p');
                const cardWindEl = document.createElement('p');
                const cardHumidityEl = document.createElement('p');
                const icon = `${list.weather[0].icon}`;

                columnEl.className = 'col card m-3 p-4';
                cardImgEl.className = "icon col-3";
                cardDateEl.textContent = dayjs(list.dt_txt).format('MM/DD/YYYY');
                cardImgEl.src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
                cardTempEl.textContent = `Temp: ${list.main.temp} F°`;
                cardWindEl.textContent = `Wind: ${list.wind.speed} MPH`;
                cardHumidityEl.textContent = `Humidity: ${list.main.humidity} %`;

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

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const cardColumn = document.getElementById('results');
        const cards = cardColumn.querySelectorAll('.card');
        cards.forEach(card => {
            card.remove();
        })
    })


};

recentSearch.addEventListener('submit', function (event) {
    event.preventDefault();
    const showRecent = localStorage.getItem("recent");
    createCard(showRecent);


})
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    createCard();

});
