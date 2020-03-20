// получаем данные со страницы
const formSearch = document.querySelector('.form-search'),
      inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
      dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
      inputCitiesTo = formSearch.querySelector('.input__cities-to'),
      dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
      inputDateDepart = formSearch.querySelector('.input__date-depart');

// данные
const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
      proxy = 'https://cors-anywhere.herokuapp.com/',
      API_KEY = '5b37392429667e7301ed51446069203d',
      calendar = 'http://min-prices.aviasales.ru/calendar_preload';

let city = [];


// Функции

const getData = (url, callBack) => {
  const request = new XMLHttpRequest();

  request.open('GET', url);

  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;

    if (request.status === 200) {
      callBack(request.response);
    } else {
      console.error(request.status);
    }
  });

  request.send();
};



const showCity = (input, list) => {
  list.textContent = '';

  if (input.value !== '') {    
    const filterCity = city.filter((item) => {      
        const fixItem = item.name.toLowerCase();
        return fixItem.includes(input.value.toLowerCase());            
    });
  
    filterCity.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('dropdown__city');
      li.textContent = item.name;
      list.append(li);
    });
  }   
};

const selectCity = (event, input, list) => {
  const target = event.target;
  if (target.tagName.toLowerCase() === 'li') {
    input.value = target.textContent;
    list.textContent = '';
  }
}

// Обработчики событий
inputCitiesFrom.addEventListener('input', () => {
  showCity(inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () => {
  showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesFrom.addEventListener('click', (event) => {
  selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesTo.addEventListener('click', (event) => {
  selectCity(event, inputCitiesTo, dropdownCitiesTo);
});

// Вызовы функций

getData(proxy + citiesApi, (data) => {
  city = JSON.parse(data).filter(item => item.name);

  console.log(city);

});


// http://min-prices.aviasales.ru/calendar_preload


