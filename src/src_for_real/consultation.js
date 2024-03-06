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

function updateNavbarHeightReload(){
    if (window.performance) {
        console.info("window.performance works fine on this browser");
    }    
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        updateNavbarHeight();
    }
}

function updateNavbarHeight(){
    const navbar = document.getElementById("navbar"); 
    if(navbar == null){
        return;
    }
    const height = document.getElementById("navbar").clientHeight;
    console.log(document.getElementById("navbar").offsetHeight);

    console.log(height);
    // Get the root element
    var root = document.documentElement;
    // Set the value of the --color-font-general variable to #000000
    root.style.setProperty('--navbar-height', height + "px");

}

function fillConstList(data) {
    document.getElementById("cb_massnahmen_typ_gebaeude_header").innerText = "Gebäude";
    document.getElementById("cb_massnahmen_typ_aussenbereich_header").innerText = "Außenbereich";
    document.getElementById("cb_massnahmen_typ_sonstige_header").innerText = "Sonstige";
    for (let i = 1; i <= Object.keys(data).length; i++) {
        this.constList.push(data[i]);
        addCheckboxes(data[i], i);
    }
    updateNavbarHeight();
}

function setDefaultValues(){
    fetch('../json/kategorien.json')
    .then(response => response.json())
    .then(data => fillConstList(data));
}

function addCheckboxes(massnahme, index){    
    // Create the inner div before appending to the body
    let cb_element;
    let br = "<br>";

    var label = document.createElement("label")
    var checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.className = "cb_kategorien";
    checkbox.id = CHECKBOX_ID_PREFIX + index;
    checkbox.name = CHECKBOX_ID_PREFIX + index;
    var textContent = document.createTextNode(" " + massnahme.category);
    
    label.className = "label";
    label.appendChild(checkbox);
    label.appendChild(textContent);
    // Then append the whole thing onto the body
    if(massnahme.type == MASSNAHMEN_ART.BUILDING){
        cb_element = document.getElementById("cb_massnahmen_typ_gebaeude");
    }else if(massnahme.type == MASSNAHMEN_ART.OUTSIDE){
        cb_element = document.getElementById("cb_massnahmen_typ_aussenbereich");
    }else if(massnahme.type == MASSNAHMEN_ART.OTHER){
        cb_element = document.getElementById("cb_massnahmen_typ_sonstige");
    }
    /*
    if(countTemp(cb_element) % 3 == 0){
        label.innerHTML += br; 
    }
    */

    cb_element.appendChild(label);
}

function countTemp(element){
    let count = 0;
    for (let i = 0; i < element.childNodes.length; i++) {
        if(element.childNodes[i].class == "label"){
            count++;
        }
    }
    return count;
}

//------------------------------------------------

function getCheckedCategories(){
    let checkedMassnahmen = []
    let cb_div = document.getElementById("cb_massnahmen_typ_gebaeude");
    for(let i = 0; i < cb_div.childElementCount; i++){
        console.log(cb_div.children[i]);
        console.log(cb_div.children[i].childNodes[0]);
        if(cb_div.children[i].childNodes[0].checked){
            let checkboxId = cb_div.children[i].childNodes[0].name.substring(CHECKBOX_ID_PREFIX.length)
            checkedMassnahmen.push(parseInt(checkboxId));
        }
    }
    cb_div = document.getElementById("cb_massnahmen_typ_aussenbereich");
    for(let i = 0; i < cb_div.childElementCount; i++){
        if(cb_div.children[i].childNodes[0].checked){
            let checkboxId = cb_div.children[i].childNodes[0].name.substring(CHECKBOX_ID_PREFIX.length)
            checkedMassnahmen.push(parseInt(checkboxId));
        }
    }
    cb_div = document.getElementById("cb_massnahmen_typ_sonstige");
    for(let i = 0; i < cb_div.childElementCount; i++){
        if(cb_div.children[i].childNodes[0].checked){
            let checkboxId = cb_div.children[i].childNodes[0].name.substring(CHECKBOX_ID_PREFIX.length)
            checkedMassnahmen.push(parseInt(checkboxId));
        }
    }
    return checkedMassnahmen;
}

function setCustomerErrorText(text){
    let error_label_customer = document.getElementById("error_txt_customer");
    error_label_customer.innerText = text;
}

function setMassnahmenErrorText(text){
    let error_label_massnahmen = document.getElementById("error_txt_massnahmen");
    error_label_massnahmen.innerText = text;
}

function setGeneralErrorText(text){
    let error_label_general = document.getElementById("error_txt_general");
    error_label_general.innerText = text;
}

function updateGeneralErrorText(){
    let error_label_customer = document.getElementById("error_txt_customer");
    let error_label_massnahmen = document.getElementById("error_txt_massnahmen");
    
    let error_text = "";

    if(error_label_customer.textContent != "" && error_label_massnahmen.textContent != ""){
        error_text = "Kundenart und Maßnahmen";
    }else if(error_label_customer.textContent == "" && error_label_massnahmen.textContent != ""){
        error_text = "Maßnahmen"
    }else if(error_label_customer.textContent != "" && error_label_massnahmen.textContent == ""){
        error_text = "Kundenart"
    }

    setGeneralErrorText("Fehler bei Auswahl für " + error_text);
}

function removeGeneralError() {
    setGeneralErrorText("");
}

function setCustomerError(){
    setCustomerErrorText("Eine Kundenart muss ausgewählt werden!");
    updateGeneralErrorText();
}

function setMassnahmenError(){
    setMassnahmenErrorText("Mindestens eine Massnahme muss ausgewählt werden!");
    updateGeneralErrorText();
}

function removeCustomerError(){
    setCustomerErrorText("");
}

function removeMassnahmenError(){
    setMassnahmenErrorText("");
}

function submitConsultation(){
    removeCustomerError();
    removeMassnahmenError();
    removeGeneralError();
    let checkedMassnahmen = getCheckedCategories();        
    checkedMassnahmen.sort(function(a, b){return a - b}); 

    let private_cb = document.getElementById('customertype_private');
    let company_cb = document.getElementById('customertype_company');

    if(private_cb.checked){
        this.customerType = CUSTOMER_TYPE.PRIVATE;
    }else if(company_cb.checked){
        this.customerType = CUSTOMER_TYPE.COMPANY;
    }else{
        this.customerType = CUSTOMER_TYPE.NOT_DEFINED;
    }

    if(checkError(this.customerType, checkedMassnahmen)) return;

    let m = new Massnahmen(checkedMassnahmen, customerType);

    fetch('../json/massnahmen.json')
    .then(response => response.json())
    .then(data => processInput(data, m))
}

function checkError(customerType, checkedMassnahmen){
    let error = false;
    if(customerType == CUSTOMER_TYPE.NOT_DEFINED){
        setCustomerError();
        error = true;
    }
    if(checkedMassnahmen.length == 0){
        setMassnahmenError();
        error = true;
    }

    return error;
    
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
    let error_msg = "Keine Fördermaßnahmen gefunden!";
    clearTable(table);
    if(massnahmen.length == 0){
        let row = table.insertRow();
        let no_massnahmen_found = row.insertCell();
        no_massnahmen_found.innerHTML = error_msg;
        setGeneralErrorText(error_msg);
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