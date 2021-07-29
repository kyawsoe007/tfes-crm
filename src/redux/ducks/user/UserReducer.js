import { NotificationManager } from "react-notifications";
import * as types from "./UserTypes";

const INIT_STATE = {
    User: {
        loading: false,
        tableData: [],
        totalCount: 0,
    },
    UserList: {
        loading: false,
        data: {}
  },
  singleUser: {
    loading: false,
    data:{}
  },
  singleProfileUser: {
    loading: false,
    data:{}
    },
  picUserList: {
    loading: false,
    data: []
  }
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.GET_USER:
            return {
                ...state,
                User: {
                    ...state.User,
                    loading: true,
                }
            };
        case types.GET_USER_FAILURE:
            return {
                ...state,
                User: {
                    ...state.User,
                    loading:false,
                }
            }
        case types.GET_USER_SUCCESS:
            return {
                ...state,
                User: {
                    loading: false,
                    tableData: action.payload,
                }
        };
      case types.GET_ONE_USER:
        return {
          ...state,
          singleUser: {
            loading:true
          }
        };
      case types.GET_ONE_USER_SUCCESS:
        return {
          ...state,
          singleUser: {
            loading: false,
            data:action.payload
          }
        };
      case types.GET_ONE_USER_FAILURE:
        NotificationManager.error("Failed to retrieve User Data");
        return {
          ...state,
          singleUser: {
            loading: false
          },
        };
        case types.CREATE_USER:
          return {
            ...state,
        
            singleUser: {
              loading: false,
              data: {},
            },
          };
    
        case types.CREATE_USER_SUCCESS:
          NotificationManager.success("Success in Creating User");
          return {
            ...state,
            singleUser: {
              loading: false,
              data: action.payload,
            },
          };
    
        case types.CREATE_USER_FAILURE:
          NotificationManager.warning("Error in Creating User");
          return {
            ...state,
            singleUser: {
              ...state.User,
              loading: false,
            },
        };
      
        case types.UPDATE_PASSWORD:
          return {
            ...state
          };
    
        case types.UPDATE_PASSWORD_SUCCESS:
          NotificationManager.success("Success in Update Password");
          return {
            ...state};
    
        case types.UPDATE_PASSWORD_FAILURE:
          NotificationManager.warning("Error in Change Password");
          return {
            ...state
          };
  
            case types.PATCH_USER:
                return {
                  ...state,
                  UserList: {
                    ...state.UserList,
                    loading: true
                  },
                };
          
              case types.PATCH_USER_SUCCESS:
                NotificationManager.success("UserList Successfully Edited!");
              return {
                  ...state,
                  UserList: {
                    loading: false,
                    data: action.payload
                  },
                };
              case types.PATCH_USER_FAILURE:
                // NotificationManager.error("Error in Editing PackingList Details");
                return {
                  ...state,
                  UserList: {
                    ...state.UserList,
                    loading: false
                  },
            };
            case types.DELETE_USER:
                return {
                  ...state,
                  User: {
                    ...state.User,
                    loading: true,
                  },
                };
          
              case types.DELETE_USER_SUCCESS:
                NotificationManager.success("User Successfully Deleted!");
                // let User = state.User.data.filter(
                //   (e) => e.id !== action.payload
                // );
                return {
                  ...state,
                  User: {
                    ...state.User,
                    loading: false,
                  },
                };
          
              case types.DELETE_USER_FAILURE:
                // NotificationManager.error("Error in Deleting SKU Details");
                return {
                  ...state,
                  User: {
                    ...state.User,
                    loading: false,
                  },
        };
      
        case types.USER_PROFILE:
          return {
            ...state,
            singleProfileUser: {
              loading: true,
            }}
        case types.USER_PROFILE_FAILURE:
            return {
              ...state,
              singleProfileUser: {
                loading: false
              },
            }
        case types.USER_PROFILE_SUCCESS:
            return {
              ...state,
              singleProfileUser: {
                loading: false,
                data:action.payload
              }
        };
        case types.GET_PIC_USER:
          return {
            ...state,
            picUserList: {
              loading: true,
              data: state.picUserList.data
            }
          };
        case types.GET_PIC_USER_SUCCESS:
          return {
            ...state,
            picUserList: {
              loading:false,
              data: action.payload.data
            }
          }
        case types.GET_PIC_USER_FAILURE:
          NotificationManager.warning("Unable to load user list");
          return {
            ...state,
            picUserList: {
              loading:false,
              data: state.picUserList.data
            }
          }
        default:
            return {
                ...state,
            } 
    }
}