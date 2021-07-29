import React from 'react';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }

    updateContent = (value) => {
        this.setState({content: value});
        this.props.changeData(value);
    };
    /**
     * @property Jodit jodit instance of native Jodit
     */
    jodit;
    setRef = jodit => this.jodit = jodit;

    config = {
        readonly: false,
        enableDragAndDropFileToEditor: true,
        uploader: { insertImageAsBase64URI: true }
    };
    render() {
        return (
            <JoditEditor
                editorRef={this.setRef}
                value={this.props.data ? this.props.data : this.state.content}
                config={this.config}
                onChange={this.updateContent}
            />
        );
    }
}

export default Editor;
