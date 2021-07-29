import React from "react";
// Page Title Bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import FormSubmitButtons from "Components/Form/FormSubmitButtons";
import FormDuplicateButtons from "Components/Form/FormDuplicateButtons";
import FormEditButtons from "Components/Form/FormEditButtons";
import { Row } from "react-bootstrap";

const FormWrapper = props => (
  <React.Fragment>
    <PageTitleBar
      title={props.title}
      centerTitle={<IntlMessages id={props.centerTitle} />}
      promptMessage={<IntlMessages id={props.promptMessage} />}
      listRedirect={props.listRedirect}
      noBack={props.noBack}
      customButton={
        <div className="text-right" 
             style={{ display:"flex",flexDirection:"row"}}  >
        
          <FormSubmitButtons
          onSave={props.onSave}
          onSaveNew={props.onSaveNew}
          disabled={props.disabled}
          edit={props.edit}
          name={props.name}
          hidden={props.hidden}
        />
        {props.showEditButton &&  <FormEditButtons
          onChangeToEdit={props.onChangeToEdit}
          name={props.name}
          color="#df0021"
          // hidden={props.hiddenEdit}
        />}
       {props.showDuplicateButton &&
          <FormDuplicateButtons
          onDuplicate={props.onDuplicate}
          // edit={props.edit}
          name={props.name}
          // hidden={props.hiddenDuplicate}
        />
       }
        </div>
       
      } 
    />
    {/* <div className="row mb-30"> */}
    {
      /*
        <div className="col text-right FormDuplicateButtons">
          {
            <FormDuplicateButtons
            onDuplicate={props.onDuplicate}
            disabled={props.disabled}
            edit={props.edit}
            name={props.name}
            color="#df0021"
            hidden={props.hidden}
          />
          }
        </div>
      */ 
    }
   
    
    {props.children}

    <div className="row mb-30">
      <div className="col text-right">
        <FormSubmitButtons
          onSave={props.onSave}
          onSaveNew={props.onSaveNew}
          disabled={props.disabled}
          edit={props.edit}
          name={props.name}
          color="#df0021"
          hidden={props.hidden}
        />
      </div>
    </div>
  </React.Fragment>
);

export default FormWrapper;
