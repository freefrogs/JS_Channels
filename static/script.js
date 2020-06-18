document.addEventListener('DOMContentLoaded', function() {
  //fetching data from json file
  const getChannels = () => {
    fetch('channels.json')
    .then((res) => res.json())
    .then((data) => console.log(data));
  }

  getChannels();
})
