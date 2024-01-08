import React, { useEffect, useState } from "react";

import "./Lockinfo.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadWeb3 } from "../../connectivity/connectivity";
import { pinkSaleLockAbi, pinkSaleLockContract } from "../../utilies/Contract";
import { allDataForToken, userData } from "../Token_pink/userData";
import { useParams } from "react-router";
import { locksForToken } from "../../features/pinksale/pinksaleSlice";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { BallTriangle } from "react-loader-spinner";

function Lockinfo() {
  const [data, setData] = useState({});
  const [lockedAmount, setlockedAmount] = useState("");
  const [description, setdescription] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [allLockedTokenForUser, setallLockedTokenForUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [showLoader, setShowLoader] = useState(true);

  let history = useNavigate();

  //   const [trasenctionId, settrasenctionId] = useState("");
  const dispatch = useDispatch();

  const { id } = useParams();
  const allLockedData = useSelector((state) => state.pinksale.allLockedData);
  const lockForToken = useSelector((state) => state.pinksale.lockForToken);

  let obj = {};
  let arr = [];

  useEffect(() => {
    // get_All_data()
    setData(allLockedData[id]);
    const tokenAddress = allLockedData[id]?._token;
    const tokenSymbol = allLockedData[id]?._symbol;
    const tokenDecimals = allLockedData[id]?._tokenDecimals;
    const tokenName = allLockedData[id]?._tokenName;

    const transictionid = allLockedData[id]?._id;
    const lockedamount = allLockedData[id]?._amount;
    const description = allLockedData[id]?._description;
    // alert(description);
    setTokenName(tokenName);
    setTokenDecimals(tokenDecimals);
    setTokenSymbol(tokenSymbol);
    setTokenAddress(tokenAddress);
    setdescription(description);
    setlockedAmount(lockedamount);

    const fatchdata = async () => {
      const data = await allDataForToken(tokenAddress);
      data.forEach((element) => {
        let walletAdress = element.owner;
        let tokenAddress = element.token;
        let lockDate = element.lockDate;
        let unlockDate = element.unlockDate;
        let unlockedAmount = element.unlockedAmount;
        let lockedAmount = element.amount;

        obj = {
          walletAdress: walletAdress,
          tokenAddress: tokenAddress,
          tokenName: tokenName,
          tokenSymbol: tokenSymbol,
          tokenDecimals: tokenDecimals,
          lockDate: lockDate,
          unlockDate: unlockDate,
          unlockedAmount: unlockedAmount,
          lockedamount: lockedAmount,
        };

        arr = [...arr, obj];
        // console.log("arrarr", arr);

        dispatch(locksForToken(arr));
      });
      setShowLoader(false);

      setallLockedTokenForUser(data);
    };

    fatchdata();
    // settrasenctionId(transictionid);
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTokens = allLockedTokenForUser.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const setPageNumber = (event, value) => {
    // setPage(value);
    setCurrentPage(value);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 bg-light py-5  color_of_back_ground">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10  color_of_back_ground box_shadow">
              <div className="text-start border-bottom py-3">
                <span className="fw-bold">Lock info</span>
              </div>
              <div className="my-4">
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="left_txt">Current Locked Amount</span>
                  <span className="fnt_sz">{lockedAmount}</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="left_txt">Current Values Locked</span>
                  <span className="fnt_sz">$3,320</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="left_txt">Token Address</span>
                  <span className="fnt_sz">
                    <a
                      href={`https://testnet.bscscan.com/token/${tokenAddress}`}
                      target="_blank"
                      className="adrs"
                    >
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
                  <span className="fnt_sz">{tokenDecimals}</span>
                </div>
              </div>
            </div>
            <div className="row justify-content-center mt-4 p-0">
              <div className="col-lg-10 text-white pb-3 box_shadow color_of_back_ground ">
                <div className="text-start border-bottom py-3">
                  <span className="fw-bold">Lock records</span>
                </div>
                {showLoader ? (
                  <div className="d-flex justify-content-center mt-3">
                    <BallTriangle
                      height={40}
                      width={40}
                      radius={5}
                      color="#f95192"
                      ariaLabel="ball-triangle-loading"
                      wrapperClass={{}}
                      wrapperStyle=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table  text-white">
                        <thead>
                          <tr>
                            <th scope="col">Wallet</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Cycle(Id)</th>
                            <th scope="col">Cycle Release(%)</th>
                            <th scope="col">TGE(%)</th>
                            <th scope="col">Unlock time(UTC)</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentTokens.map((tokenInfo, index) => {
                            return (
                              <tr>
                                <td>
                                  <a
                                    className="adrs"
                                    href={`https://testnet.bscscan.com/address/${tokenInfo.owner}`}
                                    target="_blank"
                                  >
                                    {`${tokenInfo.owner.slice(
                                      0,
                                      6
                                    )}...${tokenInfo.owner.slice(
                                      tokenInfo.owner.length - 4
                                    )}`}
                                  </a>
                                </td>
                                <td>{tokenInfo.amount}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>
                                  {new Date(tokenInfo.lockDate * 1000)
                                    .toISOString()
                                    .slice(0, 19)}
                                </td>
                                <td>
                                  <div
                                    to="/Lockin"
                                    className="adrs  text-white"
                                    onClick={() => history(`/Lockin/${index}`)}
                                  >
                                    View
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Pagination
                        className="pag_color"
                        count={Math.ceil(
                          allLockedTokenForUser.length / postsPerPage
                        )}
                        variant="outlined"
                        shape="rounded"
                        page={currentPage}
                        onChange={setPageNumber}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* <div className="row d-flex justify-content-center mt-4 p-0">
              <div className="col-lg-10 bg-white">
                <div className="text-start border-bottom py-3">
                  <span className="fw-bold">Lock records</span>
                </div>

                <div className="row detl my-4">
                  <div className="col-lg-2">
                    <div className="wall text-start">
                      <div className="fr_edt">Wallet</div>
                      <div className="mt-3 ln_two_edt">0xdf7a...D81F</div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="wall text-start">
                      <div className="fr_edt">Amount</div>
                      <div className="mt-3 ln_two_edt">200,000,000</div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="wall text-start">
                      <div className="fr_edt">Cycle(d)</div>
                      <div className="mt-3">-</div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="wall text-start">
                      <div className="fr_edt">Cycle Release(%)</div>
                      <div className="mt-3">-</div>
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <div className="wall text-start">
                      <div className="fr_edt">TGE(%)</div>
                      <div className="mt-3">-</div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="wall text-start">
                      <div className="fr_edt">Unlock time(UTC)</div>
                      <div className="mt-3 d-flex justify-content-around">
                        <span className="ln_two_edt"> 2023.12.19 04:38</span>
                        <span>
                          <Link to="/Lockin" className="adrs">
                            View
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
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

export default Lockinfo;
