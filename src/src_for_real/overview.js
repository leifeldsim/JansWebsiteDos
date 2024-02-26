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

function loadData(){
    fetch('../json/massnahmen.json')
    .then(response => response.json())
    .then(data => populateOverviewTable(data));

}

loadData();
