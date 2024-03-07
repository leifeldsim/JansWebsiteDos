function createLinkHTMLElement(link){
    var innerLink = document.createElement("a");
    innerLink.href = link;
    innerLink.target = "_blank";
    innerLink.text = link;
    return innerLink;
}

function clearTable(table){
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}

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
    const height = navbar.clientHeight;

    console.log(height);
    // Get the root element
    var root = document.documentElement;
    // Set the value of the --color-font-general variable to #000000
    root.style.setProperty('--navbar-height', height + "px");

}