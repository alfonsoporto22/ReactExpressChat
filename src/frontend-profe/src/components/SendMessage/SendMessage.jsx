import { useContext, useState } from "react"
import { Context } from "../../storage/SharedStorage"
import { authPost, authToken, API_URL } from "../../aux_api"

function SendMessage () {

    const [ store,  ] = useContext(Context);
    const { id, password } = store;

    const [ message, setMessage ] = useState("")

    function changeMessageHandler ( event ) {
        setMessage(event.target.value);
    }

    function clickHandler () {
        const token = authToken(id, password);
        const data = JSON.stringify({content: message});
        authPost(API_URL+"/message/",token,data);
    }

    return (
        <>
            <h3>Manda tus cosas...</h3>
            <input onChange={changeMessageHandler} type="text" value={message}/>
            <button onClick={clickHandler}>Mandar</button>
        </>
    )
}

export default SendMessage