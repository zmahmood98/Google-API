const searchBar = document.querySelector('#searchbartext');

searchBar.addEventListener('keypress', e => {
    if(e.key === 'Enter' && e.target.value) {
        window.location.search = `?q=${encodeURIComponent(e.target.value)}`;
    }
});

loadResults();

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

function clearResults(){
    const resultsElement = document.querySelector('#searchresultsarea');
    resultsElement.innerHTML = "";
}

function renderStats(data, startTime){
    let reqTotalTime = (new Date()).getTime() - startTime;
    let resultStats = document.createElement('p');
    resultStats.id = 'searchresultsnumber';
    resultStats.textContent = `About ${data.length} results (${ (reqTotalTime / 1e3).toFixed(2) } seconds)`;

    const resultsElement = document.querySelector('#searchresultsarea');
    resultsElement.insertBefore(resultStats, resultsElement.firstChild);

}

function renderData(data){
    const resultsElement = document.querySelector('#searchresultsarea');
    data.forEach(dataItem => {
        let result = document.createElement('div');
        let resultHeading = document.createElement('h2');
        let resultURL = document.createElement('a');
        let resultButton = document.createElement('button');
        let resultPreview = document.createElement('p');

        result.className = 'searchresult';
        resultHeading.textContent = dataItem.title;
        resultURL.href = dataItem.url;
        resultURL.textContent = dataItem.url;
        resultButton.textContent = '▼';
        resultPreview.textContent = dataItem.preview;

        result.appendChild(resultHeading);
        result.appendChild(resultURL);
        result.appendChild(resultButton);
        result.appendChild(resultPreview);
        resultsElement.appendChild(result);
    });
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

    document.querySelector('#searchbartext').value = decodeURIComponent(query);

    let reqStartTime = new Date();

    getData(query, data => {
        clearResults();
        renderData(data);
        renderStats(data, reqStartTime);
    });
}
