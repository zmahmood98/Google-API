function renderAllData(data){
    document.getElementById('allData').innerHTML = data
  }

function getData(searchInput){
    fetch(`http://localhost:3000/search?q=${searchInput}`)
      .then(resp => resp.json())
      .then(renderAllData)
  }
