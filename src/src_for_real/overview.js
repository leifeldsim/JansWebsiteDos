function populateOverviewTable(jsondata){
    let table = document.getElementById("table_overview");
    clearTable(table);
    for (let i = 0; i < Object.keys(jsondata).length; i++) {
        let element = jsondata[i];
        let row = table.insertRow();
        
        let kategorie = row.insertCell(0);
        kategorie.innerHTML = element.Kategorie;
        
        let link = row.insertCell(1);
        link.appendChild(createLinkHTMLElement(element.Link));
    }
}

function updateGUIElements(json_element){
    var overview_headline = document.getElementById("overview_headline");
    overview_headline.innerText = "Übersicht " + json_element.headline;
    var overview_txt_info = document.getElementById("overview_txt_info");
    overview_txt_info.innerText = json_element.info_text;
}

function loadDataFromID(overview_data){
    const queryString = window.location.search;
    let id = queryString.substring(1);
    for (let i = 0; i < Object.keys(overview_data.overview).length; i++) {
        element = overview_data.overview[i];
        if(element.id == id){
            updateGUIElements(element);
            break;            
        }
    }
}

function loadData(){
    fetch('../json/massnahmen.json')
    .then(response => response.json())
    .then(data => populateOverviewTable(data));

    fetch('../json/overview.json')
    .then(response => response.json())
    .then(data => loadDataFromID(data))
}

loadData();