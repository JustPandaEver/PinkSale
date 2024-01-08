import React from "react";
import Modal_connect from "../Modal_connect/Modal_connect";
import Modal_bnb from "../Model_bnb/Model_bnb";

function Model_resp() {
  return (
    <div className="d-flex">
      <Modal_bnb />
      <Modal_connect />
    </div>
  );
}

export default Model_resp;
