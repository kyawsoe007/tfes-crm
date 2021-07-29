import React from "react";

import InvoiceProductInput from "Components/Form/Inputs/Accounting/InvoiceProductInput";
import moment from "moment"


const ViewTemplate = ({ order, id, disabled }) => {
  
  return (
    <div className="p-20">
      <div className="d-flex justify-content-between mb-50">
        <div className="sender-address">
          <div className="invoice-logo mb-30">
            <img
              src={require("Assets/img/appLogo_orig_dark.png")}
              alt="session-logo"
              className="img-fluid"
              width="160"
            />
          </div>
          
        </div>
        <div className="companyAddress text-right">
          <div className="address">
            <span>{order.address_1} {order.address_2}</span>
            <span>{order.city} {order.zip} </span>

            {/* <span>95014 Cuperino, CA</span>
            <span>United States</span> */}
          </div>
        </div>
        
      </div>
      <div className="d-flex justify-content-between mb-30 add-full-card">
     
          <div className="add-card" style={{borderRadius: 15, margin: 5}}>
            <h4 className="mb-15">Attn To</h4>
            <span>{order.details}</span>
          </div>
       
          <div className="add-card" style={{borderRadius: 15, margin: 5}}>
            <h4 className="mb-15">Ship To</h4>
            <span>{order.details}</span>
          </div>

          {/* <div className="invoice-address text-right">
            <h3>{id}</h3>
            <div className="d-flex flex-column">
              <span>Last sent: {moment(order.sent_date).format("LL")}</span>
            </div>
          </div> */}
      </div>

      <div >
        {/* <table className="table table-borderless"> */}
          {/* <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Discount</th>
              <th>Tax</th>
              <th>Total</th>
            </tr>
          </thead> */}
          {/* <tbody> */}
            {/* {order.products &&
              order.products.map((product, key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{product.name}</td>
                  <td>{product.qty}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>0%</td>
                  <td>$0</td>
                  <td>${product.total.toFixed(2)}</td>
                </tr>
              ))} */}

              <div>
                show invoice/quotations items
              </div>
          {/* <InvoiceProductInput
            products={order.quotationline}
            invoice={order}
            disabled={disabled}
            handleChange={this.props.handleProdQuote}
            handleAdd={this.props.addNewProdQuote}
            handleRemove={this.props.removeProdQuote}
          /> */}

            {/* <tr>
              <td colSpan="5">&nbsp;</td>
              <td className="fw-bold">Subtotal</td>
              <td>${order.netAmt}</td>
            </tr>
            <tr>
              <td colSpan="5">&nbsp;</td>
              <td className="fw-bold">Discount</td>
              <td>${order.totalAmt}</td>
            </tr>
            {order.shipping && (
              <tr>
                <td colSpan="5">&nbsp;</td>
                <td className="fw-bold">Shipping</td>
                <td>${order.shipping}</td>
              </tr>
            )}
            <tr>
              <td colSpan="5">&nbsp;</td>
              <td className="fw-bold">Tax</td>
              <td>${order.totalAmt}</td>
            </tr>
            <tr>
              <td colSpan="5">&nbsp;</td>
              <td className="fw-bold">Total</td>
              <td>${order.totalAmt}</td>
            </tr> */}
          {/* </tbody> */}
        {/* </table> */}
      </div>
      <div className="note-wrapper row">
        <div className="invoice-note col-sm-12 col-md-8">
          <h3>Description</h3>
          <p className="fs-12">{order.description}</p>
          <p>
            {" "}
            <strong>Valid For: </strong> 30 days
          </p>
          <h3>Terms & Conditions</h3>
          <p className="fs-12">{order.terms}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewTemplate;
