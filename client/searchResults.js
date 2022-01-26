function parseURLQuery(){
    let query = location.search.slice(1);
    
    // handle empty query
    if(!query) {
        return "";
    }

    let splitQuery = query.split('&').map(keyValue => keyValue.split("="));

    let parsedQuery = {};
    splitQuery.forEach(keyValue => {
        if(keyValue.length === 2) {
            parsedQuery[keyValue[0]] = keyValue[1];
        }
    });

    return parsedQuery;
}

function renderData(data){
    const resultsElement = document.querySelector('#results');
    // for each data item create and append result
}

function getData(searchInput, callback){
    fetch(`http://localhost:3000/search?q=${searchInput}`)
      .then(resp => resp.json())
      .then(callback);
  }

function loadResults(){
    let query = parseURLQuery().q;

    if(!query) {
        window.location.href = "index.html";
    }

    getData(query, renderData);
}

// loadResults();
