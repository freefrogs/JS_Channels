document.addEventListener('DOMContentLoaded', function() {
  //fetching data from json file
  const url = 'http://localhost:3000/data'

  const channels = [];
  fetch(url)
    .then(res => res.json())
    .then(data => channels.push(...data))
    .catch(err => console.error(err));

  //deleting fallowing characters ' ', ',', '.'
  const deleteChar = (string) => {
    return string.replace(/[,. ]/g, '');
  };

  //adding imperial notation (dedicated to subscribers, videos & views)
  const numberWithCommas = (string) => {
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //getting sort condition
  const getSortCondition = () => {
    const radioInputs = document.querySelectorAll('[class*="choice--radio"]');
    const conditionInputs = [...radioInputs].filter(el => el.checked);
    let condition = 'none'
    if (conditionInputs.length) {
      condition = conditionInputs[0].dataset.sort;
    }
    return condition;
  }

  //alphabetical sorting
  const sortingAlph = (channelsArr) => {
    return channelsArr.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
  };

  //sorting by numbers
  const sortingNumb = (channelsArr, condition) => {
    return channelsArr.sort((a, b) => parseInt(deleteChar(a.statistics[condition])) - parseInt(deleteChar(b.statistics[condition])));
  }

  //reversing array
  const reverseArr = (channelsArr) => {
    return channelsArr.reverse();
  }

  //adding utm with timestamp
  const changeUrl = (e) => {
    const utmBasic = 'utm_source=name1&utm_medium=name2&utm_campaign=name3&';
    const timeStamp = (new Date().toLocaleString( 'sv', { timeZoneName: 'short' })).replace(/[ ]/g,'_').replace(/[:]/g,'');
    const utmTimeStamp = `utm_content=${timeStamp}`;
    const url =`${e.currentTarget.dataset.url}?${utmBasic}${utmTimeStamp}`;
    e.currentTarget.href = url;
    return false;
  };

  //creating cards
  const showChannels = (channelsArr) => {
    const cardsBox = document.querySelector('.js-content');
    let cardsContent = '';

    if (!channelsArr.length) {
      cardsBox.innerHTML = '';
      return
    }

    channelsArr.forEach(el => {
      const subscriberCount = numberWithCommas(deleteChar(el.statistics.subscriberCount));
      const videoCount = numberWithCommas(deleteChar(el.statistics.videoCount));
      const viewCount = numberWithCommas(deleteChar(el.statistics.viewCount));
      cardsContent += `
        <div class="card">
          <a class="card__link" href="#" data-url=${el.customUrl} target="_blank">
            <img class="card__img" src=${el.thumbnails.medium.url} alt="${el.tilte} logo">
          </a>
          <h2 class="card__title">${el.title}</h2>
          <div class="card__desc">
            <div class="desc__data">
              <h4 class="desc__name">subscribers:</h4>
              <p class="desc__value">${subscriberCount}</p>
            </div>
            <div class="desc__data">
              <h4 class="desc__name">videos:</h4>
              <p class="desc__value">${videoCount}</p>
            </div>
            <div class="desc__data">
              <h4 class="desc__name">views:</h4>
              <p class="desc__value">${viewCount}</p>
            </div>
          </div>
        </div>
      `
      cardsBox.innerHTML = cardsContent;
    });
    //adding event listener do dynamic HTML elements
    const channelsLinks = document.querySelectorAll('.card__link');

    [...channelsLinks].forEach(link => {
      link.addEventListener('click', changeUrl);
    });
  };

  //adding all Cards onload
  const getCardsOnLoad = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => showChannels(data))
      .catch(err => console.error(err));
  };

  getCardsOnLoad();

  //changeing Polish characters
  function changePolishLetters(string) {
    string = string.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, c => "acelnoszzACELNOSZZ"["ąćęłńóśźżĄĆĘŁŃÓŚŹŻ".indexOf(c)]);
    return string;
  }

  //matching channels by title
  const filterInput = document.querySelector('.filter__input');

  const findChannels = (searchWord, channelsArr) => {
    searchWord = changePolishLetters(searchWord);
    return channelsArr.filter(channel => {
        const regex = new RegExp(searchWord, 'gi');
        const newTitle = changePolishLetters(channel.title);
        return newTitle.match(regex);
    }) 
  };

  function matchChannels(e) {
    let inputValue = '';
    if (this.value) {
      inputValue = this.value;
    }
    let matchedChannels = findChannels(inputValue, channels);

    //sorting channels array by conditions
    const condition = getSortCondition();
    const reverse = document.querySelector('.button--sort').dataset.on;

    if (condition === 'none') {
    } else if (condition === 'title') {
      matchedChannels = sortingAlph(matchedChannels);
    } else {
      matchedChannels = sortingNumb(matchedChannels, condition);
    }

    if (reverse === 'yes') {
      matchedChannels = reverseArr(matchedChannels);
    }

    showChannels(matchedChannels);
  }

  //bloking of RegExp special characters
  filterInput.addEventListener('keydown', (e) => {
    const badChar = [220, 191, 54, 52, 190, 56, 187, 219, 221, 57, 48];
    if (badChar.includes(e.keyCode)) {
      setTimeout(function() {
        e.target.value += '';
      }, 4);
      e.preventDefault();
    }
  });

  filterInput.addEventListener('keyup', matchChannels);

  //Clear button handling
  const handleClear = () => {
    //hiding ascending/descending button
    const ascendingDescendingButton = document.querySelector('.button--sort');
    ascendingDescendingButton.classList.add('invisible');
    ascendingDescendingButton.dataset.on = 'no';
    ascendingDescendingButton.innerText = 'Descending';

    //clearing radio checked
    const radioInputs = document.querySelectorAll('[class*="choice--radio"]');
    [...radioInputs].forEach(input => {
      input.checked = false;
    });

    //clearing filter input value
    filterInput.value = '';
    getCardsOnLoad();
  };

  const clearButton = document.querySelector('.button--clear');

  clearButton.addEventListener('click', handleClear);

  //ascending/descending button handling
  //button is visible olny when one of radio inputs is checked
  const showButton = () => {
    const ascendingDescendingButton = document.querySelector('.button--sort');
    ascendingDescendingButton.classList.remove('invisible');
    matchChannels();
  };

  const radioInputs = document.querySelectorAll('[class*="choice--radio"]');
  [...radioInputs].forEach(input => {
    input.addEventListener('change', showButton);
  });

  //changing ascending/descending button value and dataset onclick
  const changeButtonData = (e) => {
    if (e.target.dataset.on === 'yes') {
      e.target.dataset.on = 'no';
      e.target.innerText = 'Descending';
      matchChannels();
      return
    }
    e.target.dataset.on = 'yes';
    e.target.innerText = 'Ascending';
    matchChannels();
  }

  const ascendingDescendingButton = document.querySelector('.button--sort');

  ascendingDescendingButton.addEventListener('click', changeButtonData);

  //handling contrast button
  const changeColors = () => {
    const wrapper = document.querySelector('.wrapper');
    const wrapperClasses = wrapper.classList.value;
    if (wrapperClasses.includes('wrapper--light')) {
      wrapper.classList.remove('wrapper--light');
      wrapper.classList.add('wrapper--dark');
      return
    }
    wrapper.classList.add('wrapper--light');
    wrapper.classList.remove('wrapper--dark');
  }

  const contrastButton = document.querySelector('.contrast');
  contrastButton.addEventListener('click', changeColors);

  //handling entry count
  //get data
  const getEntryTime = () => {
    const thisData = new Date();
    const day = thisData.getDay();
    const month = thisData.getMonth();
    const year = thisData.getFullYear();
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${day} ${monthsArr[month]} ${year}`;
  }
  //handling local Storage
  const entryCount = () => {
    //get data from Local Storage
    const entryData = JSON.parse(localStorage.getItem('entryData')) || [0, '', ''];
    const entryValue = entryData[0] + 1;
    const prevEntryData = entryData[2];
    const thisEntryData = getEntryTime();
    entryData[0] = entryValue;
    entryData[1] = prevEntryData;
    entryData[2] = thisEntryData;
    //save data in Local Storage
    localStorage.setItem('entryData', JSON.stringify(entryData));
  }

  entryCount();
});