function renderAllData(data){
  document.getElementById('allData').innerHTML = data
}

function getData(searchInput, callback){
  fetch(`http://localhost:3000/search?q=${searchInput}`)
    .then(resp => resp.json())
    .then(callback);
}

function luckyBtnHandler(e){
    debugger
  const form = document.querySelector('form');
  getData(form.q.value, data => {
    window.location.href = data[0].url;
  });
}

// event listeners
const luckyBtn = document.querySelector('#lucky-btn');
luckyBtn.addEventListener('click', luckyBtnHandler);
