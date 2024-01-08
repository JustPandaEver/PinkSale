import React from "react";

import "./Launchpad_card.css";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
{
  /* {LockIcon}  */
}

function Launchpad_card(props) {
  console.log("props", props);
  const Completionist = () => (
    <strong>
      <span>00</span>
      <span className="dotdot">:</span>
      <span>00</span>
      <span className="dotdot">:</span>
      <span>00</span>
      <span className="dotdot">:</span>
      <span>00</span>
    </strong>
  );

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    // setTimeEnded(completed)

    if (completed) {
      // Render a completed state
      // setUnlockDisable(false);
      return <Completionist />;
    } else {
      return (
        <strong>
          <span>{days}</span>
          <span className="dotdot">:</span>
          <span>{hours}</span>
          <span className="dotdot">:</span>
          <span>{minutes}</span>
          <span className="dotdot">:</span>
          <span>{seconds}</span>
        </strong>
      );
    }
  };
  // alert(props.index);

  const SetView = async () => {
    props.setIndex(props.index);
if(props.dummy==1){
  props.updateFlag();

}
else if(props.dummy==2){
  props.updateFlag();

}
  };
  return (
    <>
      <div className="container" key={props.index}>
        <div className="row mt-5">
          <div className="col-12 ">
            <div className="card-body bg_color ">
              <div className=" d-flex justify-content-between align-items-center ">
                <img src={props.img_card} alt="" className="img_card" />

                <div>
                  <p
                    className={` px-2 rounded-pill `}
                    style={{
                      backgroundColor: `${props.timeInfo.backgroundcolor}`,
                    }}
                  >
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      version="1.1"
                      style={{ marginRight: "5px" }}
                    >
                      <circle
                        cx="5"
                        cy="5"
                        r="5"
                        fill={`${props.timeInfo.color}`}
                      />
                    </svg>
                    <span
                      className="text-"
                      style={{
                        color: `${props.timeInfo.color}`,
                      }}
                    >
                      <small>{props.timeInfo.title}</small>
                    </span>
                  </p>
                </div>
              </div>

              <div className="my-3">
                <p className="text-white mb-1 hh"> {props.tokenName}</p>
                <p className="text-white mb-1 kk">{props.totalSupply}</p>
              </div>
              <p className="text-white progress_text mb-2">ICO Progress(%)</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="50"
                  style={{ width: `${props.progressInPercent}%` }}
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <p className="text-white progress_text">
                  {props.soldAmountForProgress}
                </p>
                <p className=" text-white progress_text">
                  {" "}
                  {props.totalSupplyForProgress}
                </p>
              </div>
              <hr className="hr" />

              <div className="d-flex justify-content-between text-white">
                <p>
                  <strong> {props.timeInfo.timerTitle}</strong> <br />
                  <Countdown
                    date={
                      Date.now() +
                      (String(props.timeInfo.seconds * 1000) - Date.now())
                    }
                    renderer={renderer}
                  />
                </p>
                {/* <div>
                  {console.log("updateflag", props.updateFlag)}
                  <button onClick={() => hi()}>View</button>
                </div> */}
                <div>
                  <Link
                    // to="/Launchpad_list_view"
                    className="btn max_btn_color "
                    role="button"
                    onClick={() => {
                      SetView();
                    }}
                  >
                    View
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Launchpad_card;
