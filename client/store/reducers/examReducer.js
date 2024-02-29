import * as Types from "../actions/types";

const init = {
  exams: {},
  exam: {},
  message: "",
  errors: {},
  isLoading: true,
};
const examReducer = (state = init, action) => {
  switch (action.type) {
    case Types.LOAD_EXAMS:
      return {
        ...state,
        errors: {},
        message: "",
        isLoading: false,
        exams: action.payload.exams,
      };
    case Types.SET_EXAM:
      return {
        ...state,
        isLoading: false,
        exam: action.payload.exam,
      };
    case Types.SET_EXAMS:
      let exams = [...state.exams];
      exams.unshift(action.payload.exams);
      return {
        ...state,
        exams: exams,
        errors: {},
        isLoading: false,
        message: action.payload.message,
      };
    // case Types.UPDATE_CLASS:
    //   let classess = [...state.classes];
    //   let newclasses = classess.map((classInfo) => {
    //     if (classInfo._id === action.payload.classInfo._id) {
    //       return action.payload.classInfo;
    //     }
    //     return classInfo;
    //   });
    //   return {
    //     ...state,
    //     isLoading: false,
    //     classes: newclasses,
    //     message: action.payload.message,
    //   };
    case Types.SET_MESSAGE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    case Types.EXAM_ERRORS:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};
export default examReducer;
