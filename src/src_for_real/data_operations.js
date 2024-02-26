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