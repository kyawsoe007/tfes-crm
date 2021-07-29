import * as types from "./TemplateTypes";

/**
 * Get All Campaign
 */
export const getAllTemplate = () => ({
  type: types.GET_ALL_TEMPLATE
});
export const getAllTemplateSuccess = data => ({
  type: types.GET_ALL_TEMPLATE_SUCCESS,
  payload: data
});
export const getAllTemplateFailure = error => ({
  type: types.GET_ALL_TEMPLATE_FAILURE,
  payload: error
});

/**
 * Add Campaign Email Template
 */
export const addTemplate = data => ({
  type: types.ADD_TEMPLATE,
  payload: data
});
export const addTemplateSuccess = data => ({
  type: types.ADD_TEMPLATE_SUCCESS,
  payload: data
});
export const addTemplateFailure = error => ({
  type: types.ADD_TEMPLATE_FAILURE,
  payload: error
});

/**
 * Update Campaign Email Template
 */
export const updateTemplate = data => ({
  type: types.UPDATE_TEMPLATE,
  payload: data
});
export const updateTemplateSuccess = data => ({
  type: types.UPDATE_TEMPLATE_SUCCESS,
  payload: data
});
export const updateTemplateFailure = error => ({
  type: types.UPDATE_TEMPLATE_FAILURE,
  payload: error
});

//FROM HUTTONS 
export const deleteTemplate = templateId => ({
  type: types.DELETE_TEMPLATE,
  payload: templateId
});
export const deleteTemplateSuccess = data => ({
  type: types.DELETE_TEMPLATE_SUCCESS,
  payload: data
});
export const deleteTemplateFailure = error => ({
  type: types.DELETE_TEMPLATE_FAILURE,
  payload: error
});

export const updateEmailContent = (id, html, design) => ({
  type: types.UPDATE_EMAIL_CONTENT,
  payload: { id, html, design }
})

/////////////
/**
 * Update Campaign Title 
 */
export const updateTemplateTitle = data => ({
  type: types.UPDATE_TEMPLATE_TITLE,
  payload: data
});
export const updateTemplateTitleSuccess = data => ({
  type: types.UPDATE_TEMPLATE_TITLE_SUCCESS,
  payload: data
});
export const updateTemplateTitleFailure = error => ({
  type: types.UPDATE_TEMPLATE_TITLE_FAILURE,
  payload: error
});


/*
 * Get All TEMPLATE
 */
export const getFilterTemplate = (limit, skip, filter, searchText, orderBy, custId) => ({
  type: types.GET_FILTER_TEMPLATE,
  payload: { limit, skip, filter, searchText, orderBy, custId }
});
export const getFilterTemplateSuccess = data => ({
  type: types.GET_FILTER_TEMPLATE_SUCCESS,
  payload: data
});
export const getFilterTemplateFailure = error => ({
  type: types.GET_FILTER_TEMPLATE_FAILURE,
  payload: error
});
