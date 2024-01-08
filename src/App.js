import logo from './logo.svg';
import { unstable_HistoryRouter } from 'react-router-dom';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { connectWallet, walletaddress, connect } from './features/pinksale/pinksaleSlice'
import { loadWeb3 } from './connectivity/connectivity';
import Modal_connect from './component/Modal_connect/Modal_connect';
import Token from './component/Token_pink/Token';
import { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Head from './component/Head/Head';
import Lockinfo from './component/Lock_detail/Lockinfo';
import Lockin from './component/Lock_in/Lockin';
import Mylockin from './component/Mylockin/Mylockin';
import Canvas from './component/Canvas/Canvas';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const walletaddress = useSelector((state) => state.pinksale.walletaddress)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(connectWallet())
  }, []);

  return (
    <div className="App ">
      <BrowserRouter>
        <ToastContainer></ToastContainer>
        <Head />
        {/* <Modal_connect/> */}
        {/* <Canvas/> */}
        {/* <Routes>
        <Route path="/Creatlock" element={<Creatlock/>}> </Route>
        <Route path="/Token" element={<Token />}> </Route>
        <Route path="/Lockinfo" element={<Lockinfo />}> </Route>
        <Route path="/Lockin" element={<Lockin />}> </Route>
        <Route path="/Mylockin" element={<Mylockin />}> </Route>
        
      </Routes> */}
      </BrowserRouter>
      {/*     
      <Creatlock />/ */}
      {/* <Token/> */}
      {/* <Lockinfo/> */}
      {/* <Lockin/> */}
      {/* <div>
        <div>
          <button
            aria-label="Connect Wallet"
            onClick={() => dispatch(connectWallet())}
          >
            connect Wallet
          </button>
          <h1>{walletaddress}</h1>

        </div>
      </div> */}
    </div>
  );
}

export default App;
