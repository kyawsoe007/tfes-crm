// import React, { Component } from "react";
// import { connectModal } from "redux-modal";

// import FullScreenDialog from "Components/Dialog/FullScreenDialog";
// import EmailEditor from "react-email-editor";

// import api from "Api";

// class TemplateNewFormDialog extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             json: this.props.design,
//             id: this.props.id
//         };
//         this.onSubmit = this.onSubmit.bind(this);
//         this.onLoad = this.onLoad.bind(this);
//     }

//     onLoad = () => {
//         if (this.props.toEdit) {
//             if (this.editor !== undefined) {
//                 this.editor.loadDesign(this.props.toEdit.design);

//                 this.editor.registerCallback('image', async function (file, done) {
//                     var data = new FormData();
//                     done({ progress: 20 });
//                     data.append('file', file.attachments[0]);
//                     var url = await api.post("/templateimages/saveImage", data);

//                     done({ progress: 50 });
//                     setTimeout(() => {
//                         done({ progress: 100, url: url.data.url });
//                     }, 2000);
//                     //wait 2 seconds

//                 });

//                 // console.log(this.editor);
//             } else {
//                 setTimeout(
//                     () => {
//                         this.editor.loadDesign(this.props.toEdit.design);
//                         this.editor.registerCallback('image', async function (file, done) {
//                             var data = new FormData();
//                             done({ progress: 20 });
//                             data.append('file', file.attachments[0]);
//                             var url = await api.post("/templateimages/saveImage", data);

//                             done({ progress: 50 });
//                             setTimeout(() => {
//                                 done({ progress: 100, url: url.data.url });
//                             }, 2000);
//                             //wait 2 seconds

//                         });
//                     },
//                     2000
//                 );
//             }

//         }
//     };

//     onSubmit = () => {
//         this.editor.exportHtml(data => {
//             const { design, html } = data;
//             const { title, description } = this.props
//             this.props.toEdit.id
//                 ? this.props.onSave({ ...this.props.toEdit, design, html, title, description })
//                 : this.props.onSave({ design, html, title, description });
//             this.props.handleHide();
//         });
//     };

//     render() {
//         const { show, handleHide, toEdit } = this.props;
//         var title = "";
//         if (toEdit) {
//             title = toEdit.title;
//         }

//         return (
//             <FullScreenDialog
//                 title={title + " Editor"}
//                 show={show}
//                 handleHide={handleHide}
//                 dialogActionLabel={"Save"}
//                 dialogAction={this.onSubmit}
//             >
//                 <EmailEditor
//                     minHeight="90vh"
//                     options={{
//                         designMode: 'edit',
//                         customJS: [
//                             window.location.protocol + '//' + window.location.host + '/custom.js',
//                         ]
//                     }}
//                     appearance={{
//                         customCSS: [
//                             `body {
//                 background-color: white;
//               }`
//                         ]
//                     }}
//                     ref={editor => (this.editor = editor)}
//                     onLoad={this.onLoad}
//                 />
//                 {/* {console.log("IN TEMP NEW FORM loading editor  ")}
//                 {console.log(this.props.title)}
//                 {console.log(this.props.description)} */}
//             </FullScreenDialog>
//         );
//     }
// }
// export default connectModal({ name: "template_new_form" })(TemplateNewFormDialog);

import React, { Component } from "react";
import { connectModal } from "redux-modal";

import FullScreenDialog from "Components/Dialog/FullScreenDialog";
import EmailEditor from "react-email-editor";

import api from "Api";

class TemplateNewFormDialog extends Component {
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

        // console.log(this.editor);
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
      const { title, description } = this.props;
      this.props.toEdit.id ? this.props.onSave({ ...this.props.toEdit, design, html, title, description }) : this.props.onSave({ design, html, title, description });
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
            designMode: "edit",
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
        {/* {console.log("IN TEMP NEW FORM loading editor  ")}
                {console.log(this.props.title)}
                {console.log(this.props.description)} */}
      </FullScreenDialog>
    );
  }
}
export default connectModal({ name: "template_new_form" })(TemplateNewFormDialog);
