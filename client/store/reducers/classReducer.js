import * as Types from "../actions/types";

const init = {
  classes: [],
  classInfo: {},
  message: "",
  errors: {},
  isLoading: true,
};
const classReducer = (state = init, action) => {
  switch (action.type) {
    case Types.LOAD_CLASSES:
      return {
        ...state,
        errors: {},
        message: "",
        isLoading: false,
        classes: action.payload.classes,
      };
    case Types.SET_CLASS:
      return {
        ...state,
        isLoading: false,
        classInfo: action.payload.classInfo,
      };
    case Types.SET_CLASSES:
      let classes = [...state.classes];
      classes.unshift(action.payload.classes);
      return {
        ...state,
        classes: classes,
        errors: {},
        isLoading: false,
        message: action.payload.message,
      };
    case Types.UPDATE_CLASS:
      let classess = [...state.classes];
      let newclasses = classess.map((classInfo) => {
        if (classInfo._id === action.payload.classInfo._id) {
          return action.payload.classInfo;
        }
        return classInfo;
      });
      return {
        ...state,
        isLoading: false,
        classes: newclasses,
        message: action.payload.message,
      };
    case Types.SET_MESSAGE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    case Types.CLASS_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};
export default classReducer;
