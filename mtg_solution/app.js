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
    let usedUrl = "";
    let xhr = new XMLHttpRequest();
    usedUrl = searchOptions(name, cmc, colorIdentity, type, xhr, usedUrl, url);
    let numPages = 1;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let responseObject = JSON.parse(xhr.response).cards;
            //let count = xhr.getResponseHeader('Count');
            let Count = xhr.getResponseHeader('Total-Count');
            let totalCount = Math.floor(parseInt(Count) / 100) + 1;
            if (responseObject.length === 0) {
                alert("No existe una carta con esas características. Prueba otra vez. ");
            }
            for (let i = 0; i < responseObject.length; i++) {
                if ('imageUrl' in responseObject[i]) {
                    cards.push("<img onmouseover= bigImg(this) onmouseout= normalImg(this) src='" + responseObject[i].imageUrl + "'/>");
                }
            }
            numPages++;
            if (numPages <= totalCount) {
                xhr.open("GET", usedUrl + "&page=" + numPages);
                xhr.send();
            } else {
                document.getElementById('cardImage').innerHTML = cards;

                localStorage.setItem('cards',JSON.stringify(cards));
               

            }
        }
    };
    xhr.send();
}
// Create default option "Go to..."
$("<option />", {
    "selected": "selected",
    "value": "",
    "text": "Go to..."
}).appendTo("div select");
$("div select").change(function () {
    window.location = $(this).find("option:selected").val();
});
function searchOptions(name, cmc, colorIdentity, type, xhr, usedUrl, url) {
    if (name !== "" && cmc !== "" && colorIdentity !== "" && type !== "") {
        xhr.open("GET", usedUrl = url + "name=" + name + "&cmc=" + cmc + "&colorIdentity=" + colorIdentity + "&type=" + type);
    }
    if (name === "" && cmc === "" && colorIdentity === "" && type === "") {
        xhr.open("GET", usedUrl = url);
    }
    else if (name !== "" && cmc !== "" && colorIdentity !== "") {
        xhr.open("GET", usedUrl = url + "name=" + name + "&cmc=" + cmc + "&colorIdentity=" + colorIdentity);
    }
    else if (name !== "" && cmc !== "" && type !== "") {
        xhr.open("GET", usedUrl = url + "name=" + name + "&cmc=" + cmc + "&type=" + type);
    }
    else if (name !== "" && colorIdentity !== "" && type !== "") {
        xhr.open("GET", usedUrl = url + "name=" + name + "&colorIdentity=" + colorIdentity + "&type=" + type);
    }
    else if (cmc !== "" && colorIdentity !== "" && type !== "") {
        xhr.open("GET", usedUrl = url + "cmc=" + cmc + "&colorIdentity=" + colorIdentity + "&type=" + type);
    }
    else if (name !== "" && cmc !== "") {
        xhr.open("GET", usedUrl = url + "name=" + name + "&cmc=" + cmc);
    }
    else if (name !== "" && colorIdentity !== "") {
        xhr.open("GET", usedUrl = url + "name=" + name + "&colorIdentity=" + colorIdentity);
    }
    else if (name !== "" && type !== "") {
        xhr.open("GET", usedUrl = url + "name=" + name + "&type=" + type);
    }
    else if (cmc !== "" && colorIdentity !== "") {
        xhr.open("GET", usedUrl = url + "cmc=" + cmc + "&colorIdentity=" + colorIdentity);
    }
    else if (cmc !== "" && type !== "") {
        xhr.open("GET", usedUrl = url + "cmc=" + cmc + "&type=" + type);
    }
    else if (colorIdentity !== "" && type !== "") {
        xhr.open("GET", usedUrl = url + "colorIdentity=" + colorIdentity + "&type=" + type);
    }
    else if (name !== "") {
        xhr.open("GET", usedUrl = url + "name=" + name);
    }
    else if (cmc !== "") {
        xhr.open("GET", usedUrl = url + "cmc=" + cmc);
    }
    else if (colorIdentity !== "") {
        xhr.open("GET", usedUrl = url + "colorIdentity=" + colorIdentity);
    }
    else if (type !== "") {
        xhr.open("GET", usedUrl = url + "type=" + type);
    }
    return usedUrl;
}
function bigImg(x) {
    x.style.width = "250px";
}
function normalImg(x) {
    x.style.width = "";
}


