
var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");

var submitBut = document.querySelector(".item .submit");


var bookContainer = [];

if (localStorage.getItem("Book") != null) {
    bookContainer = JSON.parse(localStorage.getItem("Book"));
    displayData(bookContainer);
}


function addBook() {
    book = {
        name: siteName.value,
        url: siteUrl.value,
    };
    if (validateUrl(siteUrl.value) == true && validateName(siteName.value) == true) {
        if (book.url.includes("https://") == false) {
            book.url = "https://" + siteUrl.value;
            bookContainer.push(book);
            localStorage.setItem("Book", JSON.stringify(bookContainer));
            displayData(bookContainer);
            clearData();
        } else {
            bookContainer.push(book);
            localStorage.setItem("Book", JSON.stringify(bookContainer));
            displayData(bookContainer);
            clearData();
        }
    } else {
        if (validateUrl(siteUrl.value) == false) {
            if (siteUrl.value == "") {
                document.querySelector(".form-group .erorr2").innerHTML ="Url Field is required";
                document.querySelector(".form-group .erorr2").classList.replace("d-none", "d-block");
                siteUrl.addEventListener("input", function () {
                    document.querySelector(".form-group .erorr2").classList.replace("d-block", "d-none");
                })
            }
            else {
                document.querySelector(".form-group .erorr2").innerHTML ="Url Field is wrong";
                document.querySelector(".form-group .erorr2").classList.replace("d-none", "d-block");
                siteUrl.addEventListener("input", function () {
                    document.querySelector(".form-group .erorr2").classList.replace("d-block", "d-none");
                })
            }
        }
        if (validateName(siteName.value) == false) {
            if (siteName.value == "") {
                document.querySelector(".form-group .erorr1").innerHTML="Name is required";
                document.querySelector(".form-group .erorr1").classList.replace("d-none", "d-block");
                siteName.addEventListener("input", function () {
                    document.querySelector(".form-group .erorr1").classList.replace("d-block", "d-none");
                })
            } else {
                document.querySelector(".form-group .erorr1").innerHTML="Name is wrong";
                document.querySelector(".form-group .erorr1").classList.replace("d-none", "d-block");
                siteName.addEventListener("input", function () {
                    document.querySelector(".form-group .erorr1").classList.replace("d-block", "d-none");
                })
            }
        }
    }
}




function clearData() {
    siteName.value = " ";
    siteUrl.value = " ";
}

function displayData(bookContainer) {
    var cartonat = "";
    for (var i = 0; i < bookContainer.length; i++) {
        cartonat += `
            <div class="data d-flex flex-row align-items-center mt-3 p-3">
                <div class="w-25 mb-2">
                    <h2>${bookContainer[i].name}</h2>
                </div>
                <div class="w-75 mb-2">
                    <a href="${bookContainer[i].url}" class="link btn btn-primary" target="-blank">Visite</a>
                    <button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button>
                </div>
            </div>    
        `;
    }
    document.getElementById("data").innerHTML = cartonat;
}



function deleteBook(index) {
    bookContainer.splice(index, 1);
    displayData(bookContainer);
    localStorage.setItem("Book", JSON.stringify(bookContainer));
}

function validateUrl(url) {
    regExp = /^(https:\/\/)?(www|mail|drive){1}\.\w{1,}\.(com|net|org|gov|co|ca){1}(\/)?.{1,}$/;
    return regExp.test(url);
}


function validateName(name) {
    regExp = /^\w{1,}$/;
    return regExp.test(name);
}

submitBut.addEventListener("click", function () {
    addBook();
})

