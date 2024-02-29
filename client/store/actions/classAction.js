import axios from "axios";
import * as Types from "../actions/types";
import { API } from "./../../config";

export const getClass = (history) => {
  return (dispatch) => {
    axios
      .get(`${API}/api/teacher/classList`)
      .then((res) => {
        let result = res.data;
        if (result.code === 200) {
          dispatch({
            type: Types.LOAD_CLASSES,
            payload: {
              classes: result.data,
            },
          });
        } else {
          dispatch({
            type: Types.LOAD_CLASSES,
            payload: {
              classes: [],
            },
          });
        }
      })
      .catch((errors) => {
        try {
          Logout(errors,dispatch,Types.SET_USER)
        } catch (error) {}
      });
  };
};

export const getSingleClass = (classCode, history) => {
  return (dispatch) => {
    axios
      .get(`${API}/api/teacher/singleClass?classCode=${classCode}`)
      .then((res) => {
        let result = res.data;
        if (result.code === 200) {
          dispatch({
            type: Types.SET_CLASS,
            payload: {
              classInfo: result.data,
            },
          });
        } else {
          history.push("/404")
        }
      })
      .catch((errors) => {
        try {
          Logout(errors,dispatch,Types.SET_USER)
        } catch (error) {}
      });
  };
};
export const getStudentSingleClass = (classCode, history) => {
  return (dispatch) => {
    axios
      .get(`${API}/api/student/singleClass?classCode=${classCode}`)
      .then((res) => {
        let result = res.data;
        if (result.code === 200) {
          dispatch({
            type: Types.SET_CLASS,
            payload: {
              classInfo: result.data,
            },
          });
        } else {
          history.push("/404")
        }
      })
      .catch((errors) => {
        try {
          Logout(errors,dispatch,Types.SET_USER)
        } catch (error) {}
      });
  };
};

export const classCreate = (classInfo, history) => async (dispatch) => {
  try {
    let result = await axios.post(`${API}/api/teacher/classCreate`, classInfo);
    if (!result) {
      dispatch({
        type: Types.SET_MESSAGE,
        payload: {
          message: "Server Error",
        },
      });
    } else {
      if (result.data.code == 200) {
        dispatch({
          type: Types.SET_CLASSES,
          payload: {
            classes: result.data,
             message: "Class Create Success",
          }
        });
        history.push(`/teacher/dashboard`);
      } else {
        dispatch({
          type: Types.SET_MESSAGE,
          payload: {
            classes:[],
            message: result.data.message,
          },
        });
        // history.push(`/login`);
      }
    }
  } catch (errors) {
    if (errors.response?.status === 422) {
      dispatch({
        type: Types.CLASS_ERROR,
        payload: {
          errors: errors.response.data.errors,
        },
      });

      Logout(errors,dispatch,Types.SET_USER)
    } else {
    }
  }
};

export const classMaterialUpload = (classInfo, history) => async (dispatch) => {
  try {
    let result = await axios.post(`${API}/api/teacher/uploadClassMaterial`, classInfo);
    if (!result) {
      dispatch({
        type: Types.SET_MESSAGE,
        payload: {
          message: "Server Error",
        },
      });
    } else {
      if (result.data.code == 200) {
        dispatch({
          type: Types.SET_CLASS,
          payload: {
            classInfo: result.data.data,
             message: "Class Material Upload Success",
          }
        });
        // history.push(`/teacher/class/${result.data.data.classCode}`);
      } else {
        dispatch({
          type: Types.SET_MESSAGE,
          payload: {
            classes:[],
            message: result.data.message,
          },
        });
        // history.push(`/login`);
      }
    }
  } catch (errors) {
    if (errors.response?.status === 422) {
      dispatch({
        type: Types.CLASS_ERROR,
        payload: {
          errors: errors.response.data.errors,
        },
      });

      Logout(errors,dispatch,Types.SET_USER)
    } else {
    }
  }
};

export const getStudentEnrollClasses = (history) => {
  return (dispatch) => {
    axios
      .get(`${API}/api/student/studentEnrollClasses`)
      .then((res) => {
       let result = res.data;
        if (result.code === 200) {
          dispatch({
            type: Types.LOAD_CLASSES,
            payload: {
              classes: result.data,
            },
          });
        } else {
          dispatch({
            type: Types.LOAD_CLASSES,
            payload: {
              classes: [],
            },
          });
        }
      })
      .catch((errors) => {
        try {
          Logout(errors,dispatch,Types.SET_USER)
        } catch (error) {}
      });
  };
};

export const getStudentArchiveClasses = (history) => {
  return (dispatch) => {
    axios
      .get(`${API}/api/student/studentArchiveClasses`)
      .then((res) => {
       let result = res.data;
        if (result.code === 200) {
          dispatch({
            type: Types.LOAD_CLASSES,
            payload: {
              classes: result.data,
            },
          });
        } else {
          dispatch({
            type: Types.LOAD_CLASSES,
            payload: {
              classes: [],
            },
          });
        }
      })
      .catch((errors) => {
        try {
          Logout(errors,dispatch,Types.SET_USER)
        } catch (error) {}
      });
  };
};

export const joinClass = (classInfo, history) => async (dispatch) => {
  try {
    let result = await axios.post(`${API}/api/student/classEnroll`, classInfo);
    if (!result) {
      dispatch({
        type: Types.SET_MESSAGE,
        payload: {
          message: "Server Error",
        },
      });
    } else {
      if (result.data.code == 200) {
        dispatch({
          type: Types.SET_CLASSES,
          payload: {
            classes: result.data,
             message: "Class Join Success",
          }
        });
        history.push(`/student/dashboard`);
      } else {
        dispatch({
          type: Types.SET_MESSAGE,
          payload: {
            classes:[],
            message: result.data.message,
          },
        });
        // history.push(`/login`);
      }
    }
  } catch (errors) {
    if (errors.response?.status === 422) {
     history.push(`/student/signup`);
    } else {
    }
  }
};
export const classReEnroll = (classInfo, history) => async (dispatch) => {
  try {
    let result = await axios.post(`${API}/api/student/classReEnroll`, classInfo);
    if (!result) {
      dispatch({
        type: Types.SET_MESSAGE,
        payload: {
          message: "Server Error",
        },
      });
    } else {
      if (result.data.code == 200) {
        dispatch({
            type: Types.LOAD_CLASSES,
            payload: {
              classes: result.data.data
            },
          });
        // history.push(`/student/dashboard`);
      } else {
        dispatch({
          type: Types.SET_MESSAGE,
          payload: {
            classes:[],
            message: result.data.message,
          },
        });
        // history.push(`/login`);
      }
    }
  } catch (errors) {
    if (errors.response?.status === 422) {
     history.push(`/student/signup`);
    } else {
    }
  }
};
export const classUnroll = (classCode, history) => async (dispatch) => {
  try {
    let result = await axios.get(`${API}/api/student/classUnroll?classCode=${classCode}`);
    if (!result) {
      dispatch({
        type: Types.SET_MESSAGE,
        payload: {
          message: "Server Error",
        },
      });
    } else {
      if (result.data.code == 200) {
        dispatch({
            type: Types.LOAD_CLASSES,
            payload: {
              classes: result.data.data
            },
          });
        // history.push(`/student/dashboard`);
      } else {
        dispatch({
          type: Types.SET_MESSAGE,
          payload: {
            classes:[],
            message: result.data.message,
          },
        });
        // history.push(`/login`);
      }
    }
  } catch (errors) {
    if (errors.response?.status === 422) {
     history.push(`/student/signup`);
    } else {
    }
  }
};
