import React from "react";
import "./Tokenli.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadWeb3 } from "../../connectivity/connectivity";
import { pinkSaleLockAbi, pinkSaleLockContract } from "../../utilies/Contract";
import { userData } from "../Token_pink/userData";
function Tokenli(props) {
  let history = useNavigate();

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row add_new border-bottom pb-2">
        <div className="col-lg-4  col-sm-1 fr_wdh">
          <div className="main_pic_Box d-flex">
            <span className="">
              <img src={props.token_pic} alt="" className="thin_img" />
            </span>
            <div className="for_tx_lft">
              <div className="tx_one">{props.text_one}</div>
              <div className="text-left">{props.tokenName}</div>
              <span className="text-muted tx_two ">{props.text_tow}</span>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-sm-6 fr_wdh text-white  d-flex justify-content-center align-items-center rmov_p">
          <span className="amount">
            <span className="me-1">{props.amount1}</span>
            <span>{props.amount2}</span>
          </span>
        </div>
        <div className="col-lg-4 d-flex  col-sm-5 fr_wdh justify-content-end align-items-center res_coll">
          <a
            className="text-decoration-none text-white adrs"
            onClick={() => history(`/Lockinfo/${props.index}`)}
          >
            {props.fullpage}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Tokenli;
