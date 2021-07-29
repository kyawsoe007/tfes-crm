import { NotificationManager } from "react-notifications";
import * as types from ".//TemplateTypes";

const INIT_STATE = {
  loading: false,
  templateList: [],
  adminTemplateList: [],
  totalCount: "-1",
  totalPage: 0.0,
  completedTemplate: {
    completedHtml: "",
    completedDesign: "",
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Get all templates
     */
    case types.GET_ALL_TEMPLATE:
      return { ...state, loading: true };
    case types.GET_FILTER_TEMPLATE_SUCCESS:
      console.log("in reducer");
      console.log(action.payload);
      // console.log(state.adminTemplateList);
      // console.log(action.payload);
      return {
        ...state,
        loading: false,
        templateList: action.payload.data,
        adminTemplateList: action.payload.adminList,
        totalCount: action.payload.totalCount,
        totalPage: action.payload.totalPage,
      };
    case types.GET_ALL_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        templateList: action.payload.createdTemplate,
        adminTemplateList: action.payload.adminTemplate,
        totalCount: action.payload.totalCount,
      };
    case types.GET_FILTER_TEMPLATE_FAILURE:
    case types.GET_ALL_TEMPLATE_FAILURE:
      NotificationManager.error("Error in retrieving Templates");
      return { ...state, loading: false };

    /**
     * Add Campaign Email Template
     */
    case types.ADD_TEMPLATE:
      return { ...state };
    case types.ADD_TEMPLATE_SUCCESS:
      NotificationManager.success("Added new email template!");
      const addTemplate = Object.assign([], state.templateList);
      addTemplate.push(action.payload);
      return {
        ...state,
        templateList: addTemplate,
      };
    case types.ADD_TEMPLATE_FAILURE:
      NotificationManager.error("Error in creating email template!");
      return { ...state };

    /**
     * Update Campaign Email Template
     */
    case types.ADD_CONTENT:
      return {
        ...state,
        completedTemplate: {
          completedDesign: action.payload.design,
          completedHtml: action.payload.html,
        },
      };

    /**
     * Update Campaign Email Template
     */
    case types.UPDATE_TEMPLATE:
      return { ...state };

    case types.UPDATE_TEMPLATE_SUCCESS:
      NotificationManager.success("Updated Email Template!");
      const editTemplate = Object.assign(
        [],
        state.templateList
      ).map((template) =>
        template.id == action.payload.id ? action.payload : template
      );

      return {
        ...state,
        templateList: editTemplate,
        completedTemplate: {
          completedDesign: action.payload.design,
          completedHtml: action.payload.html,
        },
      };

    case types.UPDATE_TEMPLATE_FAILURE:
      NotificationManager.error(action.payload);
      return { ...state };

    case types.DELETE_TEMPLATE:
      return { ...state };

    case types.DELETE_TEMPLATE_SUCCESS:
      NotificationManager.success("Template deleted!");
      const delTemplate = Object.assign([], state.templateList).filter(
        (template) => template.id != action.payload
      );

      return {
        ...state,
        templateList: delTemplate,
      };

    case types.DELETE_TEMPLATE_FAILURE:
      NotificationManager.error("Error in deleting template");
      return { ...state };

    case types.UPDATE_EMAIL_CONTENT:
      let emailEdit = Object.assign([], state.templateList).map((template) => {
        if (template.id == action.payload.id) {
          template.html = action.payload.html;
          template.design = action.payload.design;
        }

        return template;
      });
      return {
        ...state,
        templateList: emailEdit,
        completedTemplate: {
          completedDesign: action.payload.design,
          completedHtml: action.payload.html,
        },
      };

    default:
      return { ...state };
  }
};
