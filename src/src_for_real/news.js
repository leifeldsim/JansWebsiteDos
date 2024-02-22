function loadNews(){
    fetch('../json/news.json')
    .then(response => response.json())
    .then(data => processNews(data))
}

function addNews(news){
    var iDiv = document.createElement('div');
    iDiv.id = "news_block";
    iDiv.className = "block";

    let temp_trenner = "__________"; //TODO delete

    // Create the inner div before appending to the body
    var innerDiv = document.createElement('div');

    var innerTitle = document.createElement('a');
    innerTitle.innerText = news.title + temp_trenner;

    var innerDate = document.createElement('a');
    innerDate.innerText = news.date + temp_trenner;

    var innerShortText = document.createElement('a');
    innerShortText.innerText = news.shortText + temp_trenner;

    var innerLongText = document.createElement('a');
    innerLongText.innerText = news.longText + temp_trenner;

    innerDiv.appendChild(innerTitle);
    innerDiv.appendChild(innerDate);
    innerDiv.appendChild(innerShortText);
    innerDiv.appendChild(innerLongText);
    
    // The variable iDiv is still good... Just append to it.
    iDiv.appendChild(innerDiv);
    
    // Then append the whole thing onto the body
    document.getElementById("news_block").appendChild(innerDiv);
}

function processNews(data){
    for (let i = 0; i < Object.keys(data.news).length; i++) {
        let element = data.news[i];
        addNews(element);
    };
}

loadNews();