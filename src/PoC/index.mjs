const host = "https://web-develop-react-express-chat.herokuapp.com"
const htmlGetUsers = document.querySelector("#getUsers");
const htmlUpdateButton = document.querySelector("#updateButton");

//Funciones para coger usuarios GET
async function get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getUsers() {
    const users = await get(host + "/users/");
    htmlGetUsers.innerText = JSON.stringify(users);
};

function updateButtonClickHandler() {
    getUsers();
}

htmlUpdateButton.addEventListener("click", updateButtonClickHandler)


//Funciones para registrar usuario POST
let userLogin = document.querySelector("#usuario").value;
let passwordLogin = document.querySelector("#password").value;
let loginButton = document.querySelector("#logIn");

let data = JSON.stringify({ userName: userLogin, password: passwordLogin });

async function post(url, data) {
    const response = await fetch(
        url,
        {
            method: 'POST',
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    const responseData = await response.json();
    return responseData;
}

function loginButtonClickHandler() {
    post(host + "/login/", data);
}


loginButton.addEventListener("click", takeValues);
loginButton.addEventListener("click", loginButtonClickHandler);

function takeValues() {
    userLogin = document.querySelector("#usuario").value;
    passwordLogin = document.querySelector("#password").value;
    data = JSON.stringify({ userName: userLogin, password: passwordLogin });
}