import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "./Lockin.css";
import Countdown from "react-countdown";

function Lockin() {
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [showUpdates, setShowUpdate] = useState(false);
  const [trasenctionId, settrasenctionId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({});
  const [lockdate, setlockDate] = useState("");
  const [unlockdate, setunlockDate] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimal, setTokenDecimal] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [lockDate, setLockDate] = useState("");
  const [unLockDate, setUnLockDate] = useState("");

  const [unlockseconds, setunlockseconds] = useState(0);
  const [lockedAmount, setlockedAmount] = useState("");
  const [description, setdescription] = useState("");
  const [Timer, setTimer] = useState(null);
  const [unlocksecondsdummy, setunlocksecondsdummy] = useState(0);

  const lockForToken = useSelector((state) => state.pinksale.locksForTokens);

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
      // setUnlockDisable(false);
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
    const tokenAddress = lockForToken[id]?.tokenAddress;
    const tokenName = lockForToken[id]?.tokenName;
    const tokenSymbol = lockForToken[id]?.tokenSymbol;
    const tokenDecimal = lockForToken[id]?.tokenDecimals;
    const lockedamount = lockForToken[id]?.lockedamount;
    const ownerAddress = lockForToken[id]?.walletAdress;
    let lockeDate = lockForToken[id]?.lockDate;

    lockeDate = String(new Date(lockeDate * 1000));
    // console.log("lock date", lockeDate);

    let unlockDate = lockForToken[id]?.unlockDate;
    setunlocksecondsdummy(unlockDate);

    unlockDate = String(new Date(unlockDate * 1000));

    setUnLockDate(unlockDate);
    setLockDate(lockeDate);
    console.log("lockin lockedamount", lockedamount);
    setOwnerAddress(ownerAddress);
    setTokenAddress(tokenAddress);
    setTokenDecimal(tokenDecimal);
    setTokenSymbol(tokenSymbol);
    setTokenName(tokenName);

    // setData(lockForToken[id]);
    // const lockseconds = lockForToken[id]?._lockDate;
    // const unlockSeconds = lockForToken[id]?._unlockDate;
    // setunlockseconds(Number(unlockSeconds));
    // const ownerAddress = lockForToken[id]?._owner;
    // const transictionid = lockForToken[id]?._id;
    // const description = lockForToken[id]?._description;
    // // alert(description);

    // setdescription(description);
    setlockedAmount(lockedamount);
    // settrasenctionId(transictionid);
    // setlockDate(new Date(lockseconds * 1000).toUTCString());
    // setunlockDate(new Date(unlockSeconds * 1000).toUTCString());
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 bg-light py-5  color_of_back_ground ">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 bg-white  color_of_back_ground box_shadow">
              <div className="my-4">
                <div>
                  <span>Unlock in</span>
                </div>
                <div className="main_time mt-3 d-flex justify-content-center">
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
            </div>

            <div className="col-lg-10 bg-white mt-4  color_of_back_ground box_shadow">
              <div className="text-start border-bottom py-3">
                <span className="fw-bold">Token Info</span>
              </div>
              <div className="my-4">
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="left_txt">Token Address</span>
                  <span className="fnt_sz">
                    <a
                      href={`https://testnet.bscscan.com/token/${tokenAddress}`}
                      target="_blank"
                      className="adrs"
                    >
                      {" "}
                      {tokenAddress}
                    </a>
                  </span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="left_txt">Token Name</span>
                  <span className="fnt_sz">{tokenName}</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="left_txt">Token Symbol</span>
                  <span className="fnt_sz">{tokenSymbol}</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="left_txt">Token Decimals</span>
                  <span className="fnt_sz">{tokenDecimal}</span>
                </div>
              </div>
            </div>

            <div className="col-lg-10 bg-white mt-4  color_of_back_ground box_shadow">
              <div className="text-start border-bottom py-3">
                <span className="fw-bold">Lock Info</span>
              </div>
              <div className="my-4">
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="left_txt">Total Amount Locked</span>
                  <span className="fnt_sz">
                    <span className="adrs"> {lockedAmount}</span>
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
                      href={`https://testnet.bscscan.com/address/${ownerAddress}`}
                      target="_blank"
                      className="adrs"
                    >
                      {ownerAddress}
                    </a>
                  </span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="left_txt">Lock Date</span>
                  <span className="fnt_sz">{lockDate}</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="left_txt">Unlock Date</span>
                  <span className="fnt_sz">{unLockDate}</span>
                </div>
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

export default Lockin;
