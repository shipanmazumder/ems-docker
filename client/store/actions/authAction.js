import axios from "axios";
import jwtDecode from "jwt-decode";
import * as Types from "../actions/types";
import setAuthToken from "../../utils/setAuthToken";
import {API} from "./../../config";
import {removeCookie, setCookie} from "./../../utils/auth";

export const teacherCreate = (teacher, history) => {
    return (dispatch) => {
        axios
            .post(`${API}/api/teacher/teacherCreate`, teacher)
            .then((res) => {
                dispatch({
                    type: Types.SET_MESSAGE,
                    payload: {
                        message: res.data.message
                    },
                });
                if (res.data.code == 200) {
                    history.push("/teacher/login");
                }
            })
            .catch((errors) => {
                if (errors.response?.status === 422) {
                    dispatch({
                        type: Types.USER_ERROR,
                        payload: {
                            errors: errors.response.data.errors,
                        },
                    });
                } else {
                }
            });
    };
};

export const teacherLogin = (teacher, history) => async (dispatch) => {
    try {
        let result = await axios.post(`${API}/api/teacher/teacherLogin`, teacher);
        if (!result) {
            dispatch({
                type: Types.SET_MESSAGE,
                payload: {
                    message: "Server Error",
                },
            });
        } else {
            if (result.data.code == 200) {
                setCookie("token", result.data.token);
                // localStorage.setItem("auth_token",result.token);
                setAuthToken(result.data.token);
                dispatch({
                    type: Types.SET_USER,
                    payload: {
                        isTeacher: true,
                        isStudent: false,
                        isAuth: true,
                        user: jwtDecode(result.data.token).data,
                    },
                });
                history.push(`/teacher/dashboard`);
            } else {
                dispatch({
                    type: Types.SET_MESSAGE,
                    payload: {
                        message: result.data.message,
                    },
                });
                // history.push(`/login`);
            }
        }
    } catch (errors) {
        if (errors.response?.status === 422) {
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    errors: errors.response.data.errors,
                },
            });
        } else {
        }
    }
};

export const logout = (history) => {
    removeCookie("token");
    history.push("/teacher/login");
    return {
        type: Types.SET_USER,
        payload: {
            isAuth: false,
            isTeacher: false,
            isStudent: false,
            user: {},
        },
    };
};

export const studentCreate = (student, history) => {
    return (dispatch) => {
        axios
            .post(`${API}/api/student/studentCreate`, student)
            .then((res) => {
                dispatch({
                    type: Types.SET_MESSAGE,
                    payload: {
                        message: res.data.message
                    },
                });
                if (res.data.code == 200) {
                    history.push("/student/login");
                }
            })
            .catch((errors) => {
                if (errors.response?.status === 422) {
                    dispatch({
                        type: Types.USER_ERROR,
                        payload: {
                            errors: errors.response.data.errors,
                        },
                    });
                } else {
                }
            });
    };
};

export const studentLogin = (student, history) => async (dispatch) => {
    try {
        let result = await axios.post(`${API}/api/student/studentLogin`, student);
        if (!result) {
            dispatch({
                type: Types.SET_MESSAGE,
                payload: {
                    message: "Server Error",
                },
            });
        } else {
            if (result.data.code == 200) {
                setCookie("token", result.data.token);
                // localStorage.setItem("auth_token",result.token);
                setAuthToken(result.data.token);
                dispatch({
                    type: Types.SET_USER,
                    payload: {
                        isStudent: true,
                        isTeacher: false,
                        isAuth: true,
                        user: jwtDecode(result.data.token).data,
                    },
                });
                history.push(`/student/dashboard`);
            } else {
                dispatch({
                    type: Types.SET_MESSAGE,
                    payload: {
                        message: result.data.message,
                    },
                });
                // history.push(`/login`);
            }
        }
    } catch (errors) {
        if (errors.response?.status === 422) {
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    errors: errors.response.data.errors,
                },
            });
        } else {
        }
    }
};

export const studentLogout = (history,dispatch) => {
   removeCookie("token");
    history.push("/student/login");
    return {
        type: Types.SET_USER,
        payload: {
            isAuth: false,
            isTeacher: false,
            isStudent: false,
            user: {},
        },
    };
};
