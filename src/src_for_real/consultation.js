const CUSTOMER_TYPE = {
    PRIVATE: "Privat",
    COMPANY: "Unternehmen",
    NOT_DEFINED: "Keine Angabe"
};

const MASSNAHMEN_ART_PRIVATE = {
    BUILDING: "Gebäude",
    OUTSIDE: "Außenbereich",
    OTHER: "Sonstige"
}

const MASSNAHMEN_ART_COMPANY = {
    BUILDING: "Gebäude",
    OUTSIDE: "Prozesse",
    OTHER: "Sonstige"
}

const MASSNAHMEN_ART_PRIVATE_JSON = {
    BUILDING: MASSNAHMEN_ART_PRIVATE.BUILDING + "_Privat",
    OUTSIDE: MASSNAHMEN_ART_PRIVATE.OUTSIDE + "_Privat",
    OTHER: MASSNAHMEN_ART_PRIVATE.OTHER + "_Privat",
}

const MASSNAHMEN_ART_COMPANY_JSON = {
    BUILDING: MASSNAHMEN_ART_COMPANY.BUILDING + "_Unternehmen",
    OUTSIDE: MASSNAHMEN_ART_COMPANY.OUTSIDE + "_Unternehmen",
    OTHER: MASSNAHMEN_ART_COMPANY.OTHER + "_Unternehmen",
}

//------------------------------------------------
//Build Website and set Default Values
this.customerType = CUSTOMER_TYPE.COMPANY;
const SHOW_MORE = "Mehr anzeigen...";
const SHOW_LESS = "Weniger anzeigen...";

this.companyMassnahmenSonstige;
this.companyMassnahmenAussenbereich;
this.companyMassnahmenGebaude;

this.privateMassnahmenSonstige;
this.privateMassnahmenAussenbereich;
this.privateMassnahmenGebaude;

setDefaultValues();

function addMassnahmen(data){
    let massnahmen_art;
    if(this.customerType == CUSTOMER_TYPE.COMPANY){
        massnahmen_art = MASSNAHMEN_ART_COMPANY_JSON;
    }else{
        massnahmen_art = MASSNAHMEN_ART_PRIVATE_JSON;
    }
    for (let i = 1; i <= Object.keys(data).length; i++) {
        for(let j = 0; j < data[i].type.length; j++){
            addCheckboxes(data[i], i, data[i].type[j], massnahmen_art);
        }
    }    
    
}

function updateMassnahmenToPrivate(){
    let div = document.getElementById("cb_massnahmen_typ_gebaeude");
    div.replaceWith(this.privateMassnahmenGebaude);
    let div2 = document.getElementById("cb_massnahmen_typ_aussenbereich");
    div2.replaceWith(this.privateMassnahmenAussenbereich);
    let div3 = document.getElementById("cb_massnahmen_typ_sonstige");
    div3.replaceWith(this.privateMassnahmenSonstige);
}

function updateMassnahmenToCompany(){
    let div = document.getElementById("cb_massnahmen_typ_gebaeude");
    div.replaceWith(this.companyMassnahmenGebaude);
    let div2 = document.getElementById("cb_massnahmen_typ_aussenbereich");
    div2.replaceWith(this.companyMassnahmenAussenbereich);
    let div3 = document.getElementById("cb_massnahmen_typ_sonstige");
    div3.replaceWith(this.companyMassnahmenSonstige);
}

function fillAllDivs(data){
    let massnahmen_type;
    
    this.privateMassnahmenGebaude = document.createElement("div");
    this.privateMassnahmenGebaude.id = "cb_massnahmen_typ_gebaeude";
    this.privateMassnahmenGebaude.className = "checkboxes";

    this.privateMassnahmenAussenbereich = document.createElement("div");
    this.privateMassnahmenAussenbereich.id = "cb_massnahmen_typ_aussenbereich";
    this.privateMassnahmenAussenbereich.className = "checkboxes";

    this.privateMassnahmenSonstige = document.createElement("div");
    this.privateMassnahmenSonstige.id = "cb_massnahmen_typ_sonstige";
    this.privateMassnahmenSonstige.className = "checkboxes";
    

    this.companyMassnahmenGebaude = document.createElement("div");
    this.companyMassnahmenGebaude.id = "cb_massnahmen_typ_gebaeude";
    this.companyMassnahmenGebaude.className = "checkboxes";

    this.companyMassnahmenAussenbereich = document.createElement("div");
    this.companyMassnahmenAussenbereich.id = "cb_massnahmen_typ_aussenbereich";
    this.companyMassnahmenAussenbereich.className = "checkboxes";

    this.companyMassnahmenSonstige = document.createElement("div");
    this.companyMassnahmenSonstige.id = "cb_massnahmen_typ_sonstige";
    this.companyMassnahmenSonstige.className = "checkboxes";

    for (let i = 1; i <= Object.keys(data).length; i++) {
        for(let j = 0; j < data[i].type.length; j++){
            
            massnahmen_type = data[i].type[j];

            if(massnahmen_type == MASSNAHMEN_ART_PRIVATE_JSON.BUILDING){

                this.privateMassnahmenSonstige.appendChild(createCheckbox(data[i], i, this.privateMassnahmenSonstige.childElementCount));

            }else if(massnahmen_type == MASSNAHMEN_ART_PRIVATE_JSON.OUTSIDE){

                this.privateMassnahmenAussenbereich.appendChild(createCheckbox(data[i], i, this.privateMassnahmenAussenbereich.childElementCount));

            }else if(massnahmen_type == MASSNAHMEN_ART_PRIVATE_JSON.OTHER){

                this.privateMassnahmenGebaude.appendChild(createCheckbox(data[i], i, this.privateMassnahmenGebaude.childElementCount));

            }else if(massnahmen_type == MASSNAHMEN_ART_COMPANY_JSON.BUILDING){

                this.companyMassnahmenGebaude.appendChild(createCheckbox(data[i], i, this.companyMassnahmenGebaude.childElementCount));

            }else if(massnahmen_type == MASSNAHMEN_ART_COMPANY_JSON.OUTSIDE){

                this.companyMassnahmenAussenbereich.appendChild(createCheckbox(data[i], i, this.companyMassnahmenAussenbereich.childElementCount));

            }else if(massnahmen_type == MASSNAHMEN_ART_COMPANY_JSON.OTHER){

                this.companyMassnahmenSonstige.appendChild(createCheckbox(data[i], i, this.companyMassnahmenSonstige.childElementCount));

            }else{
                console.log("Hier stimmt was nicht");
            }
        }
    }   

    addShowMoreButton(this.companyMassnahmenSonstige);
    addShowMoreButton(this.companyMassnahmenAussenbereich);
    addShowMoreButton(this.companyMassnahmenGebaude);
    addShowMoreButton(this.privateMassnahmenSonstige);
    addShowMoreButton(this.privateMassnahmenAussenbereich);
    addShowMoreButton(this.privateMassnahmenGebaude);
}

function fillConstList(data) {
    fillAllDivs(data);
    updateNavbarHeight();

    document.getElementById("customertype_private").addEventListener("click", function(){
        if(!this.checked){
            return;
        }
        removeCustomerError()
        loadMassnahmenHeader(MASSNAHMEN_ART_PRIVATE);
        updateMassnahmenToPrivate();
        addEventListenerForShowMoreExpansion();
    });

    document.getElementById("customertype_company").addEventListener("click", function(){
        if(!this.checked){
            return;
        }
        removeCustomerError()
        loadMassnahmenHeader(MASSNAHMEN_ART_COMPANY);
        updateMassnahmenToCompany();
        addEventListenerForShowMoreExpansion();
    });
}

function uncheckAllCBs(){
    const cb_divs = [document.getElementById("cb_massnahmen_typ_gebaeude_private"), 
        document.getElementById("cb_massnahmen_typ_aussenbereich_private"), 
        document.getElementById("cb_massnahmen_typ_sonstige_private"), 
        document.getElementById("cb_massnahmen_typ_gebaeude_company"), 
        document.getElementById("cb_massnahmen_typ_aussenbereich_company"), 
        document.getElementById("cb_massnahmen_typ_sonstige_company")];
    
    let cb_div;

    for(let j = 0; j < cb_divs.length; j++){
        cb_div = cb_divs[j];
        for(let i = 0; i < cb_div.childElementCount; i++){
            cb_div.children[i].childNodes[0].checked = false;
        }
    }    
}

function loadMassnahmenHeader(massnahmen_art){
    document.getElementById("cb_massnahmen_typ_gebaeude_header").innerHTML = massnahmen_art.BUILDING;
    document.getElementById("cb_massnahmen_typ_aussenbereich_header").innerText = massnahmen_art.OUTSIDE;
    document.getElementById("cb_massnahmen_typ_sonstige_header").innerText = massnahmen_art.OTHER;
}

function addShowMoreButton(div){
    var expandclick = document.createElement("a");
    expandclick.className = "collapsible_massnahmen";
    expandclick.innerHTML = SHOW_MORE;
    div.appendChild(expandclick);
}

function addEventListenerForShowMoreExpansion(){
    var coll = document.getElementsByClassName("collapsible_massnahmen");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            console.log("click");
            this.classList.toggle("active");
            let cbs = getContentCheckboxes(this);
            for(let j = 0; j < cbs.length; j++){
                if (cbs[j].style.display === "block") {
                    cbs[j].style.display = "none";
                } else {
                    cbs[j].style.display = "block";
                }
            }
            if(this.textContent == SHOW_MORE){
                this.textContent = SHOW_LESS;
            }else if(this.textContent == SHOW_LESS){
                this.textContent = SHOW_MORE;
            }
        });
    } 
}

function getContentCheckboxes(element){
    const parent = element.parentElement;
    let content_checkboxes = [];
    for(let i = 0; i < parent.childElementCount; i++){
        if(parent.childNodes[i].className.includes("content_massnahmen")){
            content_checkboxes.push(parent.childNodes[i]);
        }
    }
    return content_checkboxes;
}

function setDefaultValues(){
    fetch('../json/kategorien.json')
    .then(response => response.json())
    .then(data => fillConstList(data));
}

function createCheckbox(massnahme, index, childCount){
    // Create the inner div before appending to the body
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

    if(childCount > 4){
        label.className += " content_massnahmen";
        label.style.display = "none";
    }

    return label;
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
    const cb_divs = [document.getElementById("cb_massnahmen_typ_gebaeude"), 
        document.getElementById("cb_massnahmen_typ_aussenbereich"), 
        document.getElementById("cb_massnahmen_typ_sonstige")];
    
    let cb_div;

    for(let j = 0; j < cb_divs.length; j++){
        cb_div = cb_divs[j];
        for(let i = 0; i < cb_div.childElementCount; i++){
            if(cb_div.children[i].childNodes[0].checked){
                let checkboxId = cb_div.children[i].childNodes[0].name.substring(CHECKBOX_ID_PREFIX.length)
                checkedMassnahmen.push(parseInt(checkboxId));
            }
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
    clearTable(document.getElementById("table_consultation"));
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