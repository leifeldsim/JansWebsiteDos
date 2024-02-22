const CUSTOMER_TYPE = {
    PRIVATE: "Privat",
    COMPANY: "Unternehmen"
};

const MASSNAHMEN_ART = {
    BUILDING: "Gebäude",
    OUTSIDE: "Außen",
    OTHER: "Sonstige"
}

//------------------------------------------------
//Build Website and set Default Values
this.constList = [];

setDefaultValues();

function fillConstList(data) {
    for (let i = 1; i <= Object.keys(data).length; i++) {
        this.constList.push(data[i]);
        addCheckboxes(data[i], i);
    }
}
function setDefaultValues(){
    fetch('../json/kategorien.json')
    .then(response => response.json())
    .then(data => fillConstList(data));
}

function addCheckboxes(massnahme, index){    
    // Create the inner div before appending to the body
    var label = document.createElement("label")
    var checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.id = CHECKBOX_ID_PREFIX + index;
    checkbox.name = CHECKBOX_ID_PREFIX + index;
    var textContent = document.createTextNode(massnahme.category);

    label.appendChild(checkbox);
    label.appendChild(textContent);
    // Then append the whole thing onto the body
    if(massnahme.type == MASSNAHMEN_ART.BUILDING){
        document.getElementById("cb_massnahmen_typ_gebaeude").appendChild(label);
    }else if(massnahme.type == MASSNAHMEN_ART.OUTSIDE){
        document.getElementById("cb_massnahmen_typ_aussenbereich").appendChild(label);
    }else if(massnahme.type == MASSNAHMEN_ART.OTHER){
        document.getElementById("cb_massnahmen_typ_sonstige").appendChild(label);
    }
}

//------------------------------------------------

function getCheckedCategories(){
    let checkedMassnahmen = []
    let cb_div = document.getElementById(cb_massnahmen_typ_gebaeude);
    for(let i = 1; i < cb_div.childElementCount; i++){
        if(cb_div.children[i].childNodes[0].checked){
            let checkboxId = cb_div.children[i].childNodes[0].name.substring(CHECKBOX_ID_PREFIX.length)
            checkedMassnahmen.push(parseInt(checkboxId));
        }
    }
    let cb_div = document.getElementById(cb_massnahmen_typ_aussenbereich);
    for(let i = 1; i < cb_div.childElementCount; i++){
        if(cb_div.children[i].childNodes[0].checked){
            let checkboxId = cb_div.children[i].childNodes[0].name.substring(CHECKBOX_ID_PREFIX.length)
            checkedMassnahmen.push(parseInt(checkboxId));
        }
    }
    let cb_div = document.getElementById(cb_massnahmen_typ_sonstige);
    for(let i = 1; i < cb_div.childElementCount; i++){
        if(cb_div.children[i].childNodes[0].checked){
            let checkboxId = cb_div.children[i].childNodes[0].name.substring(CHECKBOX_ID_PREFIX.length)
            checkedMassnahmen.push(parseInt(checkboxId));
        }
    }
    return checkedMassnahmen;
}

function submitConsultation(){
    let checkedMassnahmen = getCheckedCategories();        
    
    console.log(checkedMassnahmen);

    let m = new Massnahmen(checkedMassnahmen);

    fetch('../json/massnahmen.json')
    .then(response => response.json())
    .then(data => processInput(data, m))
}

//TODO nicht nur != abfragen, gibt auch andere Fälle
function getMassnahmen(jsondata, m){
    var correspondingMassnahmen = [];
    for (let i = 0; i < Object.keys(jsondata).length; i++) {
        let element = jsondata[i];
        //TODO Hier Kategorien vergleichen!!!
        /*for (let massnahmen_index = 0; massnahmen_index < element.massnahmen.length; massnahmen_index++) {
            if(element.massnahmen[massnahmen_index][1] != m.values[massnahmen_index][1]){
                break;
            }
            if(massnahmen_index == (element.massnahmen.length-1)){
                let fm = new FoerderMassnahme(element.name, m, element.info, element.foerdergeber);
                correspondingMassnahmen.push(fm);
            }
        }*/
    }
    return correspondingMassnahmen;
}

function clearTable(table){
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}

function populateConsultationTable(massnahmen){
    let table = document.getElementById("table_consultation");
    clearTable(table);
    massnahmen.forEach(item => {
        let row = table.insertRow();
        let massnahmen = row.insertCell(0);
        massnahmen.innerHTML = getMassnahmenAsString(item);
        let name = row.insertCell(1);
        name.innerHTML = item.name;
        let info = row.insertCell(2);
        info.innerHTML = item.info;
        let foerdergeber = row.insertCell(3);
        foerdergeber.innerHTML = item.foerdergeber;
    });
}

function getMassnahmenAsString(foerder_massnahmen){
    let retString = "";
    for (let i = 0; i < foerder_massnahmen.massnahmen.values.length; i++) {
        if(foerder_massnahmen.massnahmen.values[i][1]){
            retString += foerder_massnahmen.massnahmen.values[i][0] + "<br>";
        }    
    }
    if(retString == ""){
        retString = "Keine Fördermaßnahme gefunden";
    }
    return retString;
}

function processInput(jsondata, m){
    populateConsultationTable(getMassnahmen(jsondata, m));
}

//Die Fördermaßnahme, bestehend aus Name und verschiedenen Maßnahmen (Die Werte für Tabelle)
class FoerderMassnahme { //cringe deutsch

    constructor(name, massnahmen, info, foerdergeber) {
        this.massnahmen = massnahmen;
        this.name = name;
        this.info = info;
        this.foerdergeber = foerdergeber;
    }
}

class Massnahmen{ 
    //value format: (Name, Value, ID)
    constructor(values){
        this.values = values;
    }
}

const CHECKBOX_ID_PREFIX = "cb_"