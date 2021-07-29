import { NotificationManager } from "react-notifications";
import * as types from "./BlogTypes";

const INIT_STATE = {
  loading: false,
  blogList: {
    nowShowing: "All Blogs",
    options: ["All Blogs", "Open Blog", "Closed Blog", "Won Blog"],
    action: false,
    loading: false,
    tableData: []
  },
  singleData: {},
  singleContent: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Blog Summary
     */
    case types.GET_ALL_BLOG:
      return { ...state, blogList: { ...state.blogList, loading: true } };
    case types.GET_ALL_BLOG_SUCCESS:
      return {
        ...state,
        blogList: {
          ...state.blogList,
          loading: false,
          tableData: action.payload.data
        }
      };
    case types.GET_ALL_BLOG_FAILURE:
      NotificationManager.warning('Failed to get blogs!');
      return { ...state, blogList: { ...state.blogList, loading: false } };

    case types.GET_SINGLE_BLOG:
      return { ...state, loading: true };
    case types.GET_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        singleData: action.payload,
        singleContent: action.payload.content
      };
    case types.GET_SINGLE_BLOG_FAILURE:
      NotificationManager.warning('Failed to get Blog!');
      return { ...state, loading: false };

    case types.NEW_BLOG:
      return { ...state, loading: true };
    case types.NEW_BLOG_SUCCESS:
      NotificationManager.success('Created Blog Successfully!');
      return {
        ...state, loading: false
      };
    case types.NEW_BLOG_FAILURE:
      NotificationManager.warning('Failed to create new blog!');
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
