this.news = [];

function loadNewsList(data){
    for (let i = 0; i < Object.keys(data.news).length; i++) {
        this.news.push(data.news[i]);
    }
    sortNews();
    addNewsToSite();
}

function loadNews(){
    fetch('../json/news.json')
    .then(response => response.json())
    .then(data => loadNewsList(data))
}

function sortNews(){
    this.news.sort((a, b) => {
        return new Date(b.news_date) - new Date(a.news_date); // asc
      })
    console.log(this.news);
}

function addNewsToSite(){
    var iDiv = document.createElement('div');
    iDiv.id = "news_block";
    iDiv.className = "block";
    let temp_trenner = "\n"; //TODO delete
    for(let i = 0; i < this.news.length; i++){
        let curr_news = this.news[i];
        var innerDiv = document.createElement('div');

        var innerTitle = document.createElement('a');
        var innerinnerTitle = document.createElement('h4');
        innerinnerTitle.innerText = curr_news.title + temp_trenner;
        innerTitle.appendChild(innerinnerTitle);
    
        var innerDate = document.createElement('a');
        innerDate.innerText = curr_news.news_date + temp_trenner;
    
        var innerShortText = document.createElement('a');
        innerShortText.innerText = curr_news.shortText + temp_trenner;
    
        var innerLongText = document.createElement('a');
        innerLongText.innerText = curr_news.longText + temp_trenner;
    
        innerDiv.appendChild(innerTitle);
        innerDiv.appendChild(innerDate);
        innerDiv.appendChild(innerShortText);
        innerDiv.appendChild(innerLongText);
        
        // The variable iDiv is still good... Just append to it.
        iDiv.appendChild(innerDiv);
        
        // Then append the whole thing onto the body
        document.getElementById("news_block").appendChild(innerDiv);
    }    
}

loadNews();