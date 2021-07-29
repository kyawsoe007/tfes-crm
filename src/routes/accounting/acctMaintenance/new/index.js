import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
//sub components
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
//icon
// Actions
import { getOneLineAccountItem, createAccountItem, patchAccountItem, getAllCurrencyData } from "Ducks/account-item"
import { acctMaintenanceListPage } from 'Helpers/accountingURL';

class acctMaintenanceFormView extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      id: this.props.location.data,
      accountCode: "",
      accountName: "",
      editable: false,
      currency: '',
      currencyName: '',
      internalType: "",
      debit: "0",
      credit: "0",
      balance: "0",
      companyCurrency: '',
      toggleFormSelection: true,
    }
  }
  componentDidMount() {
    const { data } = this.props.location
    if (data) {
      this.props.getOneLineAccountItem(data)
    }

    this.props.getAllCurrencyData();
  }


  componentDidUpdate(preProps, prevState) {
    if (preProps.singleAccountItem.data != this.props.singleAccountItem.data) {
      if (this.props.singleAccountItem.data && this.props.singleAccountItem.data._id) {
        if (!this.props.location.data) {

          this.props.history.push(`/app/accounting/acctMaintenance/${this.props.singleAccountItem.data._id}`)
        }
        if (this.props.location.data !== this.props.singleAccountItem.data._id) {
          this.props.history.push(`/app/accounting/acctMaintenance/${this.props.singleAccountItem.data._id}`)
        }
        this.setState({
          edit: true,
          accountCode: this.props.singleAccountItem.data.accountCode,
          accountName: this.props.singleAccountItem.data.accountName,
          debit: this.props.singleAccountItem.data.debit,
          credit: this.props.singleAccountItem.data.credit,
          balance: this.props.singleAccountItem.data.balance,
          toggleFormSelection: true,
          //  currencyName:this.props.singleAccountItem.data.currency,
          internalType: this.props.singleAccountItem.data.internalType,
          companyCurrency: this.props.singleAccountItem.data.companyCurrency
        })
      }
    }
    if (prevState !== this.state) {

      this.forceUpdate()
    }
  }

  onSubmit() {
    const data = {
      ...this.state
    };
    delete data.edit;
    delete data.toggleFormSelection;

    //If edit AcountItem
    if (this.state.edit) {
      this.props.patchAccountItem(data)
    }
    else {
      delete data.id;
      delete data._id;
      this.props.createAccountItem(data)

      // this.props.history.push(`/app/accounting/acctMaintenance/new/${ this.props.singleAccountItem.data._id}`)
    }
  }
  checkDisabled() {
    return true;
  }
  handleChange = (field, value) => {

    this.setState({ [field]: value })
  }
  /*
  calculateTotal(lines) {
    // For Currency
    let conversion = 0;
    // State rate will be the previous rate
    let rate = this.state.currentRate
    if (this.state.currency != null) {
      this.props.currencyData.data.currency.map(item => {
        if (item.id == this.state.companyCurrency) {
          conversion = item.rate / rate;
          conversion = conversion * (rate / 1);
          this.setState({
            companyCurrency:item.id,
            currencyName: item.name,
            currentRate: item.rate,
          });
        }
      })
    }
  }
  */
  handleSelectChange = (target, value) => {
    this.setState({
      target: value
    })
  }
  render() {
    const { edit, accountCode, accountName, internalType, currencyName, toggleFormSelection } = this.state;
    const { data } = this.props.currencyData

    return (
      <Fragment>
        <FormWrapper
          onSave={this.onSubmit}
          disabled={this.checkDisabled()}
          title="Back to Account List" centerTitle={this.state.edit ? 'Account list form page' : 'Add new Account List'}
          edit="test" promptMessage=" " listRedirect={acctMaintenanceListPage}
          hiddenEdit="none"
          hiddenDuplicate="none"
        >
          <div class="column" style={{ paddingLeft: "50px" }}>
            <div class="row">
              <div class="col-sm-4" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <FormInput
                  label="Account Code"
                  value={accountCode}
                  target="accountCode"
                  handleChange={this.handleChange}
                  isToggledEditForm={toggleFormSelection}
                  original={this.props.singleAccountItem.data.accountCode ? this.props.singleAccountItem.data.accountCode : ""}
                />
              </div>
              <div class="col-sm-4" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <FormInput
                  label="Account Name"
                  value={accountName}
                  target="accountName"
                  handleChange={this.handleChange}
                  isToggledEditForm={toggleFormSelection}
                  original={this.props.singleAccountItem.data.accountName ? this.props.singleAccountItem.data.accountName : ""}
                />
              </div>
              <div class="col-sm-4" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <FormInput
                  label="Currency"
                  value={this.state.companyCurrency}
                  target="companyCurrency"
                  isToggledEditForm={toggleFormSelection}
                  selectValueKey="id"
                  selectValueName="name"
                  selectValues={
                    this.props.currencyData.data.currency ? this.props.currencyData.data.currency : []
                  }
                  handleChange={this.handleChange}
                  original={this.props.singleAccountItem.data.companyCurrency ? this.props.singleAccountItem.data.companyCurrency : ""}

                />
              </div>

            </div>
            <div class="row">
              <div class="col-sm-8">
                <FormInput
                  label="Internal Type"
                  value={internalType}
                  target="internalType"
                  handleChange={this.handleChange}
                  selectValueName="name"
                  isToggledEditForm={toggleFormSelection}
                  selectValues={[
                    { name: 'INCOME', value: 'INCOME' },
                    { name: 'OTHER INCOME', value: 'OTHER INCOME' },
                    { name: 'COGS', value: 'COGS' },
                    { name: 'EXPENSES', value: 'EXPENSES' },
                    { name: 'CURRENT ASSETS', value: 'CURRENT ASSETS' },
                    { name: 'FIXED ASSETS', value: 'FIXED ASSETS' },
                    { name: 'CURRENT LIABILITIES', value: 'CURRENT LIABILITES' },
                    { name: 'LONG TERM LIABILITIES', value: 'LONG TERM LIABILITIES' },
                    { name: 'CAPITAL', value: 'CAPITAL' },
                  ]}
                  original={this.props.singleAccountItem.data.internalType ? this.props.singleAccountItem.data.internalType : ""}
                />
              </div>
            </div>


          </div>
        </FormWrapper>
      </Fragment>
    )


  }

}
const mapStateToProps = ({ accountItemState }) => {
  const { currencyData, singleAccountItem } = accountItemState;
  return { currencyData, singleAccountItem };
};
export default connect(mapStateToProps, { getOneLineAccountItem, patchAccountItem, createAccountItem, getAllCurrencyData })(acctMaintenanceFormView);