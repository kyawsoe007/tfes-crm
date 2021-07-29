import React from "react";
import PricingBlock from "Components/Widgets/PricingBlock";
import Radio from "@material-ui/core/Radio";

const SelectPlanForm = props => {
  const { priceplan, handleRegForm } = props;
  return (
    <div className="price-list mb-0 w-100 p-3">
      <div className="row row-eq-height mb-30">
        <PricingBlock
          planType="free"
          type="Basic"
          color="primary"
          description="Start. Explore. Build. "
          price="Free"
          users={1}
          features={[
            "Dashboards views provide critical info at a glance",
            "Deal stages from Prospect to Closed",
            "Calendar view for events, notifications and reminders"
          ]}
          radioButton={
            <Radio
              checked={priceplan == "free"}
              onChange={() => {
                handleRegForm("priceplan", "free");
                props.validatePlate("free");
              }}
              value="d"
              color="primary"
              name="radio-button-demo"
              inputProps={{ "aria-label": "D" }}
            />
          }
        />
        <PricingBlock
          planType="premium"
          type="Pro"
          color="everyday-sec"
          description="Hunt. Lead. Conquer"
          price={10}
          users={1}
          features={[
            "Dashboards views provide critical info at a glance",
            "Deal stages from Prospect to Closed",
            "Calendar view for events, notifications and reminders",
            "Manage Sales teams",
            "Precise access and security settings",
            "Periodic customer, pipeline and sales reports",
            "Create invoices and track payments"
          ]}
          // radioButton={
          //   <Radio
          //     checked={priceplan == "pro"}
          //     onChange={() => {
          //       handleRegForm("priceplan", "pro");
          //       props.validatePlate("pro");
          //     }}
          //     value="d"
          //     color="secondary"
          //     name="radio-button-demo"
          //     inputProps={{ "aria-label": "D" }}
          //   />
          // }
        />
      </div>
    </div>
  );
};

export default SelectPlanForm;
