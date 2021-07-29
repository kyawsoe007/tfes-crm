/**
 * Auth User Reducers
 */
import { NotificationManager } from "react-notifications";
import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  UPLOAD_MULTIPLE_FILE,
  UPLOAD_MULTIPLE_FILE_SUCCESS,
  UPLOAD_MULTIPLE_FILE_FAILURE,
  GET_UPLOAD_FILE,
  GET_UPLOAD_FILE_SUCCESS,
  GET_UPLOAD_FILE_FAILURE,
  DELETE_UPLOAD_FILE_FAILURE,
  DELETE_UPLOAD_FILE,
  DELETE_UPLOAD_FILE_SUCCESS,
  PATCH_UPLOAD_FILE,
  PATCH_UPLOAD_FILE_SUCCESS,
  PATCH_UPLOAD_FILE_FAILURE,
  DOWNLOAD_UPLOAD_FILE,
  DOWNLOAD_UPLOAD_FILE_SUCCESS,
  DOWNLOAD_UPLOAD_FILE_FAILURE
} from "./UploadFileTypes";

/**
 * initial auth user
 */
const INIT_STATE = {
  uploadedFiles: {
    loading: false,
    data: []
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return { ...state };

    case UPLOAD_FILE_SUCCESS:
      NotificationManager.success("File uploaded successfully");
      return {
        ...state,
        uploadedFiles: {
          loading: false,
          data: action.payload.file
        }
      };

    case UPLOAD_FILE_FAILURE:
      NotificationManager.error("Unable to upload file");
      return { ...state };

    case UPLOAD_MULTIPLE_FILE:
      return { ...state };

    case UPLOAD_MULTIPLE_FILE_SUCCESS:
      NotificationManager.success("Files uploaded successfully");
      return {
        ...state,
        uploadedFiles: {
          loading: false,
          data: action.payload.file
        }
      };
      
    case UPLOAD_MULTIPLE_FILE_FAILURE:
      NotificationManager.error("Unable to upload file");
      return { ...state };

    case GET_UPLOAD_FILE:
      return {
        ...state,
        uploadedFiles: {
          ...state.uploadedFiles,
          loading: true
        }
      }
    case GET_UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        uploadedFiles: {
          ...state.uploadedFiles,
          loading: false,
          data: action.payload
        }
      }

    case GET_UPLOAD_FILE_FAILURE:
      NotificationManager.warning("no file found");
      return {
        ...state,
        uploadedFiles: {
          loading: false,
          data: []
        }
      }

    case DELETE_UPLOAD_FILE:
      return {
        ...state,
        uploadedFiles: {
          ...state.uploadedFiles,
          loading: true
        }
      }
    case DELETE_UPLOAD_FILE_SUCCESS:
      NotificationManager.success("File deleted successfully");

      let uploadedFiles = state.uploadedFiles.data.filter(
        (e) => e.path !== action.payload.filepath.filePath
      );
      return {
        ...state,
        uploadedFiles: {
          ...state.uploadedFiles,
          loading: false,
          data: uploadedFiles
        }
      }

    case DELETE_UPLOAD_FILE_FAILURE:
      NotificationManager.error("Unable to delete file!");
      return {
        ...state,
        uploadedFiles: {
          ...state.uploadedFiles,
          loading: false
        }
      }

    case PATCH_UPLOAD_FILE:
      return {
        ...state,
        uploadedFiles: {
          ...state.uploadedFiles,
          loading: true
        }
      }
    case PATCH_UPLOAD_FILE_SUCCESS:
      NotificationManager.success("File patched successfully");

      return {
        ...state,
        uploadedFiles: {
          ...state.uploadedFiles,
          loading: false,
          data: action.payload.file
        }
      }

    case PATCH_UPLOAD_FILE_FAILURE:
      NotificationManager.error("patch file fail");
      return {
        ...state,
        uploadedFiles: {
          loading: false,
          data: []
        }
      }

    case DOWNLOAD_UPLOAD_FILE:
      return {
        ...state,
      }

    case DOWNLOAD_UPLOAD_FILE_SUCCESS:
      return {
        ...state,
      }

    case DOWNLOAD_UPLOAD_FILE_FAILURE:
      return {
        ...state,
      }

    default:
      return { ...state };
  }
};
