function populateOverviewTable(jsondata){
    let table = document.getElementById("table_overview");
    clearTable(table);
    for (let i = 0; i < Object.keys(jsondata.foerderungen).length; i++) {
        let element = jsondata.foerderungen[i];
        let row = table.insertRow();
        
        let kategorie = row.insertCell(0);
        kategorie.innerHTML = "Kategorie";
        
        let link = row.insertCell(1);
        link.innerHTML = "Link";//TODO define kategorie
    }
}

function loadData(){
    fetch('../json/massnahmen.json')
    .then(response => response.json())
    .then(data => populateOverviewTable(data));

}

loadData();
