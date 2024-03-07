this.news = [];

function loadNewsList(data){
    for (let i = 0; i < Object.keys(data.news).length; i++) {
        this.news.push(data.news[i]);
    }
    sortNews();
    addNewsToSite();

    updateNavbarHeight();

    addEventListenerForNewsExpansion();
}

function addEventListenerForNewsExpansion(){
    var coll = document.getElementsByClassName("collapsible_news");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
            content = content.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    } 
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
    let temp_trenner = ""; //TODO delete
    for(let i = 0; i < this.news.length; i++){
        var iDiv = document.createElement('div');
        iDiv.className = "news_block";
        let curr_news = this.news[i];
        var innerDiv = document.createElement('h4');
        innerDiv.className = "collapsible_news";
        innerDiv.innerText = curr_news.title + temp_trenner;
    
        var innerDate = document.createElement('p');
        innerDate.className = "content_news";
        innerDate.style.display = "none";
        innerDate.innerText = curr_news.news_date + temp_trenner;

        var innerShortText = document.createElement('p');
        innerShortText.style.display = "none";
        innerShortText.className = "content_news";
        innerShortText.innerText = curr_news.shortText + temp_trenner;
    
        var innerLongText = document.createElement('p');
        innerLongText.style.display = "none";
        innerLongText.className = "content_news";
        innerLongText.innerText = curr_news.longText + temp_trenner;
    
        /*
        innerDiv.appendChild(innerDate);
        innerDiv.appendChild(innerLongText);*/
        
        // The variable iDiv is still good... Just append to it.
        iDiv.appendChild(innerDiv);
        iDiv.appendChild(innerDate);
        iDiv.appendChild(innerLongText);

        
        // Then append the whole thing onto the body
        document.getElementById("news_block").appendChild(iDiv);
    }    
}

loadNews();