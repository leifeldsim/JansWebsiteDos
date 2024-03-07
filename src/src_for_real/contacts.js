this.contacts = [];
this.defaultPicture = "../pictures/default.jpg"

function loadContactList(data){
    for (let i = 0; i < Object.keys(data.contacts).length; i++) {
        this.contacts.push(data.contacts[i]);
    }
    addContactsToSite();

    updateNavbarHeight();
}

function loadContacts(){
    fetch('../json/contacts.json')
    .then(response => response.json())
    .then(data => loadContactList(data))
}

function addContactsToSite(){
    let temp_trenner = ""; //TODO delete
    for(let i = 0; i < this.contacts.length; i++){
        var iDiv = document.createElement('div');
        iDiv.className = "contact_block";
        
        var pictureAndDataDiv = document.createElement('div');
        pictureAndDataDiv.className = "picture_block";

        var dataDiv = document.createElement('div');
        dataDiv.className = "data_block";

        let curr_contacts = this.contacts[i];
        var innerDiv = document.createElement('h4');
        innerDiv.innerText = curr_contacts.name + temp_trenner;
    
        var age = document.createElement('p');
        age.innerText = "Alter: " + curr_contacts.age + temp_trenner;

        var career = document.createElement('p');
        career.innerText = "Werdegang: " + curr_contacts.career + temp_trenner;
    
        var phone_number = document.createElement('p');
        phone_number.innerText = "Tel-Nr.: " + curr_contacts.phone_number + temp_trenner;

        var e_mail = document.createElement('p');
        e_mail.innerText = "E-Mail: " + curr_contacts.e_mail + temp_trenner;

        var pictures = document.createElement('img');
        var pictureFile = curr_contacts.pictures;

        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', pictureFile, false);
        xhr.send();
        console.log(xhr.status);
        console.log(pictureFile);
        if(xhr.status == "404"){
            pictureFile = this.defaultPicture;
        }

        pictures.setAttribute("src", pictureFile);
        pictures.setAttribute("height", "400");
        pictures.setAttribute("width", "300");

        var additional_info = document.createElement('p');
        additional_info.innerText = "Zusätzliche Infos: " + curr_contacts.additional_info + temp_trenner;
    
        dataDiv.appendChild(innerDiv);
        dataDiv.appendChild(age);
        dataDiv.appendChild(career);
        dataDiv.appendChild(phone_number);
        dataDiv.appendChild(e_mail);
        dataDiv.appendChild(additional_info);
        pictureAndDataDiv.appendChild(pictures);
        pictureAndDataDiv.appendChild(dataDiv);
        iDiv.appendChild(pictureAndDataDiv);
        
        document.getElementById("contact_list").appendChild(iDiv);
    }    
}

loadContacts();