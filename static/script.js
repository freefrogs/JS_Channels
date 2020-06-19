document.addEventListener('DOMContentLoaded', function() {
  //fetching data from json file
  const getChannels = () => {
    return fetch('channels.json')
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
  };

  //adding card w channals description
  const showChannels = async () => {
    console.log('show');
    const channelsData = await getChannels();
    if (!channelsData) return;

    const cardsBox = document.querySelector('.js-content');

    channelsData.forEach(el => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <a class="card__link" href=${el.customUrl} target="_blank">
          <img class="card__img" src=${el.thumbnails.medium.url} alt="${el.tilte} logo">
        </a>
        <h2 class="card__title">${el.title}</h2>
        <div class="card__desc">
          <div class="desc__data">
            <h4 class="desc__name">subscribers:</h4>
            <p class="desc__value">${el.statistics.subscriberCount}</p>
          </div>
          <div class="desc__data">
            <h4 class="desc__name">videos:</h4>
            <p class="desc__value">${el.statistics.videoCount}</p>
          </div>
          <div class="desc__data">
            <h4 class="desc__name">views:</h4>
            <p class="desc__value">${el.statistics.viewCount}</p>
          </div>
        </div>
      `
      cardsBox.appendChild(card);
    });
  }

  showChannels();

  
});