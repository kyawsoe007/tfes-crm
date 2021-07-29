import React from "react";
import MaskedInput from "react-text-mask";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";

// import { connect } from "react-redux";
// import { handleRegForm } from "Actions";

function CreditCardMask(props) {
  return (
    <MaskedInput
      {...props}
      guide={false}
      keepCharPositions={true}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        "-",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        "-",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        "-",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholder="xxxx - xxxx - xxxx - xxxx"
      showMask={false}
    />
  );
}

function CVCmask(props) {
  return (
    <MaskedInput
      {...props}
      className="form-control"
      guide={true}
      keepCharPositions={true}
      mask={[/\d/, /\d/, /\d/]}
      placeholder="123"
      showMask={false}
    />
  );
}
function CCexpiryMask(props) {
  return (
    <MaskedInput
      {...props}
      className="form-control"
      guide={true}
      keepCharPositions={true}
      mask={[/[0-1]/, /[0-9]/, "/", /\d/, /\d/]}
      placeholder="01/12"
      showMask={false}
    />
  );
}

const PaymentDetailForm = props => {
  const { handleRegForm, paymentInfo } = props;

  return (
    <div className="w-100 p-3">
      <Form>

        <FormGroup row className="has-wrapper" style={{display:'flex', justifyContent:'center', marginBottom: '1rem'}}>

          <div>
            <Label for="payment_name" className="fs-13 text-left" sm={12}>
              Cardholder name
            </Label>
            <Col>
              <Input
                value={paymentInfo.payment_name}
                style={{border:'1px solid rgba(0,0,0,0.08)', borderRadius: 10, paddingRight:40}}
                name="payment_name"
                id="payment_name"
                className="has-input input-md"
                bsSize="sm"
                onChange={e => {
                  handleRegForm("payment_name", e.target.value, "paymentInfo")
                }}
              />
              <span className="has-icon" style={{ top: "6px" }}>
                <i className="ti-user" />
              </span>
            </Col>
          </div>

          <div>
            <Label for="payment_no" className="fs-13 text-left" sm={12}>
              Credit card number
            </Label>
            <Col>
              <Input
                style={{border:'1px solid rgba(0,0,0,0.08)', borderRadius: 10, paddingRight:40}}
                value={paymentInfo.payment_no}
                name="payment_no"
                id="payment_no"
                className="has-input input-md"
                bsSize="sm"
                tag={CreditCardMask}
                onChange={e => {
                  handleRegForm("payment_no", e.target.value, "paymentInfo")
                }}
              />
              <span className="has-icon" style={{ top: "6px" }}>
                <i className="ti-credit-card" />
              </span>
            </Col>
          </div>

        </FormGroup>



        <FormGroup row className="has-wrapper" style={{display:'flex', justifyContent:'center', marginBottom: '1rem'}}>

          <div>
            <Label for="payment_expiry" className="fs-13 text-left" sm={12}>
              Valid To
            </Label>
            <Col >
              <Input
                value={paymentInfo.payment_expiry}
                style={{border:'1px solid rgba(0,0,0,0.08)', borderRadius: 10, paddingRight:40}}
                name="payment_expiry"
                id="payment_expiry"
                className="has-input input-md"
                bsSize="sm"
                tag={CCexpiryMask}
                onChange={e => {
                  handleRegForm("payment_expiry", e.target.value, "paymentInfo")
                }}
              />
              <span className="has-icon" style={{ top: "6px" }}>
                <i className="ti-calendar" />
              </span>
            </Col>
          </div>

          <div>
          <Label for="payment_code" className="fs-13 text-left" sm={12}>
              CVC
            </Label>
            <Col>
              <Input
                value={paymentInfo.payment_code}
                style={{border:'1px solid rgba(0,0,0,0.08)', borderRadius: 10, paddingRight:40}}
                name="payment_code"
                id="payment_code"
                className="input-md"
                bsSize="sm"
                tag={CVCmask}
                onChange={e => {
                  handleRegForm("payment_code", e.target.value, "paymentInfo")
                }}
              />
              <span className="has-icon" style={{ top: "6px" }}>
                <i className="ti-credit-card" />
              </span>
            </Col>
          </div>

        </FormGroup>


    
      </Form>
    </div>
  );
};
// const mapStateToProps = ({ authUser }) => {
//   const { register } = authUser;
//   const { paymentInfo } = register.form;
//   return { paymentInfo };
// };

// export default connect(
//   mapStateToProps,
//   { handleRegForm }
// )(PaymentDetailForm);

export default PaymentDetailForm