// import React, { Component } from "react";
// import { connectModal } from "redux-modal";

// import FullScreenDialog from "Components/Dialog/FullScreenDialog";
// import EmailEditor from "react-email-editor";

// class TemplateFormDialog extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       json: this.props.design,
//     };
//     this.onSubmit = this.onSubmit.bind(this);
//     this.onLoad = this.onLoad.bind(this);
//   }

//   onLoad = () => {
//     if (this.props.toEdit) {
//       if (this.editor !== undefined) {
//         this.editor.loadDesign(this.props.toEdit.design);
//       } else {
//         setTimeout(() => this.editor.loadDesign(this.props.toEdit.design), 2000);
//       }
//     }
//   };

//   onSubmit = () => {
//     this.editor.exportHtml((data) => {
//       const { design, html } = data;
//       this.props.toEdit ? this.props.onSave({ ...this.props.toEdit, design, html }) : this.props.onSave({ design, html });
//       this.props.handleHide();
//     });
//   };

//   render() {
//     const { show, handleHide } = this.props;
//     return (
//       <FullScreenDialog title="Template Editor" show={show} handleHide={handleHide} dialogActionLabel={"Save"} dialogAction={this.onSubmit}>
//         <EmailEditor
//           minHeight="700px"
//           appearance={{
//             customCSS: [
//               `body {
//                 background-color: yellow;
//               }`,
//             ],
//           }}
//           ref={(editor) => (this.editor = editor)}
//           onLoad={this.onLoad}
//         />
//       </FullScreenDialog>
//     );
//   }
// }
// export default connectModal({ name: "template_form" })(TemplateFormDialog);
import React, { Component } from "react";
import { connectModal } from "redux-modal";

import FullScreenDialog from "Components/Dialog/FullScreenDialog";
import EmailEditor from "react-email-editor";

import api from "Api";

class TemplateFormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: this.props.design,
      id: this.props.id,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad = () => {
    if (this.props.toEdit) {
      if (this.editor !== undefined) {
        this.editor.loadDesign(this.props.toEdit.design);
        this.editor.registerCallback("image", async function (file, done) {
          var data = new FormData();
          done({ progress: 20 });
          data.append("file", file.attachments[0]);
          var url = await api.post("/templateimages/saveImage", data);

          done({ progress: 50 });
          setTimeout(() => {
            done({ progress: 100, url: url.data.url });
          }, 2000);
          //wait 2 seconds
        });
      } else {
        setTimeout(() => {
          this.editor.loadDesign(this.props.toEdit.design);
          this.editor.registerCallback("image", async function (file, done) {
            var data = new FormData();
            done({ progress: 20 });
            data.append("file", file.attachments[0]);
            var url = await api.post("/templateimages/saveImage", data);

            done({ progress: 50 });
            setTimeout(() => {
              done({ progress: 100, url: url.data.url });
            }, 2000);
            //wait 2 seconds
          });
        }, 2000);
      }
    }
  };

  onSubmit = () => {
    this.editor.exportHtml((data) => {
      const { design, html } = data;
      this.props.toEdit.id ? this.props.onSave({ ...this.props.toEdit, html, design }) : this.props.onSave({ design, html });
      this.props.handleHide();
    });
  };

  render() {
    const { show, handleHide, toEdit } = this.props;
    var title = "";
    if (toEdit) {
      title = toEdit.title;
    }
    return (
      <FullScreenDialog title={title + " Editor"} show={show} handleHide={handleHide} dialogActionLabel={"Save"} dialogAction={this.onSubmit}>
        <EmailEditor
          minHeight="90vh"
          options={{
            customJS: [window.location.protocol + "//" + window.location.host + "/custom.js"],
          }}
          appearance={{
            customCSS: [
              `body {
                background-color: white;
              }`,
            ],
          }}
          ref={(editor) => (this.editor = editor)}
          onLoad={this.onLoad}
        />
      </FullScreenDialog>
    );
  }
}
export default connectModal({ name: "template_form" })(TemplateFormDialog);
