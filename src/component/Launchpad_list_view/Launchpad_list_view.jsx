import React from "react";
import "./Launchpad_list_view.css";
import lft_img from "../Assets/epnoc.jpeg";
import { BsDot } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { FiTwitter } from "react-icons/fi";
import { RiFacebookCircleLine } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Launchpad_list_view() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 py-5 px-4 main_shade">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-11">
              <div className="row spac_cls">
                <div className="col-lg-7 col-sm-12 view_shade text-white ">
                  <div className="row my-4">
                    <div className="col-lg-2 col-sm-12">
                      <figure className="pic_left">
                        <img src={lft_img} alt="" className="min_img" />
                      </figure>
                    </div>

                    <div className="col-lg-10 col-sm-12 lft_boox">
                      <div className="heading_outer_layer d-flex justify-content-between ">
                        <div className="left_item">
                          <h1 className="epn_cls">EPNOC Presale</h1>
                        </div>
                        <div className="right_item">
                          <p className=" p_bgs text-white px-2 gap-1">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 16 16"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="8" cy="8" r="8"></circle>
                            </svg>
                            Sale Live
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
                          <td className="text-white brd_no">Manual Listing</td>
                          <td className="for_blu brd_no">
                            Liquidity will not be automatically added!
                          </td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Presale Address</td>
                          <td className="for_blu brd_no">
                            <a href="" className="text-decoration-none">
                              {" "}
                              0xd34bF1Cf09da6009C91Caa98107C42174e049DF5
                            </a>
                          </td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Token Name</td>
                          <td className="text-white brd_no">EPNOC</td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Token Symbol</td>
                          <td className="text-white brd_no">EPN</td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Token Decimals</td>
                          <td className="text-white brd_no">18</td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Token Address</td>
                          <td className="for_blu brd_no">
                            <a href="" className="text-decoration-none">
                              {" "}
                              0x2263f9585f891F5AE6C281834Bc6D330c203A60e
                            </a>
                          </td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Total Supply</td>
                          <td className="text-white brd_no">
                            1,000,000,000 EPN
                          </td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">
                            Tokens For Presale
                          </td>
                          <td className="text-white brd_no">152,000,000 EPN</td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Presale Rate</td>
                          <td className="text-white brd_no">
                            1 BNB = 9,500 EPN
                          </td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Soft Cap</td>
                          <td className="text-white brd_no">8,000 BNB</td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Hard Cap</td>
                          <td className="text-white brd_no">16,000 BNB</td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Unsold Tokens</td>
                          <td className="text-white brd_no">Refund</td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">
                            Presale Start Time
                          </td>
                          <td className="text-white brd_no">
                            2023.01.17 00:02 (UTC)
                          </td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">
                            Presale End Time
                          </td>
                          <td className="text-white brd_no">
                            2023.03.07 00:03 (UTC)
                          </td>
                        </tr>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">
                            Liquidity Percent
                          </td>
                          <td className="for_blu brd_no">(Manual listing)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-lg-4 col-sm-12 view_shade view_tow text-white">
                  <div className="tab_main_layer py-3">
                    <table className="table">
                      <tbody>
                        <tr className="d-flex justify-content-between trr_brd_b">
                          <td className="text-white brd_no">Status</td>
                          <td className="for_blu brd_no">inprogress</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-2">
                    <div>
                      <span>Presale Ends In</span>
                    </div>
                    <div className="main_time mt-2 d-flex justify-content-center">
                      <div className="pik_clr p-2 arounded">48</div>
                      <div className="pik_clr p-2 arounded">11</div>
                      <div className="pik_clr p-2 arounded">51</div>
                      <div className="pik_clr p-2 arounded">40</div>
                    </div>
                  </div>

                  <div className="pro_bar mt-4">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-label="Basic example"
                        style={{ width: " 50%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="head_pro d-flex justify-content-between">
                      <span>0 BNB</span>
                      <span>16,000 BNB</span>
                    </div>
                  </div>

                  <div className="feild my-4">
                    <Form>
                      <Form.Group
                        className="mb-3 text-start"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="0.0" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3 text-start"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Amount 2</Form.Label>
                        <Form.Control type="number" placeholder="0.0" />
                      </Form.Group>

                      <div className="btn_uper_layer d-flex justify-content-md-start justify-content-center">
                        <Button
                          variant="primary "
                          className="text-start swit_bbtn"
                          type="submit"
                        >
                          Switch Network To BSC
                        </Button>
                      </div>
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

export default Launchpad_list_view;
