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
    let dataTaken = { userName: user.value, password: pass.value };
    const data = JSON.stringify(dataTaken);
    newUser(host, data);

}
loginButton.addEventListener("click", newUserHandler);


/**
 * Create authorization token
 */

const crearToken = document.querySelector("#crearToken");
let id = document.querySelector("#id");
let secret = document.querySelector("#secret")
const htmlGetTokens = document.querySelector("#getTokens");

function authToken(id, secret) {

    // En autenticación Basic, usuario y contraseña se separan con ':'
    const authToken = `${id}:${secret}`;
    // Y se codifican en Base64
    const base64token = btoa(authToken);
    console.log(base64token);
    return `Basic ${base64token}`;
}

function newAuthoHandler(ev) {
    ev.preventDefault();
    htmlGetTokens.innerText = authToken(id, secret);
}

crearToken.addEventListener("click", newAuthoHandler);

/**
 * GET con autenticación
 */

const htmlGetTokensMessages = document.querySelector("#htmlGetTokensMessages");
const botonGetMensajes = document.querySelector("#getMensajes");


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
function newAuthoGetHandler(ev) {
    const token = authToken(id.value, secret.value);
    authGet(host + "/messages/", token).then(
        data => htmlGetTokensMessages.innerHTML = JSON.stringify(data)
    )

}

botonGetMensajes.addEventListener("click", newAuthoGetHandler);

/**
 * POST con autenticación
 */

const postMensaje = document.querySelector("#postMensaje");
const botonPostMensajes = document.querySelector("#botonPostMensajes");

async function authPost(url, token, data) {
    const response = await fetch(
        url,
        {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }
    );
    const responseData = await response.json();
    return responseData;
}

function newMessageHandler(ev) {
    const token = authToken(id.value, secret.value);
    let data = JSON.stringify({content: postMensaje.value});
    authPost(host+"/message/", token, data);

}
botonPostMensajes.addEventListener("click", newMessageHandler);