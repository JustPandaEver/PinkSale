import React from "react";
import "./Cpsform.css";
import Form from "react-bootstrap/Form";

function Cpsform() {
  return (
    <div className="container">
      <div className="row justify-content-center  ">
        <div className="col-lg-10 bg-white border mt-5">
          <Form className="my-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="text-start for_fnt">
                <Form.Label>Title</Form.Label>
              </div>
              <Form.Control
                type="email"
                placeholder="Ex: This is my private sale"
              />
              <div className="text-start ">
                <Form.Text className="pool_edt">
                  Pool creation fee: 0.2 ETH
                </Form.Text>
              </div>
            </Form.Group>

            <div className="currency_box mt-2">
              <div className="text-start for_fnt">
                <Form.Label>Currency</Form.Label>
              </div>
              <div className="chek_box">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label crnc d-flex justify-content-start"
                    for="flexRadioDefault1"
                  >
                    ETH
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label
                    className="form-check-label crnc d-flex justify-content-start"
                    for="flexRadioDefault2"
                  >
                    USDH
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label
                    className="form-check-label crnc d-flex justify-content-start"
                    for="flexRadioDefault2"
                  >
                    USDC
                  </label>
                </div>
              </div>
              <div className="text-start ">
                <Form.Text className="pool_edt">
                  Users will pay with ETH for your token
                </Form.Text>
              </div>
              <button type="button" className="btn btn-sm cp_fr_bttn mt-3">
                Next
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Cpsform;
