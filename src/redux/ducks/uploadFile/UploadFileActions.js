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
  DELETE_UPLOAD_FILE,
  DELETE_UPLOAD_FILE_SUCCESS,
  DELETE_UPLOAD_FILE_FAILURE,
  PATCH_UPLOAD_FILE,
  PATCH_UPLOAD_FILE_SUCCESS,
  PATCH_UPLOAD_FILE_FAILURE,
  DOWNLOAD_UPLOAD_FILE,
  DOWNLOAD_UPLOAD_FILE_SUCCESS,
  DOWNLOAD_UPLOAD_FILE_FAILURE,
} from "./UploadFileTypes";



export const uploadFile = file => ({
  type: UPLOAD_FILE,
  payload: file
});

export const uploadFileSuccess = success => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: success
});

export const uploadFileFailure = error => ({
  type: UPLOAD_FILE_FAILURE,
  payload: error
});

export const uploadMultipleFile = file => ({
  type: UPLOAD_MULTIPLE_FILE,
  payload: file
});

export const uploadMultipleFileSuccess = success => ({
  type: UPLOAD_MULTIPLE_FILE_SUCCESS,
  payload: success
});

export const uploadMultipleFileFailure = error => ({
  type: UPLOAD_MULTIPLE_FILE_FAILURE,
  payload: error
});

export const getUploadFile = id => ({
  type: GET_UPLOAD_FILE,
  payload: id
})

export const getUploadFileSuccess = data => ({
  type: GET_UPLOAD_FILE_SUCCESS,
  payload: data
})

export const getUploadFileFailure = error => ({
  type: GET_UPLOAD_FILE_FAILURE,
  payload: error
})

export const deleteUploadFile = id => ({
  type: DELETE_UPLOAD_FILE,
  payload: id
})

export const deleteUploadFileSuccess = data => ({
  type: DELETE_UPLOAD_FILE_SUCCESS,
  payload: data
})

export const deleteUploadFileFailure = error => ({
  type: DELETE_UPLOAD_FILE_FAILURE,
  payload: error
})

export const patchUploadFile = data => ({
  type: PATCH_UPLOAD_FILE,
  payload: data
})

export const patchUploadFileSuccess = data => ({
  type: PATCH_UPLOAD_FILE_SUCCESS,
  payload: data
})

export const patchUploadFileFailure = error => ({
  type: PATCH_UPLOAD_FILE_FAILURE,
  payload: error 
})

export const downloadUploadFile = filename => ({
  type: DOWNLOAD_UPLOAD_FILE,
  payload: filename
})

export const downloadUploadFileSuccess = data => ({
  type: DOWNLOAD_UPLOAD_FILE_SUCCESS,
  payload: data
})

export const downloadUploadFileFailure = error => ({
  type: DOWNLOAD_UPLOAD_FILE_FAILURE,
  payload: error 
})