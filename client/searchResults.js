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

    let splitQuery = query.split('&').map(keyValue => keyValue.split("=").map(decodeURIComponent));

    let parsedQuery = {};
    splitQuery.forEach(keyValue => {
        if(keyValue.length === 2) {
            parsedQuery[keyValue[0]] = keyValue[1].replace(/\+/g, ' ');
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

function renderData(data, query){
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

    //related searches
    let related = document.createElement('div');
    let relatedHeading = document.createElement('h3');
    let relatedListContainer = document.createElement('div');
    let relatedList = document.createElement('ul');
    let relatedListItem1 = document.createElement('li');
    let relatedListItem2 = document.createElement('li');
    let relatedListItem3 = document.createElement('li');

    related.className = 'relatedsearches';
    relatedHeading.textContent = 'Related searches';
    relatedListContainer.className = 'relatedlists';
    relatedList.className = 'relatedleft';
    relatedListItem1.innerHTML = `what is <b>${query}</b>`;
    relatedListItem2.innerHTML = `<b>${query}</b> photos`;
    relatedListItem3.innerHTML = `<b>${query}</b> videos`;

    related.appendChild(relatedHeading);
    related.appendChild(relatedListContainer);
    relatedListContainer.appendChild(relatedList);
    relatedList.appendChild(relatedListItem1);
    relatedList.appendChild(relatedListItem2);
    relatedList.appendChild(relatedListItem3);
    resultsElement.appendChild(related);
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
        renderData(data, decodeURIComponent(query));
        renderStats(data, reqStartTime);
    });
}
