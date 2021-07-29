import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@material-ui/core/Button";

const baseStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  // backgroundColor: "#df0021",
  // color: "#df0021",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

function Dropzone(props) {
  const { acceptFileTypes, onDrop, onRemove, uploadedFiles } = props;
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
    open
  } = useDropzone({
    accept: acceptFileTypes,
    noClick: true,
    noKeyboard: true,
    onDrop: onDrop
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const files = uploadedFiles.map(file => (
    <p key={file.path}>
      <i className="zmdi zmdi-file-text text-primary mr-10" />
      {file.path} - {file.size} bytes{" "}
      <i
        className="zmdi zmdi-close text-danger ml-5"
        onClick={() => onRemove(file)}
      >X</i>
    </p>
  ));

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="">
          <i className="zmdi zmdi-upload zmdi-hc-5x" />
        </div>
        <p className="mb-5">Drop files here, or click to select files</p>
        <small className="mb-0">
         
        </small>
        <Button
          variant="contained"
          size="small"
          className="my-20"
          onClick={open}
        >
          Select Files
        </Button>
        {files && files}
      </div>
    </div>
  );
}

export default Dropzone;
