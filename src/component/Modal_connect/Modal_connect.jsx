import React, { useState, useEffect } from "react";
import "./Modal_connect.css"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import mata from "../Assets/mata mask.svg";
import mata1 from "../Assets/trust.svg";
import mata2 from "../Assets/wallet.svg";
import mata3 from "../Assets/coinbase.png";
import mata4 from "../Assets/safepal.jpg";
import mata5 from "../Assets/token.png";
import mata6 from "../Assets/PinkSales Ellipes.png";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from 'react-icons/ai';
import mata7 from "../Assets/install.png";
import { connectWallet } from "../../features/pinksale/pinksaleSlice";
function Modal_connect() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [showconnect, setShowConnect] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const walletaddress = useSelector((state) => state.pinksale.walletaddress);
  useEffect(() => {
    if (walletaddress.length > 20) {
      setShowConnect(true);
    } else if (walletaddress == "Wrong Network") {
      setShowConnect(false);
    } else if (walletaddress == "No Wallet") {
      setShowConnect(false);
    }
  }, [walletaddress]);

  return (
    <div className="model_flex">
      <Button
        variant=""
        className="font_size_connect max_btn_color"
        onClick={handleShow}
      >
        {showconnect ? (
          <div>{`${walletaddress.slice(0, 6)} ...${walletaddress.slice(
            walletaddress.length - 6
          )}`}</div>
        ) : (
          "Connect"
        )}
      </Button>

      <Modal show={show} onHide={handleClose}>
        
        <Modal.Header  className="color_of_back_ground">
          <Modal.Title className="model_tital_bnb ">
            {" "}
            Connect to a wallet
          </Modal.Title>
          <AiOutlineClose className="fs-4 pointer_click" onClick={handleClose}/>
        </Modal.Header>
        <Modal.Body className="color_of_back_ground">
          <div className="container text-center ">
            <div className="row pt-3">
              <div
                className="col-6 mata_hover"
                onClick={() => {
                  dispatch(connectWallet());
                  handleClose();
                }}
              >
                <div>
                  <img src={mata} width="15%" className="mata_img" alt="" />
                </div>
                <p className="mata_text">MataMask</p>
              </div>
              <div className="col-6 mata_hover">
                <div>
                  <img src={mata1} width="15%" className="mata_img" alt="" />
                </div>
                <p className="mata_text">TrustWallet</p>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6 mata_hover">
                <div>
                  <img src={mata2} width="15%" className="mata_img" alt="" />
                </div>
                <p className="mata_text">WalletConnect</p>
              </div>
              <div className="col-6 mata_hover">
                <div>
                  <img src={mata3} width="15%" className="mata_img" alt="" />
                </div>
                <p className="mata_text">Coinbase Wallet</p>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6 mata_hover">
                <div>
                  <img src={mata4} width="15%" className="mata_img" alt="" />
                </div>
                <p className="mata_text">SafePal Wallet</p>
              </div>
              <div className="col-6 mata_hover">
                <div>
                  <img src={mata5} width="15%" className="mata_img" alt="" />
                </div>
                <p className="mata_text">TokenPocket</p>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6 mata_hover">
                <div>
                  <img src={mata6} width="15%" className="mata_img" alt="" />
                </div>
                <p className="mata_text">Math Wallet</p>
              </div>
              <div className="col-6 mata_hover">
                <div>
                  <img src={mata7} width="15%" className="mata_img" alt="" />
                </div>
                <p className="mata_text">Install BitKeep</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Modal_connect;
