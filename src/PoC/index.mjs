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


//Funciones para registrar usuario POST (Solo va haciéndolo con el debugger)
const loginButton = document.querySelector("#logIn");

async function newUser(url, data) {
    const responses = await fetch(
        url + "/login/",
        {
            method: 'POST',
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
}

function newUserHandler(ev) {
    ev.preventDefault();
    let user = document.querySelector("#usuario");
    let pass = document.querySelector("#password");
    let datafail = { userName: user.value, password: pass.value };
    const data = JSON.stringify(datafail);
    newUser(host, data);

}
loginButton.addEventListener("click", newUserHandler);


/**
 * Create authorization token
 */

const crearToken = document.querySelector("#crearToken");
let id = document.querySelector("#id");
let secret = document.querySelector("#password2")
const htmlGetTokens = document.querySelector("#getTokens");

function authToken(id, secret) {

    // En autenticación Basic, usuario y contraseña se separan con ':'
    const authToken = `${id}:${secret}`;
    // Y se codifican en Base64
    const base64token = btoa(authToken);
    console.log(base64token);
    return `Basic ${base64token}`;
}

function newAuthoHandler(ev){
    ev.preventDefault();
    htmlGetTokens.innerText= authToken(id, secret);

}

crearToken.addEventListener("click",newAuthoHandler);

/**
 * GET con autenticación
 */

 const token = authToken(id,secret);
 //authGet(url+"/messages/", token);

 async function authGet(url, token) {
    const response = await fetch(
        url,
        { 
            headers: {
                Authorization: token
            }
        }
    );
    const data = await response.json();
    return data;
}