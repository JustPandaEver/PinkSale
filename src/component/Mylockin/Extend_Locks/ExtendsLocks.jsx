import React, { useState, CSSProperties, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ExtendsLocks.css";
import Form from "react-bootstrap/Form";
// import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  connectWallet,
  walletaddress,
  connect,
} from "../../../features/pinksale/pinksaleSlice";

import axios from "axios";
import {
  pinkSaleLockContract,
  pinkSaleLockAbi,
  tokenAbi,
  tokenAdress,
} from "../../../utilies/Contract";
import { loadWeb3 } from "../../../connectivity/connectivity";
// import Web3, { fromWei, toWei } from "web3";
import Web3 from "web3";
import ClipLoader from "react-spinners/ClipLoader";
import { DotLoader } from "react-spinners";
import MoonLoader from "react-spinners/MoonLoader";
import PulseLoader from "react-spinners/PulseLoader";
import { userData } from "../../Token_pink/userData.js";
import moment from "moment";
import { toast } from "react-toastify";
function ExtendsLocks({
  transferOwnership,
  trasenctionId,
  unlockseconds,
  description,
  lockedAmount,
  data,
}) {
  const [btntext, setbtnText] = useState("Update Your Lock");

  const [show, setShow] = useState(false);
  const [showtokeninfo, setshowtokeninfo] = useState(false);
  const [dateError, setDateError] = useState("");

  const [userBalance, setuserBalance] = useState("");

  const [tokenInfo, setTokenInfo] = useState("");

  const [flag, setFlag] = useState(true);
  const [validate, setValidate] = useState(true);
  const [extendsLockDisable, setExtendsLockDisable] = useState(true);
  const [amountDisable, setAmountDisable] = useState(false);

  const [spinner, setSpinner] = useState(false);
  const override = {
    margin: "5px 0",
    // borderColor: "red",
  };
  const navigate = useNavigate();
  let walletaddress = useSelector((state) => state.pinksale.walletaddress);

  const [show2, setShow2] = useState(false);

  const createLockScheme = Yup.object().shape({
    tokenAddress: Yup.string().required("tokenAddress is a required field"),

    amount: Yup.string().required("amount is a required field"),

    date: Yup.date().required("Unlock time need to be after now"),
  });

  const formik = useFormik({
    initialValues: {
      tokenAddress: transferOwnership,
      ownerAddress: "",
      title: description,
      amount: lockedAmount,
      date: moment(unlockseconds * 1000)
        .toISOString()
        .substring(0, 16),
    },
    validationSchema: createLockScheme,

    onSubmit: async (values, action) => {
      console.log("values", values);
      await callAPI(values);
    },
  });
  const callAPI = async (values) => {
    setSpinner(true);

    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      //   toast.error("No Wallet Connected")
    } else if (acc == "Wrong Network") {
      //   toast.error("Wrong Newtwork please connect to BSC MainNet ")
    } else {
      try {
        const web3 = window.web3;

        let { tokenAddress, ownerAddress, amount, title, date } = values;

        // let owner;
        // if (values.useAnotherOwner) {
        //   owner = ownerAddress;
        // } else {
        //   owner = acc;
        // }
        const dates = new Date(date);
        const seconds = Math.floor(dates.getTime() / 1000);
        console.log("amount", amount, "lockedAmount", lockedAmount);
        let _amount = web3.utils.toWei(amount.toString());
        let pinkSaleContract = new web3.eth.Contract(
          pinkSaleLockAbi,
          pinkSaleLockContract
        );
        let pinkSaleToken = new web3.eth.Contract(tokenAbi, data._token);
        if (amount > lockedAmount) {
          let approve = await pinkSaleToken.methods
            .approve(pinkSaleLockContract, _amount)
            .send({ from: acc });
          toast.success("your lock approved");
        }

        let UpdatelockHash = await pinkSaleContract.methods
          .editLock(data._id, _amount, seconds)
          .send({ from: acc });
        setSpinner(false);
        toast.success("your lock was updated");

        // if (flag) {
        //   let pinkSaleToken = new web3.eth.Contract(tokenAbi, tokenAdress);
        //   let approve = await pinkSaleToken.methods
        //     .approve(pinkSaleLockContract, _amount)
        //     .send({ from: acc });
        //   setFlag(false);
        //   setSpinner(false);
        //   setbtnText("Lock");
        // } else {
        //   let lockHash = await pinkSaleContract.methods
        //     .lock(owner, tokenAddress, _amount, seconds, title)
        //     .send({ from: acc });
        //   setFlag(true);
        //   setSpinner(false);
        //   setbtnText("Approve");
        //   navigate("/my_lockin");
        // }
      } catch (e) {
        setSpinner(false);

        console.log(e);
      }
    }
  };
  const valid = async (e) => {
    let acc = await loadWeb3();
    const web3 = window.web3;
    const amount = e.target.value;
    if (amount < lockedAmount) {
      setAmountDisable(true);
      formik.setErrors({
        amount: `amount must be greater or equal to ${lockedAmount}`,
      });
    } else {
      setAmountDisable(false);
    }
  };
  const validDate = async (e) => {
    let date = e.target.value;
    let currentDate = new Date();
    console.log("currentDate", currentDate);
    console.log("date.date", date);

    let mydate = moment(date).isAfter(moment(currentDate));
    console.log("isAfter", mydate);
    if (mydate) {
      setExtendsLockDisable(false);
      // setDateError("date must be greater");
      setTimeout(() => {
        formik.setErrors({
          date: `date  must be greater`,
        });
      }, 1000);
      formik.handleChange(e);
    } else {
      setExtendsLockDisable(true);

      formik.handleChange(e);
      setDateError("");
    }
  };
  const getUserBalance = async () => {
    let acc = await loadWeb3();
    const web3 = window.web3;
    let pinkSaleToken = new web3.eth.Contract(tokenAbi, data._token);
    let balance = await pinkSaleToken.methods.balanceOf(acc).call();
    balance = web3.utils.fromWei(balance);

    setuserBalance(balance);
  };
  useEffect(() => {
    getUserBalance();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 bg-light py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 bg-white">
              <div className="text-start fw-bold mt-4 border-bottom pb-4">
                Extends your Lock
              </div>
              <div className="my-4">
                <form onSubmit={formik.handleSubmit}>
                  {/* <div className={`${show ? "d-block" : "d-none"}`}>
                    <div className="text-start aFtr_sty">
                      <Form.Label>Owner</Form.Label>
                    </div>
                    <Form.Control
                      type="text"
                      name="ownerAddress"
                      placeholder="Enter your address "
                      className="hovr_clr"
                      onChange={formik.handleChange}
                      value={formik.values.ownerAddress}
                    />
                    <div className="text-start">
                      <Form.Text className="text-primary">
                        the address you input here will be receive the tokens
                        once they are unlocked
                      </Form.Text>
                    </div>
                  </div> */}

                  <>
                    <ul className="list-group list-group-flush ">
                      <li className="list-group-item d-flex justify-content-between align-items-center fs_14">
                        Token Adress
                        <span className=" fs_14" style={{ color: "#f95192" }}>
                          {data._token}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center fs_14">
                        Name
                        <span className="text-primary fs_14">
                          {data._tokenName}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center fs_14">
                        Symbol
                        <span className="fs_14">{data._symbol}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center fs_14">
                        Deimals
                        <span className="fs_14">{data._tokenDecimals}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center fs_14">
                        Balance
                        <span className="text-primary fs_14">
                          {userBalance}
                        </span>
                      </li>
                    </ul>
                  </>

                  <div className="mt-3">
                    <div className="text-start mt-3 aFtr_sty">
                      <Form.Label>
                        Amount <span className="text-danger">*</span>
                      </Form.Label>
                    </div>
                    <Form.Control
                      type="number"
                      name="amount"
                      placeholder="Enter amount"
                      className="hovr_clr"
                      onChange={(e) => {
                        formik.handleChange(e);
                        valid(e);
                      }}
                      value={formik.values.amount}
                    />
                    <div className="text-start">
                      {formik.errors.amount && (
                        <Form.Text className="text-danger">
                          {formik.errors.amount}
                        </Form.Text>
                      )}
                    </div>
                    <Form.Text className="text-primary">
                      New amount must be not less than current amount
                    </Form.Text>
                  </div>

                  <Form.Group
                    className="my-3"
                    controlId="formBasicCheckbox"
                    onClick={() => setShow2(!show2)}
                  >
                    <Form.Check
                      type="checkbox"
                      onChange={formik.handleChange}
                      name="useVesting"
                      label={<span className="apna">use vesting?</span>}
                      className="text-start"
                    />
                  </Form.Group>

                  <div className={`  ${show2 ? "d-none" : "row"}`}>
                    <div className="text-start mt-3 aFtr_sty ">
                      <Form.Label>
                        Lock until (UTC time)
                        <span className="text-danger">*</span>
                      </Form.Label>
                    </div>
                    <Form.Control
                      type="datetime-local"
                      name="date"
                      placeholder="Select date"
                      defaultValue={formik?.values?.date?.toString()}
                      className="hovr_clr"
                      onChange={async (e) => {
                        validDate(e);
                      }}
                      Value={formik?.values?.date?.toString()}
                    />
                    {dateError.length > 5 && (
                      <Form.Text className="text-danger">{dateError}</Form.Text>
                    )}
                    {console.log("LOg+Date", formik.values.date)}
                    <div className="text-start">
                      {formik.errors.date && (
                        <Form.Text className="text-danger">
                          {formik.errors.date}
                        </Form.Text>
                      )}
                    </div>
                  </div>

                  {/* <div className={`  ${show2 ? "row" : "d-none"}`}>
                    <div className="col-lg-6">
                      <div className="text-start mt-3 aFtr_sty">
                        <Form.Label>
                          Lock until (UTC time)
                          <span className="text-danger">*</span>
                        </Form.Label>
                      </div>
                      <Form.Control
                        type="datetime-local"
                        name="date1"
                        placeholder="Select date"
                        className="hovr_clr"
                        onChange={formik.handleChange}
                        value={formik.values.date1}
                      />
                      <div className="text-start">
                        {formik.errors.date1 && (
                          <Form.Text className="text-danger">
                            {formik.errors.date1}
                          </Form.Text>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="text-start mt-3 aFtr_sty">
                        <Form.Label>
                          TGE Percent <span className="text-danger">*</span>
                        </Form.Label>
                      </div>
                      <Form.Control
                        type="number"
                        name="tgePercent"
                        placeholder="Ex:10"
                        className="hovr_clr"
                        onChange={formik.handleChange}
                        value={formik.values.tgePercent}
                      />
                      <div className="text-start">
                        {formik.errors.tgePercent && (
                          <Form.Text className="text-danger">
                            {formik.errors.tgePercent}
                          </Form.Text>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="text-start mt-3 aFtr_sty">
                        <Form.Label>
                          Cycle days (days)
                          <span className="text-danger">*</span>
                        </Form.Label>
                      </div>
                      <Form.Control
                        type="number"
                        name="cycleDays"
                        placeholder="Ex:10"
                        className="hovr_clr"
                        onChange={formik.handleChange}
                        value={formik.values.cycleDays}
                      />
                      <div className="text-start">
                        {formik.errors.cycleDays && (
                          <Form.Text className="text-danger">
                            {formik.errors.cycleDays}
                          </Form.Text>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="text-start mt-3 aFtr_sty">
                        <Form.Label>
                          Cycle Release Percent
                          <span className="text-danger">*</span>
                        </Form.Label>
                      </div>
                      <Form.Control
                        type="number"
                        name="cycleReleasePercent"
                        placeholder="Ex:10"
                        className="hovr_clr"
                        onChange={formik.handleChange}
                        value={formik.values.cycleReleasePercent}
                      />
                      <div className="text-start">
                        {formik.errors.cycleReleasePercent && (
                          <Form.Text className="text-danger">
                            {formik.errors.cycleReleasePercent}
                          </Form.Text>
                        )}
                      </div>
                    </div>
                  </div> */}

                  <div className="mt-4 text-start rounder yelo_box">
                    <span>
                      Please exclude PinkLock's lockup address
                      0x407993575c91ce7643a4d4 from fees, rewards, max tx amount
                      to start locking tokens. <br /> We don't support rebase
                      tokens.
                    </span>
                  </div>
                  {console.log("formik", formik)}
                  <div className="mt-4 d-flex justify-content-center align-items-center">
                    <button
                      type="submit"
                      className="btn btn-small loc_buttn "
                      disabled={extendsLockDisable || amountDisable}
                    >
                      {spinner ? (
                        <ClipLoader
                          cssOverride={override}
                          color="pink"
                          size={20}
                          className=""
                        />
                      ) : (
                        ""
                      )}
                      {btntext}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-lg-8">
              <p>
                Disclaimer: The information provided shall not in any way
                constitute a recommendation as to whether you should invest in
                any product discussed. We accept no liability for any loss
                occasioned to any person acting or refraining from action as a
                result of any material provided or published.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExtendsLocks;
