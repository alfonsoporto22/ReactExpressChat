import { useContext, useEffect, useRef, useState } from "react";
import { authGet, authToken, API_URL } from "../../aux_api";
import { Context } from "../../storage/SharedStorage";
import { REFRESH_INTERVAL } from "../../defines";

import styles from "./messages.module.css";

function Messages () {

    const [ store, ] = useContext(Context);
    const { id, password } = store;

    const [ messages, setMessages ] = useState([<li key="0">No tienes mensajes</li>]);
    const interval = useRef(0);

    function buildClasses ( item ) {
        //const messageStyles = (item.source === id ? styles.myMessage : "") + " " + styles.message ;
        return `${item.source === id ? styles.myMessage : ""} ${styles.message}`;
    }
    
    async function getMessages () {
        const newToken = authToken(id, password);
        const newMessagesObjects = await authGet(API_URL+"/messages/",newToken);
        const newMessages = newMessagesObjects.map(
            item => <li className={ buildClasses(item) } key={item.time}>{item.time} {item.content} {item.source}</li>
        )
        setMessages(newMessages);
    }

    useEffect(
        ()=>{
            if (interval.current !== 0 ) {
                clearInterval(interval.current);
            } else {
                getMessages();
            }
            interval.current = setInterval(getMessages,REFRESH_INTERVAL);
        },
        []
    )

    return (
        <>
            <h3>Mensajes</h3>
            <ul className={styles.messagesContainer + " flexColumn"}>
                {messages}
            </ul>
        </>
    )
}

export default Messages