const CUSTOMER_TYPE = {
    PRIVATE: "Privat",
    COMPANY: "Unternehmen",
    NOT_DEFINED: "Keine Angabe"
};

const MASSNAHMEN_ART = {
    BUILDING: "Gebäude",
    OUTSIDE: "Außen",
    OTHER: "Sonstige"
}

//------------------------------------------------
//Build Website and set Default Values
this.constList = [];
this.customerType = CUSTOMER_TYPE.COMPANY;

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
    let cb_div = document.getElementById("cb_massnahmen_typ_gebaeude");
    for(let i = 1; i < cb_div.childElementCount; i++){
        if(cb_div.children[i].childNodes[0].checked){
            let checkboxId = cb_div.children[i].childNodes[0].name.substring(CHECKBOX_ID_PREFIX.length)
            checkedMassnahmen.push(parseInt(checkboxId));
        }
    }
    cb_div = document.getElementById("cb_massnahmen_typ_aussenbereich");
    for(let i = 1; i < cb_div.childElementCount; i++){
        if(cb_div.children[i].childNodes[0].checked){
            let checkboxId = cb_div.children[i].childNodes[0].name.substring(CHECKBOX_ID_PREFIX.length)
            checkedMassnahmen.push(parseInt(checkboxId));
        }
    }
    cb_div = document.getElementById("cb_massnahmen_typ_sonstige");
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
    checkedMassnahmen.sort(function(a, b){return a - b}); 

    let private_cb = document.getElementById('customertype_private');
    let company_cb = document.getElementById('customertype_company');

    if(private_cb.checked){
        this.customerType = CUSTOMER_TYPE.PRIVATE;
    }else if(company_cb.checked){
        this.customerType = CUSTOMER_TYPE.COMPANY;
    }else{
        this.customerType = CUSTOMER_TYPE.NOT_DEFINED
    }

    let m = new Massnahmen(checkedMassnahmen, customerType);

    fetch('../json/massnahmen.json')
    .then(response => response.json())
    .then(data => processInput(data, m))
}

function checkCategorieIds(jsonIds, checkedIds) {
    for (let i = 0; i < jsonIds.length; i++) {
        if(checkedIds.includes(jsonIds[i])){ //checkedIds[i] != jsonIds[i]
            return true;
        }
    }
    return false;
}

function checkFoerdermittelnehmer(foerdermittelnehmer){
    return foerdermittelnehmer.includes(this.customerType);
}

function getMassnahmen(jsondata, m){
    var correspondingMassnahmen = [];
    for (let i = 0; i < Object.keys(jsondata).length; i++) {
        let element = jsondata[i];
        if(!checkFoerdermittelnehmer(element.Fördermittelnehmer)){
            continue;
        }
        let isSameCategorie = checkCategorieIds(element.KategorieIds, m.values);
        //console.log("json values: " + element.KategorieIds + " checked value: " + m.values + " -> Result: " + (isSameCategorie))
        if(isSameCategorie){
            correspondingMassnahmen.push(element);
        }
    }
    return correspondingMassnahmen;
}

function populateConsultationTable(massnahmen){
    let table = document.getElementById("table_consultation");
    clearTable(table);
    if(massnahmen.length == 0){
        let row = table.insertRow();
        let no_massnahmen_found = row.insertCell();
        no_massnahmen_found.innerHTML = "Keine Fördermaßnahmen gefunden!";
        return;
    }
    massnahmen.forEach(item => {
        let row = table.insertRow();
        
        let category = row.insertCell(0);
        category.innerHTML = item.Kategorie;
        
        let foerderung = row.insertCell(1);
        foerderung.innerHTML = item.Förderung;
        
        let foerderhoehe = row.insertCell(2);
        foerderhoehe.innerHTML = item.Förderhöhe;
        
        let foerdergegenstand = row.insertCell(3);
        foerdergegenstand.innerHTML = item.Fördergegenstand;

        let foerdervorraussetzungen = row.insertCell(4);
        foerdervorraussetzungen.innerHTML = item.Fördervoraussetzung;

        let foerdergeber = row.insertCell(5);
        foerdergeber.innerHTML = item.Fördergeber;

        let link = row.insertCell(6);
        link.appendChild(createLinkHTMLElement(item.Link));
    
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
    constructor(values, customerType){
        this.values = values;
        this.customerType = customerType;
    }
}

const CHECKBOX_ID_PREFIX = "cb_"