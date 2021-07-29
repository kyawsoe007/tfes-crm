import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { Add } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
// intl messages
import IntlMessages from "Util/IntlMessages";
import {
  // leadNewPage,
  // customerNewPage,
  // accountNewPage,
  // dealNewPage
} from "Helpers/crmURL";
import {
  quoteNewPage,
  invoiceNewPage,
  crednoteNewPage,
  newPayment
} from "Helpers/accountingURL";

const links = [
  // { title: "sidebar.lead", link: leadNewPage },
  // { title: "sidebar.customer", link: customerNewPage },
  // { title: "sidebar.account", link: accountNewPage },
  // { title: "sidebar.deal", link: dealNewPage }
  // { title: "sidebar.quotation", link: quoteNewPage },
  // { title: "sidebar.invoice", link: invoiceNewPage },
  // { title: "sidebar.payment", link: newPayment },
  // { title: "sidebar.credit_note", link: crednoteNewPage }
];

const QuickLinks = () => (
  <UncontrolledDropdown nav className="list-inline-item quickadd-dropdown">
    <DropdownToggle nav className="p-0">
      <Tooltip title="Add" placement="bottom">
        <IconButton aria-label="plus">
          <Add fontSize="small" />
        </IconButton>
      </Tooltip>
    </DropdownToggle>
    <DropdownMenu>
      <div className="dropdown-content py-5">
        <div className="dropdown-top d-flex justify-content-between rounded-top bg-secondary">
          <span className="text-white font-weight-bold">Add</span>
        </div>
        <Scrollbars
          className="rct-scroll"
          autoHeight
          autoHeightMin={100}
          autoHeightMax={350}
        >
          <ul className="list-unstyled mb-0 dropdown-list">
            {links.map((link, key) => (
              <li key={key}>
                <NavLink to={link.link}>
                  <IntlMessages id={link.title} />
                </NavLink>
              </li>
            ))}
          </ul>
        </Scrollbars>
      </div>
    </DropdownMenu>
  </UncontrolledDropdown>
);

export default QuickLinks;
