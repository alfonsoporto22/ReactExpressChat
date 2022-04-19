import { useContext } from "react";
import { Context } from "../../storage/SharedStorage";

function Logout () {

    const [ store, setStore ] = useContext(Context);

    function clickHandler () {
        const newStore = {...store};
        newStore.id = 0;
        setStore(newStore);
    }

    return(
        <button onClick={clickHandler}>Salir</button>
    )
}

export default Logout