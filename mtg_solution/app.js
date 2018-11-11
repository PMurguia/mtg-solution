let boton = document.getElementById('search_btn');
if (boton !== null) {
    boton.addEventListener('click', searchCard);
}


function searchCard() {
    let cards = [];
    let name = document.getElementById('name').value;
    let cmc = document.getElementById('cmc').value;
    let colorIdentity = document.getElementById('colorIdentity').value;
    let type = document.getElementById('type').value;
    let url = "https://api.magicthegathering.io/v1/cards?";
    let xhr = new XMLHttpRequest();
    if (name !== "" && cmc !== "" && colorIdentity !== "" && type !== "") {
        xhr.open("GET", url + "name=" + name + "&cmc=" + cmc + "&colorIdentity=" + colorIdentity + "&type=" + type);
    }
    if (name === "" && cmc === "" && colorIdentity === "" && type === "") {
        xhr.open("GET", url);
    }
    else if (name !== "" && cmc !== "" && colorIdentity !== "") {
        xhr.open("GET", url + "name=" + name + "&cmc=" + cmc + "&colorIdentity=" + colorIdentity + "&type=" + type);
    }
    else if (name !== "" && cmc !== "" && type !== "") {
        xhr.open("GET", url + "name=" + name + "&cmc=" + cmc + "&type=" + type);
    }
    else if (name !== "" && colorIdentity !== "" && type !== "") {
        xhr.open("GET", url + "name=" + name + "&colorIdentity=" + colorIdentity + "&type=" + type);
    }
    else if (cmc !== "" && colorIdentity !== "" && type !== "") {
        xhr.open("GET", url + "cmc=" + cmc + "&colorIdentity=" + colorIdentity + "&type=" + type);
    }
    else if (name !== "" && cmc !== "") {
        xhr.open("GET", url + "name=" + name + "&cmc=" + cmc)
    }
    else if (name !== "" && colorIdentity !== "") {
        xhr.open("GET", url + "name=" + name + "&colorIdentity=" + colorIdentity)
    }
    else if (name !== "" && type !== "") {
        xhr.open("GET", url + "name=" + name + "&type=" + type)
    }
    else if (cmc !== "" && colorIdentity !== "") {
        xhr.open("GET", url + "cmc=" + cmc + "&colorIdentity=" + colorIdentity)
    }
    else if (cmc !== "" && type !== "") {
        xhr.open("GET", url + "cmc=" + cmc + "&type=" + type)
    }
    else if (colorIdentity !== "" && type !== "") {
        xhr.open("GET", url + "colorIdentity=" + colorIdentity + "&type=" + type)
    }
    else if (name !== "") {
        xhr.open("GET", url + "name=" + name)
    }
    else if (cmc !== "") {
        xhr.open("GET", url + "cmc=" + cmc)
    }
    else if (colorIdentity !== "") {
        xhr.open("GET", url + "colorIdentity=" + colorIdentity)
    }
    else if (type !== "") {
        xhr.open("GET", url + "type=" + type)
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let responseObject = JSON.parse(xhr.response).cards;
        if (responseObject === []) {
            alert("No existe una carta con esas características. Prueba otra vez. ");
        }
            for (let i = 0; i < responseObject.length; i++) {
                if ('layout' in responseObject[i] !== 'plane') {
                    if ('imageUrl' in responseObject[i]) {

                        cards.push("<img src='" + responseObject[i].imageUrl + "'/>");
                    }

                }
            }
        }
        document.getElementById('cardImage').innerHTML = cards;
    };
    xhr.send();
}
