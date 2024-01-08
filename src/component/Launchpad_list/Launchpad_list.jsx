import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Launchpad_list.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Launchpad_card from "../Launchpad_card/Launchpad_card";
import Card_img from "../Assets/Binance.png";
import Card_img2 from "../Assets/unity.png";
import Card_img3 from "../Assets/pepsi.png";
import Card_img4 from "../Assets/pinkswap.a95de4f3.png";
import Form from "react-bootstrap/Form";
import Countdown from "react-countdown";

import {
  pinkSaleLockContract,
  pinkSaleLockAbi,
  tokenAbi,
  tokenAdress,
  PinkSaleICOFactoryContractAddress,
  PinkSaleICOFactoryContractABI,
  PinksaleICOContractABI,
  PinksaleICOContractAddress,
} from "../../utilies/Contract";
import { loadWeb3 } from "../../connectivity/connectivity";
import { Button } from "react-bootstrap";
import Web3 from "web3";
let getData;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const [flag, setFlag] = React.useState(true);
  const [flagForUSer, setFlagForUser] = React.useState(true);

  let websupply = new Web3("https://bsc-testnet.public.blastapi.io");

  const [totalIcos, setTotalIcos] = useState([]);
  const [totalIcosForUser, setTotalIcosForUser] = useState([]);

  const [index, setIndex] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const allIcos = async () => {
    const web3 = window.web3;
    let acc = await loadWeb3();
    let allIcosInfo = [];
    let obj;
    let pinkSaleFactoryICO = new websupply.eth.Contract(
      PinkSaleICOFactoryContractABI,
      PinkSaleICOFactoryContractAddress
    );
    let totalIcos = await pinkSaleFactoryICO.methods.totalICOs().call();
    console.log("icos", totalIcos);
    for (let index = 0; index < totalIcos.length; index++) {
      const contractAddress = totalIcos[index];
      let pinkSaleICO = new websupply.eth.Contract(
        PinksaleICOContractABI,
        contractAddress
      );
      let tokenDetail = await pinkSaleICO.methods.tokeninfo().call();
      let icoInfo = await pinkSaleICO.methods.ICO_info().call();
      // console.log("buy_token_name ", icoInfo.buy_token_name);

      let icoProgress = await pinkSaleICO.methods.status().call();
      let soldPercent = (icoProgress.sold_amount / icoInfo.token_supply) * 100;
      let currentDateSeconds = Math.round(new Date().getTime() / 1000);
      console.log(currentDateSeconds);
      let endTimeLessthenStartTime;
      let timeInfo;

      if (currentDateSeconds < Number(icoInfo.ICO_start)) {
        timeInfo = {
          timerTitle: "  ICO Starts In",
          seconds: icoInfo.ICO_start,
          backgroundcolor: "#fdfaea",
          color: "#d29813",
          title: "Upcoming",
        };
      } else if (currentDateSeconds < Number(icoInfo.ICO_end)) {
        timeInfo = {
          timerTitle: "  ICO Ends In",
          seconds: icoInfo.ICO_end,
          backgroundcolor: "#d1fae5",
          color: "#10b981",
          title: "ICO Live",
        };
      } else {
        timeInfo = {
          timerTitle: "  ICO Ended ",
          seconds: icoInfo.ICO_end,
          backgroundcolor: "#ffeaef",
          color: "#ff3465",
          title: "ICO Ended",
        };
      }
      console.log("timeinfo", timeInfo);
      let icoStartdate = new Date(icoInfo.ICO_start * 1000);
      icoStartdate = icoStartdate.toUTCString();
      let icoEnddate = new Date(icoInfo.ICO_end * 1000);
      icoEnddate = icoEnddate.toUTCString();

      obj = {
        tokenName: tokenDetail.name,
        tokenSymbol: tokenDetail.symbol,
        totalSupply: websupply.utils.fromWei(icoInfo.token_supply),
        soldAmount: websupply.utils.fromWei(icoProgress.sold_amount),
        startTime: icoInfo.ICO_start,
        endTime: icoInfo.ICO_end,
        progressInPercent: soldPercent,
        timeInfo: timeInfo,
        exchangeRate: icoInfo.token_rate,
        tokenAddress: icoInfo.sale_token,
        icoAddress: totalIcos[index],
        icoStartDate: icoStartdate,
        icoEndDate: icoEnddate,
        tokenDecimals: tokenDetail.decimal,
        currency: icoInfo.buy_token_name,
      };
      // allIcosInfo.push(obj);

      console.log("");
      allIcosInfo = [...allIcosInfo, { ...obj }];
      // console.log("icoInfo", icoInfo.token_supply);
      // console.log("icoProgress", icoProgress);
    }
    // console.log("objectobject", allIcosInfo);

    setTotalIcos([...allIcosInfo]);
  };
  const allIcosForUser = async () => {
    const web3 = window.web3;
    let acc = await loadWeb3();
    let allIcosInfo = [];
    let obj;
    let pinkSaleFactoryICO = new websupply.eth.Contract(
      PinkSaleICOFactoryContractABI,
      PinkSaleICOFactoryContractAddress
    );
    let totalIcos = await pinkSaleFactoryICO.methods
      .totalICOsForUser(acc)
      .call();
    console.log("icos", totalIcos);
    for (let index = 0; index < totalIcos.length; index++) {
      const contractAddress = totalIcos[index];
      let pinkSaleICO = new websupply.eth.Contract(
        PinksaleICOContractABI,
        contractAddress
      );
      let tokenDetail = await pinkSaleICO.methods.tokeninfo().call();
      let icoInfo = await pinkSaleICO.methods.ICO_info().call();
      // console.log("buy_token_name ", icoInfo.buy_token_name);

      let icoProgress = await pinkSaleICO.methods.status().call();
      let soldPercent = (icoProgress.sold_amount / icoInfo.token_supply) * 100;
      let currentDateSeconds = Math.round(new Date().getTime() / 1000);
      console.log(currentDateSeconds);
      let endTimeLessthenStartTime;
      let timeInfo;

      if (currentDateSeconds < Number(icoInfo.ICO_start)) {
        timeInfo = {
          timerTitle: "  ICO Starts In",
          seconds: icoInfo.ICO_start,
          backgroundcolor: "#fdfaea",
          color: "#d29813",
          title: "Upcoming",
        };
      } else if (currentDateSeconds < Number(icoInfo.ICO_end)) {
        timeInfo = {
          timerTitle: "  ICO Ends In",
          seconds: icoInfo.ICO_end,
          backgroundcolor: "#d1fae5",
          color: "#10b981",
          title: "ICO Live",
        };
      } else {
        timeInfo = {
          timerTitle: "  ICO Ended ",
          seconds: icoInfo.ICO_end,
          backgroundcolor: "#ffeaef",
          color: "#ff3465",
          title: "ICO Ended",
        };
      }
      console.log("timeinfo", timeInfo);
      let icoStartdate = new Date(icoInfo.ICO_start * 1000);
      icoStartdate = icoStartdate.toUTCString();
      let icoEnddate = new Date(icoInfo.ICO_end * 1000);
      icoEnddate = icoEnddate.toUTCString();

      obj = {
        tokenName: tokenDetail.name,
        tokenSymbol: tokenDetail.symbol,
        totalSupply: websupply.utils.fromWei(icoInfo.token_supply),
        soldAmount: websupply.utils.fromWei(icoProgress.sold_amount),
        startTime: icoInfo.ICO_start,
        endTime: icoInfo.ICO_end,
        progressInPercent: soldPercent,
        timeInfo: timeInfo,
        exchangeRate: icoInfo.token_rate,
        tokenAddress: icoInfo.sale_token,
        icoAddress: totalIcos[index],
        icoStartDate: icoStartdate,
        icoEndDate: icoEnddate,
        tokenDecimals: tokenDetail.decimal,
        currency: icoInfo.buy_token_name,
      };
      // allIcosInfo.push(obj);

      console.log("");
      allIcosInfo = [...allIcosInfo, { ...obj }];
      // console.log("icoInfo", icoInfo.token_supply);
      // console.log("icoProgress", icoProgress);
    }
    // console.log("objectobject", allIcosInfo);

    setTotalIcosForUser([...allIcosInfo]);
  };
  console.table(totalIcos);
  useEffect(() => {
    allIcos();
    allIcosForUser();
  }, []);
  const updateFlag = async () => {
    setFlag(!flag);
  };
  const updateFlagForUSer = async () => {
    setFlagForUser(!flagForUSer);
  };
  const Completionist = () => (
    <div className="mt-2">
      <div className="text-center">
        <span className="">{getData?.timeInfo.timerTitle}</span>
      </div>
      <div className="main_time mt-2 d-flex justify-content-center">
        <div className="pik_clr p-2 arounded">00</div>
        <div className="pik_clr p-2 arounded">00</div>
        <div className="pik_clr p-2 arounded">00</div>
        <div className="pik_clr p-2 arounded">00</div>
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
        <div className="mt-2">
          <div className="text-center">
            <span className="">{getData?.timeInfo.timerTitle}</span>
          </div>
          <div className="main_time mt-2 d-flex justify-content-center">
            <div className="pik_clr p-2 arounded">{days}</div>
            <div className="pik_clr p-2 arounded">{hours}</div>
            <div className="pik_clr p-2 arounded">{minutes}</div>
            <div className="pik_clr p-2 arounded">{seconds}</div>
          </div>
        </div>
      );
    }
  };
  const LaunchpadList = (props) => {
    return (
      <div className="launh_grid">
        {totalIcos.map((item, index, arr) => {
          return (
            <Launchpad_card
              img_card={Card_img}
              totalSupply={`1 BNB = ${item.totalSupply} ${item.tokenSymbol}`}
              para_3="(0.00%)"
              soldAmountForProgress={`${item.soldAmount} ${item.tokenSymbol}`}
              totalSupplyForProgress={`${item.totalSupply} ${item.tokenSymbol}`}
              tokenName={item.tokenName}
              tokenSymbol={item.tokenSymbol}
              startTime={item.startTime}
              endTime={item.endTime}
              progressInPercent={item.progressInPercent}
              timeInfo={item.timeInfo}
              flag={flag}
              updateFlag={props.updateFlag}
              setIndex={setIndex}
              index={index}
              dummy={"2"}
            />
          );
        })}
      </div>
    );
  };

  const LaunchpadListForUSer = (props) => {
    return (
      <div className="launh_grid">
        {totalIcosForUser.map((item, index, arr) => {
          return (
            <Launchpad_card
              img_card={Card_img}
              totalSupply={`1 BNB = ${item.totalSupply} ${item.tokenSymbol}`}
              para_3="(0.00%)"
              soldAmountForProgress={`${item.soldAmount} ${item.tokenSymbol}`}
              totalSupplyForProgress={`${item.totalSupply} ${item.tokenSymbol}`}
              tokenName={item.tokenName}
              tokenSymbol={item.tokenSymbol}
              startTime={item.startTime}
              endTime={item.endTime}
              progressInPercent={item.progressInPercent}
              timeInfo={item.timeInfo}
              flag={flag}
              dummy={"1"}
              updateFlag={props.updateFlagForUSer}
              setIndex={setIndex}
              index={index}
            />
          );
        })}
      </div>
    );
  };

  function Launchpad_list_view(props) {
    const [bnbValue, setbnbValue] = React.useState({
      bnbvalues: "",
      swapedValue: "",
    });
    const [swapedValue, setSwapedValue] = React.useState("");
    if (props.dummy == 2) {
      getData = totalIcos[index];
    } else if (props.dummy == 1) {
      getData = totalIcosForUser[index];
    }
    const swapValue = async (e, exchangerate) => {
      const updatedValue = {
        bnbvalues: e.target.value,
        swapedValue: e.target.value * exchangerate,
      };
      setbnbValue((bnbValue) => ({ ...bnbValue, ...updatedValue }));
    };
    const buy = async () => {
      const web3 = window.web3;
      let acc = await loadWeb3();
      let pinkSaleICO = new web3.eth.Contract(
        PinksaleICOContractABI,
        getData.icoAddress
      );
      console.log("pinkSaleICO", pinkSaleICO);
      console.log("amount", web3.utils.toWei(bnbValue.bnbvalues));

      let swap = await pinkSaleICO.methods.buyWithBNB().send({
        from: acc,
        value: web3.utils.toWei(bnbValue.bnbvalues),
      });
    };
    const withdrawRemaningSaleTokens = async () => {
      const web3 = window.web3;
      let acc = await loadWeb3();
      let pinkSaleICO = new web3.eth.Contract(
        PinksaleICOContractABI,
        getData.icoAddress
      );

      let ownerWithdrawCollectedBNBs = await pinkSaleICO.methods
        .ownerWithdrawRemainingTokens()
        .send({
          from: acc,
        });
    };
    const withdrawCollectedBNB = async () => {
      const web3 = window.web3;
      let acc = await loadWeb3();
      let pinkSaleICO = new web3.eth.Contract(
        PinksaleICOContractABI,
        getData.icoAddress
      );

      let ownerWithdrawRemainingTokens = await pinkSaleICO.methods
        .ownerWithdrawCollectedBNBs()
        .send({
          from: acc,
        });
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 py-5 px-4 main_shade">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-11">
                <button
                  className="btn text-white mb-3"
                  onClick={() => {
                    {
                      props.dummy == 2
                        ? setFlag(!flag)
                        : setFlagForUser(!flagForUSer);
                    }
                  }}
                >
                  Go Back
                </button>
                <div className="row spac_cls">
                  <div className="col-lg-7 col-sm-12 view_shade text-white ">
                    <div className="row my-4">
                      <div className="col-lg-2 col-sm-12">
                        <figure className="pic_left">
                          {/* <img src={lft_img} alt="" className="min_img" /> */}
                        </figure>
                      </div>

                      <div className="col-lg-10 col-sm-12 lft_boox">
                        <div className="heading_outer_layer d-flex justify-content-between ">
                          <div className="left_item">
                            <h1 className="epn_cls">{getData?.tokenName}</h1>
                          </div>
                          <div className="right_item">
                            <p
                              className={` px-2 rounded-pill `}
                              style={{
                                backgroundColor: `${getData?.timeInfo.backgroundcolor}`,
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
                                  fill={`${getData?.timeInfo.color}`}
                                />
                              </svg>
                              <span
                                className="text-"
                                style={{
                                  color: `${getData?.timeInfo.color}`,
                                }}
                              >
                                <small>{getData?.timeInfo.title}</small>
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* <div className="icons_outer d-flex ">
                          <div className="icon_1"><TbWorld className="con_siz" /></div>
                          <div className="icon_2"><FiTwitter className="con_siz" /></div>
                          <div className="icon_3"><RiFacebookCircleLine className="con_siz" /></div>
                          <div className="icon_4">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" fontSize={"23"} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path></svg>
                          </div>
                          <div className="icon_5"><AiOutlineInstagram className="con_siz" /></div>
                          <div className="icon_6"><BsDiscord className="con_siz" /></div>
                        </div>
  
                        <div className="detail_box mt-4">
                          <p className='perag text-start'>
                            A powerful exchange that comprises the power of two potential exchanges of the cryptocurrency market is the Hybrid Exchange. It is an exchange platform that amalgamates the features of both centralized and decentralized exchanges, it is best suited for big businesses and revenue-driven models. And in the end, what the user gets is a highly-secure, user-friendly, reliable and transparent exchange for allowing traders and investors to make fair and unbiased decisions.
                          </p>
                        </div> */}
                      </div>
                    </div>

                    <div className="tab_main_layer py-3">
                      <table className="table">
                        <tbody>
                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">ICO Address</td>
                            <td className="for_blu brd_no">
                              <a
                                href={`https://testnet.bscscan.com/address/${getData?.icoAddress}`}
                                target="_blank"
                                className="text-decoration-none"
                              >
                                {getData?.icoAddress}
                              </a>
                            </td>
                          </tr>
                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">Token Name</td>
                            <td className="text-white brd_no">
                              {getData?.tokenName}
                            </td>
                          </tr>
                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">Token Symbol</td>
                            <td className="text-white brd_no">
                              {" "}
                              {getData?.tokenSymbol}
                            </td>
                          </tr>
                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">
                              Token Decimals
                            </td>
                            <td className="text-white brd_no">
                              {getData?.tokenDecimals}
                            </td>
                          </tr>
                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">Token Address</td>
                            <td className="for_blu brd_no">
                              <a
                                className="text-decoration-none"
                                href={`https://testnet.bscscan.com/address/${getData?.tokenAddress}`}
                                target="_blank"
                              >
                                {getData?.tokenAddress}
                              </a>
                            </td>
                          </tr>
                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">Total Supply</td>
                            <td className="text-white brd_no">
                              {getData?.totalSupply} {getData?.tokenSymbol}
                            </td>
                          </tr>

                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">Exchange Rate</td>
                            <td className="text-white brd_no">
                              {`1 BNB = ${getData?.exchangeRate} ${getData?.tokenSymbol}
                              `}
                            </td>
                          </tr>

                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">Unsold Tokens</td>
                            <td className="text-white brd_no">Refund</td>
                          </tr>
                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">
                              ICO Start Time
                            </td>
                            <td className="text-white brd_no">
                              {getData?.icoStartDate}
                            </td>
                          </tr>
                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">ICO End Time</td>
                            <td className="text-white brd_no">
                              {getData?.icoEndDate}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-12 view_shade view_tow text-white pt-3">
                    {/* <div className="tab_main_layer py-3">
                      <table className="table">
                        <tbody>
                          <tr className="d-flex justify-content-between trr_brd_b">
                            <td className="text-white brd_no">Status</td>
                            <td className="for_blu brd_no">inprogress</td>
                          </tr>
                        </tbody>
                      </table>
                    </div> */}
                    <Countdown
                      date={
                        Date.now() +
                        (String(getData?.timeInfo.seconds * 1000) - Date.now())
                      }
                      renderer={renderer}
                    />

                    <div className="pro_bar mt-4">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow="50"
                          aria-valuemin="50"
                          style={{
                            width: `${getData?.progressInPercent}%`,
                          }}
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="head_pro d-flex justify-content-between">
                        <span>
                          {getData?.soldAmount} {getData?.tokenSymbol}
                        </span>
                        <span>
                          {getData?.totalSupply} {getData?.tokenSymbol}
                        </span>
                      </div>
                    </div>

                    <div className="feild my-4">
                      <Form>
                        <Form.Group
                          className="mb-3 text-start"
                          controlId="formBasicEmail"
                        >
                          <Form.Label>
                            Amount in {`${getData?.currency}`}{" "}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="0.0"
                            value={bnbValue.bnbvalues}
                            onChange={(e) => {
                              swapValue(e, getData?.exchangeRate);
                            }}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3 text-start"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>
                            Amount in {`${getData?.tokenName}`}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="0.0"
                            value={bnbValue.swapedValue}
                          />
                        </Form.Group>
                        {console.log(
                          "disable",
                          JSON.parse(
                            `${
                              getData?.timeInfo.title == "Upcoming"
                                ? true
                                : false
                            }`
                          )
                        )}

                        <div className="btn_uper_layer d-flex justify-content-md-start justify-content-center">
                          <Button
                            variant="primary "
                            className="text-start swit_bbtn mx-auto"
                            disabled={JSON.parse(
                              `${
                                getData?.timeInfo.title == "Upcoming"
                                  ? true
                                  : false
                              }`
                            )}
                            onClick={buy}
                          >
                            BUY
                          </Button>
                        </div>
                        {props.dummy == 1 && (
                          <>
                            <div className="btn_uper_layer d-flex mt-3 justify-content-md-start justify-content-center">
                              <Button
                                variant="primary "
                                className="text-start swit_bbtn mx-auto"
                                disabled={JSON.parse(
                                  `${!(getData?.timeInfo.title == "ICO Ended"
                                    ? true
                                    : false)}`
                                )}
                                onClick={withdrawCollectedBNB}
                              >
                                Withdraw Collected BNB
                              </Button>
                            </div>
                            <div className="btn_uper_layer d-flex mt-3 justify-content-md-start justify-content-center">
                              <Button
                                variant="primary "
                                className="text-start swit_bbtn mx-auto"
                                disabled={JSON.parse(
                                  `${!(getData?.timeInfo.title == "ICO Ended"
                                    ? true
                                    : false)}`
                                )}
                                onClick={withdrawRemaningSaleTokens}
                              >
                                Withdraw Remaning Sale Tokens
                              </Button>
                            </div>
                          </>
                        )}

                        {/* <div className="btn_uper_layer d-flex py-3 justify-content-md-start justify-content-center">
                          <Button
                            variant="primary "
                            className="text-start swit_bbtn mx-auto"
                            disabled={JSON.parse(
                              `${
                                getData.timeInfo.title == "Upcoming"
                                  ? true
                                  : false
                              }`
                            )}
                            onClick={buy}
                          >
                            Withdraw Collected Buy Tokens
                          </Button>
                        </div> */}
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row warn_box justify-content-center mt-5">
              <div className="col-lg-9 col-sm-9">
                <p className="text-white">
                  Disclaimer: The information provided shall not in any way
                  constitute a recommendation as to whether you should invest in
                  any product discussed. We accept no liability for any loss
                  occasioned to any person acting or refraining from action as a
                  result of any material provided or published
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            className="mt-4"
          >
            <Tab
              label="All launchpads"
              {...a11yProps(0)}
              onClick={() => {
                setFlag(true);
                setFlagForUser(true);
              }}
            />
            <Tab
              label="My Contributions"
              {...a11yProps(1)}
              onClick={() => {
                setFlag(true);
                setFlagForUser(true);
              }}
            />
          </Tabs>
          <div className="input_filed mt-5 px-4 px-md-5 ">
            <div className="text-start for_fnt"></div>

            <Form.Control
              type="url"
              className="url_input input_flied_of_pink "
              placeholder="Enter token address"
              autoComplete="on"
            />
          </div>
        </Box>
        <TabPanel value={value} index={0} className="">
          {flag == true ? (
            <>
              <LaunchpadList updateFlag={updateFlag} />
            </>
          ) : (
            <>
              <Launchpad_list_view dummy={"2"} />
            </>
          )}
          {/* <div className="launh_grid">
            {totalIcos.map((item, index, arr) => {
              return (
                <Launchpad_card
                  img_card={Card_img}
                  totalSupply={`1 BNB = ${item.totalSupply} ${item.tokenSymbol}`}
                  para_3="(0.00%)"
                  soldAmountForProgress={`${item.soldAmount} ${item.tokenSymbol}`}
                  totalSupplyForProgress={`${item.totalSupply} ${item.tokenSymbol}`}
                  tokenName={item.tokenName}
                  tokenSymbol={item.tokenSymbol}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  progressInPercent={item.progressInPercent}
                  timeInfo={item.timeInfo}
                  flag={flag}
                  // updateFlag={props.updateFlag}
                  setIndex={setIndex}
                  index={index}
                />
              );
            })}
          </div> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {flagForUSer == true ? (
            <>
              <LaunchpadListForUSer updateFlagForUSer={updateFlagForUSer} />
            </>
          ) : (
            <>
              <Launchpad_list_view dummy={"1"} />
            </>
          )}

          {/* <Launchpad_card
              img_card={Card_img}
              para_1="Tweetfi"
              para_2="1 BNB = 30,000 TW."
              para_3="(0.00%)"
              BNB_1="0 BNB"
              BNB_2="200 BNB"
            />
            <Launchpad_card
              img_card={Card_img2}
              para_1="untitled presale"
              para_2="150 BNB - 250 BNB"
              para_3="(0.00%)"
              BNB_1="0 BNB"
              BNB_2="250 BNB"
            />
            <Launchpad_card
              img_card={Card_img3}
              para_1="-"
              para_2="0.1 BNB"
              para_3="(0.00%)"
              BNB_1="0 BNB"
              BNB_2="200 BNB"
            />
            <Launchpad_card
              img_card={Card_img4}
              para_1="untitled presale"
              para_2="1 USDC - 2 USDC"
              para_3="(0.00%)"
              BNB_1="0 USDC"
              BNB_2="2 USDC"
            />
            <Launchpad_card
              img_card={Card_img4}
              para_1="aa"
              para_2="0.002 BNB - 0.003 BNB"
              para_3="(0.00%)"
              BNB_1="0 BNB"
              BNB_2="200 BNB"
            />
            <Launchpad_card
              img_card={Card_img4}
              para_1="Etherst"
              para_2="120 BNB"
              para_3="(0.00%)"
              BNB_1="0 BNB"
              BNB_2="200 BNB"
            /> */}
        </TabPanel>
      </Box>
      {/* {flag == true ? (
        <>
          <LaunchpadList updateFlag={updateFlag} />
        </>
      ) : (
        <>
          <Launchpad_list_view />
        </>
      )} */}
    </>
  );
}
