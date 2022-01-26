function renderAllData(data){
  document.getElementById('allData').innerHTML = data
}

function getData(searchInput, callback){
  fetch(`http://localhost:3000/search?q=${searchInput}`)
    .then(resp => resp.json())
    .then(callback);
}

function luckyBtnHandler(e){
  const form = document.querySelector('form');

  if(!form.q.value) {
    return;
  }
  
  getData(form.q.value, data => {
    if(data.length) {
      window.location.href = data[0].url;
    } else {
      form.submit();
    }
  });
}

// event listeners
const luckyBtn = document.querySelector('#lucky-btn');
luckyBtn.addEventListener('click', luckyBtnHandler);
