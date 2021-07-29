import React from "react";
import Moment from 'moment'

const AccountingDetails = ({
  accountID,
  status,
  account,
  customer,
  sent_date,
  created_date,
  owner,
  type,
  price,
  version,
  currency
}) => {
  
  const bgColor =
    (type == "quotation" && "#7fb38b") ||
    (type == "invoice" && "#7f8cb3") ||
    (type == "credit_note" && "#7f82b3") ||
    (type == "payment" && "#b37f7f");
  return (
    <div className="user-profile-widget" >
      <div className="py-60" style={{ background: bgColor}} />


      <div style={{ padding: "0.4rem 6%" }}>


        <div className="d-flex user-avatar">
          <div className="user-info text-white pt-10" style={{paddingBottom: 10}}>
            <h1 className="mb-0">{accountID}</h1>
            {/* <span>{status}</span> */}
            <br />
            <span>{Moment(created_date).format('LL')}</span>
          </div>
        </div>


        <ul className="list-unstyled my-25" style={{ paddingLeft: "10%" }}>
          <li className="py-10 d-flex align-items-center">
            <i className="zmdi zmdi-email mr-20 fs-12" />
            <a href="mail-to:phoebe@gmail.com" className="fs-14 text-dark">
            Status: {status}
            </a>
          </li>
          <li className="py-10 d-flex align-items-center">
            <i className="zmdi zmdi-email mr-20 fs-12" />
            <a href="mail-to:phoebe@gmail.com" className="fs-14 text-dark">
              Version: {version}
            </a>
          </li>
          {account && (
            <li className="py-10 d-flex align-items-center">
              <i className="zmdi zmdi-email mr-20 fs-12" />
              <a href="mail-to:phoebe@gmail.com" className="fs-14 text-dark">
                Account: {account}
              </a>
            </li>
          )}
          {customer && (
            <li className="py-10 d-flex align-items-center">
              <i className="zmdi zmdi-email mr-20 fs-12" />
              <a href="mail-to:phoebe@gmail.com" className="fs-14 text-dark">
                Attn To: {customer}
              </a>
            </li>
          )}
          <li className="py-10 d-flex align-items-center">
            <i className="zmdi zmdi-email mr-20 fs-12" />
            <a href="mail-to:phoebe@gmail.com" className="fs-14 text-dark">
              {owner}
            </a>
          </li>
          <li className="py-10 d-flex align-items-center">
            <i className="zmdi zmdi-email mr-20 fs-12" />
            <a href="mail-to:phoebe@gmail.com" className="fs-14 text-dark">
              {price.toFixed(2) +' '+ currency}
            </a>
          </li>
          <li className="py-10 d-flex align-items-center">
            <i className="zmdi zmdi-email mr-20 fs-12" />
            <a href="mail-to:phoebe@gmail.com" className="fs-14 text-dark">
              {Moment(sent_date).format('LLL')}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountingDetails;
