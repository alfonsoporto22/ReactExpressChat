import { useContext, useEffect } from 'react';
import { Context } from './storage/SharedStorage';
import SignUp from './components/SignUp/SignUp';
import './App.css';
import Chat from './views/Chat/Chat';
import { Route, Routes, useNavigate } from 'react-router-dom';



function App() {

  const [ store ] = useContext(Context);
  const navigate = useNavigate();

  useEffect(
    ()=>{
      if (store.id !== 0) {
        navigate("/chat/")
      } else {
        navigate("/signup/")
      }
    },
    [store]
  )

  return (
    <div className={"flexColumn"}>
      <h1>Chat</h1>
      <Routes>
        <Route path='/chat/' element={<Chat/>}/>
        <Route path='/signup/' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
