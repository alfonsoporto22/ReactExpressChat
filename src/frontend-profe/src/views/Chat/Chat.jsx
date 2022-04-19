import Logout from "../../components/Logout/Logout"
import Messages from "../../components/Messages/Messages"
import SendMessage from "../../components/SendMessage/SendMessage"

function Chat () {
    return (
        <>
            <h2>Estás chateando</h2>
            <SendMessage/>
            <Logout/>
            <Messages/>
        </>
    )
}

export default Chat