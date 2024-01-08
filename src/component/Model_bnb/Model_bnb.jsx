import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import mata from "../Assets/mata mask.svg";
import mata1 from "../Assets/trust.svg";
import mata2 from "../Assets/wallet.svg";
import mata3 from "../Assets/coinbase.png";
import mata4 from "../Assets/safepal.jpg";
import mata5 from "../Assets/token.png";
import mata6 from "../Assets/math.png";
import mata7 from "../Assets/install.png";
import bnc1 from "../Assets/bnc-1.svg";
import bnc2 from "../Assets/bnb.png";
import bnc3 from "../Assets/matic.png";
import bnc4 from "../Assets/avalache.svg";
import bnc5 from "../Assets/Pinksales (1).png";
import bnc6 from "../Assets/PinkSales C (2).png";
import bnc7 from "../Assets/doge.png";
import { AiOutlineClose } from 'react-icons/ai';

function Modal_bnb() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="model_flex">
      <button className="btn button_nav text-dark me-2 d-flex align-items-center max_btn_color">
        {" "}
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 1024 1024"
          className="hide-on-mobile"
          height="18"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 0 0-11.3 0L266.3 586.7a8.03 8.03 0 0 0 0 11.3l39.5 39.7z"></path>
        </svg>
        <span className="font_size_eth">dexview.com</span>
      </button>
      <Button
        variant=""
        className="button_nav text-dark me-2 d-flex align-items-center max_btn_color"
        onClick={handleShow}
      >
        <img src={bnc1} className="pe-0 pe-md-1 img_width " alt="" />
        <span className="font_size_eth d-none d-md-flex text-uppercase">
          bsc testnet
        </span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header  className="color_of_back_ground">
          <Modal.Title className="model_tital_bnb">Choose network</Modal.Title>
          <AiOutlineClose className="fs-4 pointer_click" onClick={handleClose}/>
        </Modal.Header>
        <Modal.Body className="color_of_back_ground">
          <div className="container text-center">
            <div className="row pt-3 d-flex justify-content-between">
              <div className="col-6 border_main_ETH">
                <div className="">
                  <img src={bnc1} alt="" width="40px" />
                </div>
                <div>
                  <p className="">Ethereum</p>
                </div>
              </div>
              <div className="col-6 border_main_ETH">
                <div className="">
                  <img src={bnc2} alt="" width="40px" />
                </div>
                <div>
                  <p className="">BNB Smart Chain</p>
                </div>
              </div>
            </div>
            {/* second row  */}
            <div className="row pt-3 d-flex justify-content-between">
              <div className="col-6 border_main_ETH">
                <div className="">
                  <img src={bnc3} alt="" width="40px" />
                </div>
                <div>
                  <p className="">Matic(Polygon)</p>
                </div>
              </div>
              <div className="col-6 border_main_ETH">
                <div className="">
                  <img src={bnc4} alt="" width="40px" />
                </div>
                <div>
                  <p className="">Avalanche</p>
                </div>
              </div>
            </div>
            {/* third row  */}
            <div className="row pt-3 d-flex justify-content-between">
              <div className="col-6 border_main_ETH">
                <div className="">
                  <img src={bnc5} alt="" width="40px" />
                </div>
                <div>
                  <p className="">Fantom Opera</p>
                </div>
              </div>
              <div className="col-6 border_main_ETH">
                <div className="">
                  <img src={bnc6} alt="" width="40px" />
                </div>
                <div>
                  <p className="">Cronos</p>
                </div>
              </div>
            </div>
            {/* forth row */}
            <div className="row pt-3 d-flex justify-content-between">
              <div className="col-6 border_main_ETH">
                <div className="">
                  <img src={bnc7} alt="" width="40px" />
                </div>
                <div>
                  <p className="">DogeChain</p>
                </div>
              </div>
            </div>
            <div className="text-start pt-3 color_testing">
              <p className="">Testing</p>
            </div>
            <div className="row  d-flex justify-content-between">
              <div className="col-6 border_main_ETH">
                <div className="">
                  <img src={bnc2} alt="" width="40px" />
                </div>
                <div>
                  <p className="">BNB Smart Chain</p>
                </div>
              </div>
              <div className="col-6 border_main_ETH">
                <div className="">
                  <img src={bnc3} alt="" width="40px" />
                </div>
                <div>
                  <p className="">Matic(Polygon)</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Modal_bnb;
