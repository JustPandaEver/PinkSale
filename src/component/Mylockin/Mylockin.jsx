import React, { useEffect, useState } from "react";
import "./Mylockin.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";

import { loadWeb3 } from "../../connectivity/connectivity";
import { pinkSaleLockAbi, pinkSaleLockContract } from "../../utilies/Contract";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import UpdateLock from "./Update_lock/UpdateLock";
import Countdown from "react-countdown";
import { userData } from "../Token_pink/userData";
import ExtendsLocks from "./Extend_Locks/ExtendsLocks";
import { toast } from "react-toastify";

function Lockin() {
  let { id } = useParams();
  var flag = false;
  if (id == "00") {
    flag = true;
  }
  const [show, setShow] = useState(false);
  const [unlockDisable, setUnlockDisable] = useState(true);

  const [showUpdates, setShowUpdate] = useState(false);
  const [showExtendsLocks, setShowExtendsLocks] = useState(false);

  const [trasenctionId, settrasenctionId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({});
  const [lockdate, setlockDate] = useState("");
  const [unlockdate, setunlockDate] = useState("");
  const [transferOwnership, settransferOwnership] = useState("");
  const [unlockseconds, setunlockseconds] = useState("");
  const [unlocksecondsdummy, setunlocksecondsdummy] = useState(0);

  const [lockedAmount, setlockedAmount] = useState("");
  const [description, setdescription] = useState("");
  const [Timer, setTimer] = useState(null);

  const userLockedData = useSelector((state) => state.pinksale.userLockedData);

  const Completionist = () => (
    <div className="featured-card-clock" data-countdown="2021/10/10">
      <div className="main_time mt-3 d-flex justify-content-center">
        <div className="pik_clr py-1 px-2 arounded">00</div>
        <div className="pik_clr py-1 px-2 arounded">00</div>
        <div className="pik_clr py-1 px-2 arounded">00</div>
        <div className="pik_clr py-1 px-2 arounded">00</div>
      </div>
    </div>
  );

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    // setTimeEnded(completed)

    if (completed) {
      // Render a completed state
      setUnlockDisable(false);
      return <Completionist />;
    } else {
      return (
        <div className="countdown">
          {/* <div className="timer-text" data-countdown="2021/11/11">{`${days} : ${hours} : ${minutes} : ${seconds} `}</div> */}
          <div className="main_time mt-3 d-flex justify-content-center">
            <div className="pik_clr p-2 arounded">{days}</div>
            <div className="pik_clr p-2 arounded">{hours}</div>
            <div className="pik_clr p-2 arounded">{minutes}</div>
            <div className="pik_clr p-2 arounded">{seconds}</div>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (flag) {
      setData(userLockedData[0]);

      let lockseconds = userLockedData[0]?._lockDate;

      const unlockSeconds = userLockedData[0]?._unlockdate;
      const ownerAddress = userLockedData[0]?._owner;
      const transictionid = userLockedData[0]?._id;
      const lockedamount = userLockedData[0]?._amount;
      const description = userLockedData[0]?._description;
      setunlocksecondsdummy(unlockSeconds);

      setdescription(description);
      setlockedAmount(lockedamount);
      settrasenctionId(transictionid);
      settransferOwnership(ownerAddress);
      setlockDate(lockseconds);
      setunlockDate(unlockSeconds);
      setunlockseconds(Number(unlockSeconds));
    } else {
      setData(userLockedData[id]);
      const lockseconds = userLockedData[id]?._lockDate;
      let unlockSeconds = userLockedData[id]?._unlockDate;
      unlockSeconds = Number(unlockSeconds);
      setunlocksecondsdummy(unlockSeconds);

      setunlockseconds(Number(unlockSeconds));
      const ownerAddress = userLockedData[id]?._owner;
      const transictionid = userLockedData[id]?._id;
      const lockedamount = userLockedData[id]?._amount;
      const description = userLockedData[id]?._description;
      setdescription(description);
      setlockedAmount(lockedamount);
      settrasenctionId(transictionid);
      settransferOwnership(ownerAddress);
      setlockDate(new Date(lockseconds * 1000).toUTCString());
      setunlockDate(unlockSeconds);
    }
  });
  const renounceLockOwnership = async () => {
    // setSpinner(true);
    // console.log("values", values);
    let acc = await loadWeb3();
    // console.log("acc", acc);
    if (acc == "No Wallet") {
      //   toast.error("No Wallet Connected")
    } else if (acc == "Wrong Network") {
      //   toast.error("Wrong Newtwork please connect to BSC MainNet ")
    } else {
      try {
        const web3 = window.web3;
        let pinkSaleContract = new web3.eth.Contract(
          pinkSaleLockAbi,
          pinkSaleLockContract
        );
        let renounceLockOwnership = await pinkSaleContract.methods
          .renounceLockOwnership(trasenctionId)
          .send({ from: acc });
        toast.success("Success");
      } catch (e) {
        toast.error(e.message);
        // setSpinner(false);

        console.log(e);
      }
    }
  };

  const transferOwnerShip = async () => {
    // setSpinner(true);
    // console.log("values", values);
    let acc = await loadWeb3();
    // console.log("acc", acc);
    if (acc == "No Wallet") {
      //   toast.error("No Wallet Connected")
    } else if (acc == "Wrong Network") {
      //   toast.error("Wrong Newtwork please connect to BSC MainNet ")
    } else {
      try {
        const web3 = window.web3;
        let pinkSaleContract = new web3.eth.Contract(
          pinkSaleLockAbi,
          pinkSaleLockContract
        );
        let transferOwnerShip = await pinkSaleContract.methods
          .transferLockOwnership(trasenctionId, transferOwnership)
          .send({ from: acc });
        toast.success("success");
      } catch (e) {
        // setSpinner(false);
        toast.error(e.message);
      }
    }
  };
  const unLock = async () => {
    // setSpinner(true);
    // console.log("values", values);
    let acc = await loadWeb3();
    // console.log("acc", acc);
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected");
    } else if (acc == "Wrong Network") {
      toast.error("Wrong Newtwork please connect to BSC MainNet ");
    } else {
      try {
        const web3 = window.web3;
        let pinkSaleContract = new web3.eth.Contract(
          pinkSaleLockAbi,
          pinkSaleLockContract
        );

        let unLock = await pinkSaleContract.methods
          .unlock(data._id)
          .send({ from: acc });
        toast.success("Unlocked");
      } catch (e) {
        // setSpinner(false);
        toast.error(e.message);

        console.log(e);
      }
    }
  };
  const showUpdate = async () => {
    setShowUpdate(!showUpdates);
  };
  useEffect(() => {}, [unlockDisable]);

  const Time = sessionStorage.getItem("Time");

  return (
    <div className="container red_order">
      <div className="row">
        <div className="col-lg-12 col-md-12 bg-light py-5">
          {showUpdates ? (
            <>
              <UpdateLock
                transferOwnership={transferOwnership}
                trasenctionId={trasenctionId}
                unlockseconds={unlockdate}
                lockedAmount={lockedAmount}
                description={description}
                data={data}
              />
            </>
          ) : showExtendsLocks ? (
            <>
              <ExtendsLocks
                transferOwnership={transferOwnership}
                trasenctionId={trasenctionId}
                unlockseconds={unlockdate}
                lockedAmount={lockedAmount}
                description={description}
                data={data}
              />
            </>
          ) : (
            <>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-10 bg-white">
                  <div className="my-4">
                    <div className="text-center">
                      <span>Unlock in</span>
                    </div>
                    {unlocksecondsdummy && (
                      <Countdown
                        date={
                          Date.now() +
                          (String(unlocksecondsdummy * 1000) - Date.now())
                        }
                        renderer={renderer}
                      />
                    )}
                  </div>
                </div>

                <div className="col-lg-10 bg-white mt-4">
                  <div className="text-start border-bottom py-3">
                    <span className="fw-bold">Token Info</span>
                  </div>
                  <div className="my-4">
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="left_txt">Token Address</span>
                      <span className="fnt_sz">
                        <a
                          href={`https://testnet.bscscan.com/token/${data?._token}`}
                          target="_blank"
                          className="adrs"
                        >
                          {data?._token}
                        </a>
                      </span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="left_txt">Token Name</span>
                      <span className="fnt_sz">{data?._tokenName}</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="left_txt">Token Symbol</span>
                      <span className="fnt_sz">{data?._symbol}</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="left_txt">Token Decimals</span>
                      <span className="fnt_sz">{data?._tokenDecimals}</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-10 bg-white mt-4">
                  <div className="text-start border-bottom py-3">
                    <span className="fw-bold">Lock Info</span>
                  </div>
                  <div className="my-4">
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="left_txt">Total Amount Locked</span>
                      <span className="fnt_sz">
                        <span className="">
                          {" "}
                          {data?._amount} {data?._tokenName}
                        </span>
                      </span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="left_txt">Total Values Locked</span>
                      <span className="fnt_sz">$0</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="left_txt">Owner</span>
                      <span className="fnt_sz">
                        <a
                          href={`https://testnet.bscscan.com/address/${data?._owner}`}
                          target="_blank"
                          className="adrs"
                        >
                          {data?._owner}
                        </a>
                      </span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="left_txt">Lock Date</span>
                      <span className="fnt_sz">{`${moment(lockdate).format(
                        "YYYY-MM-DD HH:mm:ss a"
                      )}`}</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="left_txt">Unlock Date</span>
                      <span className="fnt_sz">
                        {moment(unlockdate * 1000).format(
                          "YYYY-MM-DD HH:mm:ss a"
                        )}
                      </span>
                    </div>

                    <div className="last_butn_main py-2 mt-3 ">
                      <div className="last_btn_in">
                        <button
                          type="button"
                          className="btn btn-sm fst_bB"
                          onClick={handleShow}
                        >
                          Transfer Lock Ownership
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm fst_bB"
                          onClick={renounceLockOwnership}
                        >
                          Renounce Lock Ownership
                        </button>
                        {unlockDisable ? (
                          <>
                            {" "}
                            <button
                              type="button"
                              className="btn btn-sm fst_bB"
                              onClick={showUpdate}
                            >
                              Update
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm fst_bB"
                              onClick={() => {
                                setShowExtendsLocks(!showExtendsLocks);
                              }}
                            >
                              Extend Lock
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          className="btn btn-sm fst_bB"
                          style={{
                            backgroundColor: !unlockDisable
                              ? "#f95192"
                              : "#0000001A",
                            color: !unlockDisable ? "white" : "black",
                          }}
                          disabled={unlockDisable}
                          onClick={unLock}
                        >
                          Unlock
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-center mt-5">
                <div className="col-lg-8">
                  <p>
                    Disclaimer: The information provided shall not in any way
                    constitute a recommendation as to whether you should invest
                    in any product discussed. We accept no liability for any
                    loss occasioned to any person acting or refraining from
                    action as a result of any material provided or published.
                  </p>
                </div>
              </div>
            </>
          )}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Transfer Ownership</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>New Owner Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="new owner Addtress"
                    autoFocus
                    value={transferOwnership}
                    onChange={(e) => {
                      settransferOwnership(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className="mx-auto">
              {/* <Button variant="secondary" onClick={handleClose}>
                Close
              </Button> */}
              <Button
                variant="secondary"
                onClick={() => {
                  transferOwnerShip();
                  handleClose();
                }}
              >
                Transfer Ownership
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Lockin;
