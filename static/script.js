document.addEventListener('DOMContentLoaded', () => {
  const url = 'http://localhost:3000/data';
  const channels = [];

  // Deleting following characters ' ', ',', '.'
  const deleteChar = (string) => string.replace(/[,. ]/g, '');

  // Adding imperial notation (dedicated to subscribers, videos & views)
  const numberWithCommas = (string) => string.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Getting sort condition
  const getSortCondition = () => {
    const radioInputs = document.querySelectorAll('[class*="choice--radio"]');
    const conditionInputs = [...radioInputs].filter((el) => el.checked);
    let condition = 'none';
    if (conditionInputs.length) {
      condition = conditionInputs[0].dataset.sort;
    }
    return condition;
  };

  // Alphabetical sorting
  const sortingAlph = (channelsArr) => {
    return channelsArr.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
  };

  // Sorting by numbers
  const sortingNumb = (channelsArr, condition) => {
    return channelsArr.sort((a, b) => parseInt(deleteChar(a.statistics[condition]), 10) - parseInt(deleteChar(b.statistics[condition]), 10));
  };

  // Reversing array
  const reverseArr = (channelsArr) => {
    return channelsArr.reverse();
  };

  // Changing Polish characters
  const changePolishLetters = (string) => {
    return string.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (c) => 'acelnoszzACELNOSZZ'['ąćęłńóśźżĄĆĘŁŃÓŚŹŻ'.indexOf(c)]);
  };

  // Adding utm with timestamp
  const changeUrl = (e) => {
    const utmBasic = 'utm_source=name1&utm_medium=name2&utm_campaign=name3&';
    const timeStamp = (new Date().toLocaleString('sv', { timeZoneName: 'short' })).replace(/[ ]/g, '_').replace(/[:]/g, '_');
    const utmTimeStamp = `utm_content=${timeStamp}`;
    const linkUrl = `${e.currentTarget.dataset.url}?${utmBasic}${utmTimeStamp}`;
    e.currentTarget.href = linkUrl;
    return false;
  };

  // Creating cards
  const showChannels = (channelsArr) => {
    const cardsBox = document.querySelector('.js-content');
    let cardsContent = '';

    if (!channelsArr.length) {
      cardsBox.innerHTML = '';
      return;
    }

    channelsArr.forEach((el) => {
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
      `;
      cardsBox.innerHTML = cardsContent;
    });
    // Adding event listener to dynamic HTML elements
    const channelsLinks = document.querySelectorAll('.card__link');

    [...channelsLinks].forEach((link) => {
      link.addEventListener('click', changeUrl);
    });
  };

  // Error handler
  const errorHandler = () => {
    const main = document.querySelector('.error');
    main.classList.remove('invisible');
  };

  // Fetching data from json file
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!channels.length) {
        channels.push(...data);
      }
      showChannels(data);
    } catch (err) {
      errorHandler();
    }
  };

  // adding all Cards on document load
  fetchData();

  // Matching channels by title
  const filterInput = document.querySelector('.filter__input');

  const findChannels = (searchWord, channelsArr) => {
    const word = changePolishLetters(searchWord);
    return channelsArr.filter((channel) => {
      const regex = new RegExp(word, 'gi');
      const newTitle = changePolishLetters(channel.title);
      return newTitle.match(regex);
    });
  };

  function matchChannels() {
    let inputValue = '';
    if (this.value) {
      inputValue = this.value;
    }
    let matchedChannels = findChannels(inputValue, channels);

    // Sorting channels array by conditions
    const condition = getSortCondition();
    const reverse = document.querySelector('.button--sort').dataset.on;

    if (condition === 'title') {
      matchedChannels = sortingAlph(matchedChannels);
    } else if (condition === 'subscriberCount' || condition === 'videoCount' || condition === 'viewCount') {
      matchedChannels = sortingNumb(matchedChannels, condition);
    }

    if (reverse === 'yes') {
      matchedChannels = reverseArr(matchedChannels);
    }

    showChannels(matchedChannels);
  }

  // Bloking of RegExp special characters
  filterInput.addEventListener('keydown', (e) => {
    const badChar = [220, 191, 54, 52, 190, 56, 187, 219, 221, 57, 48];
    if (badChar.includes(e.keyCode)) {
      setTimeout(() => {
        e.target.value += '';
      }, 4);
      e.preventDefault();
    }
  });

  filterInput.addEventListener('keyup', matchChannels);

  // Clear button handling
  const handleClear = () => {
    // Hiding ascending/descending button
    const ascendingDescendingButton = document.querySelector('.button--sort');
    ascendingDescendingButton.classList.add('invisible');
    ascendingDescendingButton.dataset.on = 'no';
    ascendingDescendingButton.innerText = 'do descending';

    // Clearing checked radio
    const radioInputs = document.querySelectorAll('[class*="choice--radio"]');
    [...radioInputs].forEach((inputEl) => {
      inputEl.checked = false;
    });

    // Clearing filter input value
    filterInput.value = '';
    fetchData();
  };

  const clearButton = document.querySelector('.button--clear');

  clearButton.addEventListener('click', handleClear);

  // Ascending/descending button handling
  // Button is visible only when one of radio inputs is checked
  const showButton = () => {
    const ascendingDescendingButton = document.querySelector('.button--sort');
    ascendingDescendingButton.classList.remove('invisible');
    matchChannels();
    // Clearing filter input value
    filterInput.value = '';
  };

  const radioInputs = document.querySelectorAll('[class*="choice--radio"]');
  [...radioInputs].forEach((inputEl) => {
    inputEl.addEventListener('change', showButton);
  });

  // Changing ascending/descending button value and dataset onclick
  const changeButtonData = (e) => {
    if (e.target.dataset.on === 'yes') {
      e.target.dataset.on = 'no';
      e.target.innerText = 'do descending';
      matchChannels();
      // Clearing filter input value
      filterInput.value = '';
      return;
    }
    e.target.dataset.on = 'yes';
    e.target.innerText = 'do ascending';
    matchChannels();
    // Clearing filter input value
    filterInput.value = '';
  };

  const ascendingDescendingButton = document.querySelector('.button--sort');

  ascendingDescendingButton.addEventListener('click', changeButtonData);

  // Handling contrast button
  const changeColors = () => {
    const wrapper = document.querySelector('.wrapper');
    const wrapperClasses = wrapper.classList.value;
    if (wrapperClasses.includes('wrapper--light')) {
      wrapper.classList.remove('wrapper--light');
      wrapper.classList.add('wrapper--dark');
      return;
    }
    wrapper.classList.add('wrapper--light');
    wrapper.classList.remove('wrapper--dark');
  };

  const contrastButton = document.querySelector('.contrast');

  contrastButton.addEventListener('click', changeColors);

  // Handling entry count
  // Get date
  const getEntryTime = () => {
    const thisData = new Date();
    const day = thisData.getDate();
    const month = thisData.getMonth();
    const year = thisData.getFullYear();
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${day} ${monthsArr[month]} ${year}`;
  };

  // Handling localStorage
  const entryCount = () => {
    // Get data from localStorage
    const entryData = JSON.parse(localStorage.getItem('entryData')) || [0, '', ''];
    const entryValue = entryData[0] + 1;
    const prevEntryData = entryData[2];
    const thisEntryData = getEntryTime();
    entryData[0] = entryValue;
    entryData[1] = prevEntryData;
    entryData[2] = thisEntryData;
    // Save data in localStorage
    localStorage.setItem('entryData', JSON.stringify(entryData));
  };

  entryCount();
});
