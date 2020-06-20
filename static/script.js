document.addEventListener('DOMContentLoaded', function() {
  //fetching data from json file
  const channels = [];
  fetch('channels.json')
    .then(res => res.json())
    .then(data => channels.push(...data));

  //deleting fallowing characters ' ', ',', '.'
  const deleteChar = (string) => {
    return string.replace(/[,. ]/g, '');
  };
  //adding imperial notation (dedicated to subscribers, videos & views)
  const numberWithCommas = (string) => {
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  

 /*  let test = '13 779 683';
  let aaa ='6,747 555'
  test = deleteChar(test);
  console.log(test);
  test = numberWithCommas(test);
  console.log(test);

  console.log(numberWithCommas(deleteChar(aaa))); */

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
          <a class="card__link" href=${el.customUrl} target="_blank">
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
  };

  //adding all Cards onload
  const getCardsOnLoad = () => {
    fetch('channels.json')
      .then(res => res.json())
      .then(data => showChannels(data));
  };

  getCardsOnLoad();

  //changeing Polish characters
  function changePolishLetters(string) {
    string = string.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, c => "acelnoszzACELNOSZZ"["ąćęłńóśźżĄĆĘŁŃÓŚŹŻ".indexOf(c)]);
    return string;
  }

  //searching channels by name
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
    const matchedChannels = findChannels(inputValue, channels);

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
});