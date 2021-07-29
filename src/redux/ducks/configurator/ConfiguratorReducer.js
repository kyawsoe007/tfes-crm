import * as types from "./ConfiguratorTypes";

const INIT_STATE = {
  grades: {
    loading: false,
    data: []
  },
  exterior: {
    loading: false,
    data: []
  },
  interior: {
    loading: false,
    data: []
  },
  rims: {
    loading: false,
    data: []
  },
  accessories: {
    loading: false,
    data: null
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ===========================
    // Mini Configurator
    // ===========================
    /**
     * Grade
     */
    case types.GET_GRADES:
      return { ...state, grades: { ...state.grades, loading: true } };
    case types.GET_GRADES_SUCCESS:
      return {
        ...state,
        grades: { ...state.grades, loading: false, data: action.payload }
      };
    case types.GET_GRADES_FAILURE:
      return { ...state, grades: { ...state.grades, loading: false } };

    /**
     * Exterior
     */
    case types.GET_EXTERIOR:
      return { ...state, exterior: { ...state.exterior, loading: true } };
    case types.GET_EXTERIOR_SUCCESS:
      return {
        ...state,
        exterior: { ...state.exterior, loading: false, data: action.payload }
      };
    case types.GET_EXTERIOR_FAILURE:
      return { ...state, exterior: { ...state.exterior, loading: false } };

    /**
     * Interior
     */
    case types.GET_INTERIOR:
      return {
        ...state,
        interior: { ...state.interior, loading: true },
        rims: { ...state.rims, loading: true }
      };
    case types.GET_INTERIOR_SUCCESS:
      return {
        ...state,
        interior: {
          ...state.interior,
          loading: false,
          data: action.payload.Material.objects
        },
        rims: {
          ...state.rims,
          loading: false,
          data: action.payload.Rims.objects
        }
      };
    case types.GET_INTERIOR_FAILURE:
      return {
        ...state,
        interior: { ...state.interior, loading: false },
        rims: { ...state.rims, loading: false }
      };

    /**
     * Accessories
     */
    case types.GET_ACCESSORIES:
      return { ...state, accessories: { ...state.accessories, loading: true } };
    case types.GET_ACCESSORIES_SUCCESS:
      return {
        ...state,
        accessories: {
          ...state.accessories,
          loading: false,
          data: action.payload
        }
      };
    case types.GET_ACCESSORIES_FAILURE:
      return {
        ...state,
        accessories: { ...state.accessories, loading: false }
      };

    default:
      return { ...state };
  }
};
