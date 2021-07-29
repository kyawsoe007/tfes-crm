import React, { Component } from "react";
import { connectModal } from "redux-modal";

import FullScreenDialog from "Components/Dialog/FullScreenDialog";

class TemplatePreviewDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { show, handleHide, toEdit } = this.props;
        let title = "";
        let html = "";
        if (toEdit) {
            title = toEdit.title;
            html = toEdit.html;
        }
        return (
            <FullScreenDialog
                title={title}
                show={show}
                handleHide={handleHide}
            >
                <iframe
                    scrolling="yes"
                    frameBorder={1}
                    style={{
                        width: "100%",
                        minHeight: "700px"
                    }}
                    src={
                        "data:text/html;charset=utf-8," +
                        encodeURIComponent(html)
                    }
                >
                </iframe>
            </FullScreenDialog>
        );
    }
}
export default connectModal({ name: "preview_template" })(TemplatePreviewDialog);
