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
const SHOW_MORE = "Mehr anzeigen";
const SHOW_LESS = "Weniger anzeigen";

setDefaultValues();

function fillConstList(data) {
    for (let i = 1; i <= Object.keys(data).length; i++) {
        for(let j = 0; j < data[i].type.length; j++){
            addCheckboxes(data[i], i, data[i].type[j]);
        }
    }

    addShowMoreButton(document.getElementById("cb_massnahmen_typ_gebaeude_private"));
    addShowMoreButton(document.getElementById("cb_massnahmen_typ_aussenbereich_private"));
    addShowMoreButton(document.getElementById("cb_massnahmen_typ_sonstige_private"));
    addShowMoreButton(document.getElementById("cb_massnahmen_typ_gebaeude_company"));
    addShowMoreButton(document.getElementById("cb_massnahmen_typ_aussenbereich_company"));
    addShowMoreButton(document.getElementById("cb_massnahmen_typ_sonstige_company"));

    updateNavbarHeight();
    addEventListenerForNewsExpansion();

    document.getElementById("customertype_private").addEventListener("click", function(){
        uncheckAllCBs();
        if(!this.checked){
            HideMassnahmen();
            document.getElementById("massnahmen_private").style.visibility = "hidden";
            return;
        }
        removeCustomerError()
        ShowMassnahmen();
        loadPrivateMassnahmenHeader();
        document.getElementById("massnahmen_company").style.visibility = "hidden";
        document.getElementById("massnahmen_private").style.visibility = "visible";
    });//ToDo make one function out of this
    document.getElementById("customertype_company").addEventListener("click", function(){
        uncheckAllCBs();
        if(!this.checked){
            HideMassnahmen();
            document.getElementById("massnahmen_company").style.visibility = "hidden";
            return;
        }
        removeCustomerError()
        ShowMassnahmen();
        loadCompanyMassnahmenHeader();
        document.getElementById("massnahmen_private").style.visibility = "hidden";
        document.getElementById("massnahmen_company").style.visibility = "visible";
        
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

function HideMassnahmen(){
    document.getElementById("cb_massnahmen").style.visibility = "hidden";
}


function ShowMassnahmen(){
    document.getElementById("cb_massnahmen").style.visibility = "visible";
}

function loadCompanyMassnahmenHeader(){
    document.getElementById("cb_massnahmen_typ_gebaeude_header_company").innerHTML = MASSNAHMEN_ART_COMPANY.BUILDING;
    document.getElementById("cb_massnahmen_typ_aussenbereich_header_company").innerText = MASSNAHMEN_ART_COMPANY.OUTSIDE;
    document.getElementById("cb_massnahmen_typ_sonstige_header_company").innerText = MASSNAHMEN_ART_COMPANY.OTHER;
}

function loadPrivateMassnahmenHeader(){
    document.getElementById("cb_massnahmen_typ_gebaeude_header_private").innerHTML = MASSNAHMEN_ART_PRIVATE.BUILDING;
    document.getElementById("cb_massnahmen_typ_aussenbereich_header_private").innerText = MASSNAHMEN_ART_PRIVATE.OUTSIDE;
    document.getElementById("cb_massnahmen_typ_sonstige_header_private").innerText = MASSNAHMEN_ART_PRIVATE.OTHER;
}

function addShowMoreButton(div){
    var expandclick = document.createElement("a");
    expandclick.className = "collapsible_massnahmen";
    expandclick.innerHTML = "Mehr anzeigen";
    div.appendChild(expandclick);
}

function addEventListenerForNewsExpansion(){
    var coll = document.getElementsByClassName("collapsible_massnahmen");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
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

function addCheckboxes(massnahme, index, massnahmen_type){    
    // Create the inner div before appending to the body
    let cb_element;
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
    if(massnahmen_type == MASSNAHMEN_ART_PRIVATE_JSON.BUILDING){
        cb_element = document.getElementById("cb_massnahmen_typ_gebaeude_private");
    }else if(massnahmen_type == MASSNAHMEN_ART_PRIVATE_JSON.OUTSIDE){
        cb_element = document.getElementById("cb_massnahmen_typ_aussenbereich_private");
    }else if(massnahmen_type == MASSNAHMEN_ART_PRIVATE_JSON.OTHER){
        cb_element = document.getElementById("cb_massnahmen_typ_sonstige_private");
    }else if(massnahmen_type == MASSNAHMEN_ART_COMPANY_JSON.BUILDING){
        cb_element = document.getElementById("cb_massnahmen_typ_gebaeude_company");
    }else if(massnahmen_type == MASSNAHMEN_ART_COMPANY_JSON.OUTSIDE){
        cb_element = document.getElementById("cb_massnahmen_typ_aussenbereich_company");
    }else if(massnahmen_type == MASSNAHMEN_ART_COMPANY_JSON.OTHER){
        cb_element = document.getElementById("cb_massnahmen_typ_sonstige_company");
    }

    if(cb_element.childElementCount > 4){
        label.className += " content_massnahmen";
        label.style.display = "none";
    }
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