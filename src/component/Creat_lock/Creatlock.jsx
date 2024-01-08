import React, { useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import "./Creatlock.css";
import Form from "react-bootstrap/Form";
// import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  connectWallet,
  walletaddress,
  connect,
  userLockedData,
} from "../../features/pinksale/pinksaleSlice";

import axios from "axios";
import {
  pinkSaleLockContract,
  pinkSaleLockAbi,
  tokenAbi,
  tokenAdress,
} from "../../utilies/Contract";
import { loadWeb3 } from "../../connectivity/connectivity";
// import Web3, { fromWei, toWei } from "web3";
import Web3 from "web3";
import ClipLoader from "react-spinners/ClipLoader";
import { DotLoader } from "react-spinners";
import MoonLoader from "react-spinners/MoonLoader";
import PulseLoader from "react-spinners/PulseLoader";
import moment from "moment";

import { tokenData, userData } from "../Token_pink/userData.js";
import { Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

function Creatlock() {
  const dispatch = useDispatch();

  const [btntext, setbtnText] = useState("Approve");

  const [show, setShow] = useState(false);
  const [showtokeninfo, setshowtokeninfo] = useState(false);

  const [tokenInfo, setTokenInfo] = useState("");

  const [flag, setFlag] = useState(true);
  const [validate, setValidate] = useState(true);

  const [spinner, setSpinner] = useState(false);
  const [getInputdata, setgetInputdata] = useState();

  const override = {
    margin: "5px 0",
    // borderColor: "red",
  };

  const navigate = useNavigate();
  let walletaddress = useSelector((state) => state.pinksale.walletaddress);

  const [show2, setShow2] = useState(false);

  const createLockScheme = Yup.object().shape({
    tokenAddress: Yup.string().required("tokenAddress is a required field"),
    // ownerAddress: Yup.string().required("Required"),
    // title: Yup.string().required("Required"),

    amount: Yup.string().required("amount is a required field"),
    date: Yup.date()
      .required("Unlock time need to be after now")
      .min(new Date(), "date must be greater then current date"),
    // date1: Yup.string().required("TGE Date needs to be after now"),
    // tgePercent: Yup.string().required("TGE Percent can not be blank"),
    // cycleDays: Yup.string().required("Cycle can not be blank"),
    // cycleReleasePercent: Yup.string().required(
    //   "Cycle Release Percent can not be blank"
    // ),
    // email: Yup.string().email('Invalid email').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      tokenAddress: "",
      ownerAddress: "",
      title: "",
      amount: "",
      date: "",
      useAnotherOwner: false,
      tokenerror: "",

      //   date1: "",
      //   tgePercent: "",
      //   cycleDays: "",
      //   cycleReleasePercent: "",
    },
    validationSchema: createLockScheme,

    onSubmit: async (values, action) => {
      await callAPI(values);
      // action.resetForm();
    },
  });
  let myOwner;
  const callAPI = async (values) => {
    setSpinner(true);

    let acc = await loadWeb3();
    // console.log("acc", acc);
    if (acc == "No Wallet") {
      //   toast.error("No Wallet Connected")
    } else if (acc == "Wrong Network") {
      //   toast.error("Wrong Newtwork please connect to BSC MainNet ")
    } else {
      try {
        const web3 = window.web3;

        let { tokenAddress, ownerAddress, amount, title, date } = values;

        let owner;
        if (values.useAnotherOwner) {
          owner = ownerAddress;
          myOwner = owner;
        } else {
          owner = acc;
          myOwner = owner;
        }
        const dates = new Date(date);
        const seconds = Math.floor(dates.getTime() / 1000);

        let _amount = web3.utils.toWei(amount.toString());
        let pinkSaleContract = new web3.eth.Contract(
          pinkSaleLockAbi,
          pinkSaleLockContract
        );
        let get_length = await pinkSaleContract.methods
          .normalLockCountForUser(acc)
          .call();

        if (flag) {
          let pinkSaleToken = new web3.eth.Contract(tokenAbi, tokenAdress);

          let approve = await pinkSaleToken.methods
            .approve(pinkSaleLockContract, _amount)
            .send({
              from: acc,
            });
          toast.success("your token approved");

          setFlag(false);
          setSpinner(false);
          setbtnText("Lock");
        } else {
          let lockHash = await pinkSaleContract.methods
            .lock(owner, tokenAdress, _amount, seconds, title)
            .send({
              from: acc,
            });
          setFlag(true);
          setSpinner(false);
          setbtnText("Approve");
          let totalLockCountLenght = await pinkSaleContract.methods
            .getTotalLockCount()
            .call();

          let _id = --totalLockCountLenght;

          await myLocks(_amount, seconds, tokenAddress, _id);
          toast.success("your token locked");
          navigate(`/my_lockin/00`);
        }
      } catch (e) {
        toast.error(e.message);
        setSpinner(false);
      }
    }
  };

  const myLocks = async (amount, seconds, tokenAddress, _id) => {
    let arr = [];
    let obj = {};
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      //   toast.error("No Wallet Connected")
    } else if (acc == "Wrong Network") {
      //   toast.error("Wrong Newtwork please connect to BSC MainNet ")
    } else {
      try {
        const web3 = window.web3;

        let pinkSaleToken = new web3.eth.Contract(tokenAbi, tokenAdress);

        let tokenName, tokenSymbol, tokenDecimal, tokenBalance;
        tokenName = await pinkSaleToken.methods.name().call();

        tokenSymbol = await pinkSaleToken.methods.symbol().call();

        tokenDecimal = await pinkSaleToken.methods.decimals().call();

        tokenBalance = await pinkSaleToken.methods.balanceOf(acc).call();

        // tokenBalance = web3.utils.fromWei(tokenBalance);
        obj = {
          _id: _id,
          _token: tokenAddress,
          _tokenName: tokenName,
          _symbol: tokenSymbol,
          _tokenDecimals: tokenDecimal,
          _amount: web3.utils.fromWei(String(amount)),
          _owner: myOwner,
          _lockDate: +new Date(),
          _unlockdate: seconds,
        };

        arr = [...arr, obj];

        dispatch(userLockedData(arr));
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const valid = async (e) => {
    let acc = await loadWeb3();
    const web3 = window.web3;

    const _address = e.target.value;

    if (web3.utils.isAddress(_address)) {
      let _addressStatus = await web3.eth.getCode(_address);

      let obj = {};
      if (_addressStatus === "0x") {
        setshowtokeninfo(false);

        setValidate(false);

        formik.setErrors({
          tokenAddress: "Invalid Address",
        });
      } else {
        setgetInputdata(e.target.value);
        sessionStorage.setItem("token_Address", e.target.value);
        let pinkSaleToken = new web3.eth.Contract(tokenAbi, _address);
        let tokenName, tokenSymbol, tokenDecimal, tokenBalance;
        tokenName = await pinkSaleToken.methods.name().call();
        tokenSymbol = await pinkSaleToken.methods.symbol().call();
        tokenDecimal = await pinkSaleToken.methods.decimals().call();
        tokenBalance = await pinkSaleToken.methods.balanceOf(acc).call();

        tokenBalance = web3.utils.fromWei(tokenBalance);
        obj.tokenName = tokenName;
        obj.tokenSymbol = tokenSymbol;
        obj.tokenDecimal = tokenDecimal;
        obj.tokenBalance = tokenBalance;
        console.log("_addressStatus", obj);

        setshowtokeninfo(true);
      }
      setTokenInfo({ ...obj });

      // console.log("obj", obj);
    } else {
      setshowtokeninfo(false);

      setValidate(false);

      // formik.setErrors({
      //   tokenAddress: "Invalid Address",
      // });
    }
  };
  return (
    <div className="container ">
      <div className="row">
        <div className="col-lg-12 col-md-12  py-5">
          <div className="row d-flex justify-content-center box_shadow">
            <div className="col-lg-10 ">
              <div className="text-start fw-bold mt-4 border-bottom pb-4">
                Create your lock
              </div>
              <div className="my-4">
                <form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div className="text-start aFtr_sty">
                      <Form.Label>
                        Token or LP Token address{" "}
                        <span className="text-danger">*</span>
                      </Form.Label>
                    </div>
                    <Form.Control
                      type="text"
                      name="tokenAddress"
                      placeholder="Enter token or PL token address"
                      value={formik.values.tokenAddress}
                      onChange={(e) => {
                        formik.handleChange(e);
                        valid(e);
                      }}
                      className="hovr_clr input_flied_of_pink"
                    />

                    <div className="text-start">
                      {formik.errors.tokenAddress && (
                        <Form.Text className="text-danger">
                          {formik.errors.tokenAddress}
                        </Form.Text>
                      )}
                    </div>
                    {/* {console.log} */}
                    <Form.Group
                      className="my-3"
                      controlId="formBasicCheckbox"
                      onClick={() => setShow(!show)}
                    >
                      <Form.Check
                        type="checkbox"
                        name="useAnotherOwner"
                        onChange={formik.handleChange}
                        label={
                          <span className="apna ">use another owner?</span>
                        }
                        className="text-start hovr_clr "
                      />
                    </Form.Group>
                  </Form.Group>

                  <div className={`${show ? "d-block" : "d-none"}`}>
                    <div className="text-start aFtr_sty">
                      <Form.Label>Owner</Form.Label>
                    </div>
                    <Form.Control
                      type="text"
                      name="ownerAddress"
                      placeholder="Enter your address "
                      className="hovr_clr input_flied_of_pink"
                      onChange={formik.handleChange}
                      value={formik.values.ownerAddress}
                    />
                    <div className="text-start">
                      <Form.Text className="text-primary ">
                        the address you input here will be receive the tokens
                        once they are unlocked
                      </Form.Text>
                    </div>
                  </div>
                  {showtokeninfo ? (
                    <>
                      <ul className="list-group list-group-flush ">
                        <li className="list-group-item d-flex justify-content-between align-items-center fs_14">
                          Name
                          <span className="text-primary fs_14">
                            {tokenInfo.tokenName}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center fs_14">
                          Symbol
                          <span className="fs_14">{tokenInfo.tokenSymbol}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center fs_14">
                          Deimals
                          <span className="fs_14">
                            {tokenInfo.tokenDecimal}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center fs_14">
                          Balance
                          <span className="text-primary fs_14">
                            {tokenInfo.tokenBalance}
                          </span>
                        </li>
                      </ul>
                    </>
                  ) : (
                    ""
                  )}

                  <div className="mt-3">
                    <div className="text-start aFtr_sty">
                      <Form.Label>Title</Form.Label>
                    </div>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Ex:My Lock"
                      className="hovr_clr input_flied_of_pink"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />

                    <div className="text-start mt-3 aFtr_sty">
                      <Form.Label>
                        Amount <span className="text-danger">*</span>
                      </Form.Label>
                    </div>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        className="hovr_clr input_flied_of_pink"
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                      />
                      <Button
                        variant="outline-secondary"
                        id="button-addon2"
                        className="text-white max_btn_color"
                        onClick={() => {
                          formik.setValues({ amount: tokenInfo.tokenBalance });
                        }}
                      >
                        Max
                      </Button>
                    </InputGroup>
                    <div className="text-start">
                      {formik.errors.amount && (
                        <Form.Text className="text-danger">
                          {formik.errors.amount}
                        </Form.Text>
                      )}
                    </div>
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
                      className="text-start "
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
                      className="hovr_clr input_flied_of_pink"
                      onChange={formik.handleChange}
                      value={formik.values.date}
                    />
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

                  <div className="mt-4 d-flex justify-content-center align-items-center">
                    <button
                      type="submit"
                      className="btn btn-small loc_buttn  "
                      disabled={!(formik.isValid && validate)}
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

export default Creatlock;
