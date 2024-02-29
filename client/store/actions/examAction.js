import axios from "axios";
import jwtDecode from "jwt-decode";
import * as Types from "../actions/types";
import setAuthToken from "../../utils/setAuthToken";
import {API} from "./../../config";
import {removeCookie, setCookie} from "./../../utils/auth";

export const getExams = (classId, history) => {
    return (dispatch) => {
        axios
            .get(`${API}/api/teacher/examList?classId=${classId}`)
            .then((res) => {
                let result = res.data;
                if (result.code === 200) {
                    dispatch({
                        type: Types.LOAD_EXAMS,
                        payload: {
                            exams: result.data,
                        },
                    });
                } else {
                    dispatch({
                        type: Types.LOAD_EXAMS,
                        payload: {
                            exams: [],
                        },
                    });
                }
            })
            .catch((errors) => {
                try {
                    if (errors.response?.status === 401) {
                        removeCookie("token");
                        dispatch({
                            type: Types.SET_USER,
                            payload: {
                                isAuth: false,
                                user: {},
                            },
                        });

                    }
                } catch (error) {
                }
            });
    };
};
export const getStudentExams = (classId, history) => {
    return (dispatch) => {
        axios
            .get(`${API}/api/student/examList?classId=${classId}`)
            .then((res) => {
                let result = res.data;
                if (result.code === 200) {
                    dispatch({
                        type: Types.LOAD_EXAMS,
                        payload: {
                            exams: result.data,
                        },
                    });
                } else {
                    dispatch({
                        type: Types.LOAD_EXAMS,
                        payload: {
                            exams: [],
                        },
                    });
                }
            })
            .catch((errors) => {
                try {
                    if (errors.response?.status === 401) {
                        removeCookie("token");
                        dispatch({
                            type: Types.SET_USER,
                            payload: {
                                isAuth: false,
                                user: {},
                            },
                        });

                    }
                } catch (error) {
                }
            });
    };
};

export const getExam = (classCode, history) => {
    return (dispatch) => {
        axios
            .get(`${API}/api/teacher/singleExam?classCode=${classCode}`)
            .then((res) => {
                let result = res.data;
                if (result.code === 200) {
                    dispatch({
                        type: Types.SET_EXAM,
                        payload: {
                            exam: result.data,
                        },
                    });
                } else {
                    history.push("/404")
                }
            })
            .catch((errors) => {
                try {
                    if (errors.response?.status === 401) {
                        removeCookie("token");
                        dispatch({
                            type: Types.SET_USER,
                            payload: {
                                isAuth: false,
                                user: {},
                            },
                        });

                    }
                } catch (error) {
                }
            });
    };
};
export const getSingleExamMarks = (examId,classCode, history) => {
    return (dispatch) => {
        axios
            .get(`${API}/api/teacher/singleExamMarks?examId=${examId}&classCode=${classCode}`)
            .then((res) => {
                let result = res.data;
                if (result.code === 200) {
                    dispatch({
                        type: Types.SET_EXAM,
                        payload: {
                            exam: result.data,
                        },
                    });
                } else {
                    history.push("/404")
                }
            })
            .catch((errors) => {
                try {
                    if (errors.response?.status === 401) {
                        removeCookie("token");
                        dispatch({
                            type: Types.SET_USER,
                            payload: {
                                isAuth: false,
                                user: {},
                            },
                        });

                    }
                } catch (error) {
                }
            });
    };
};
export const getStudentExam = (classCode,examId, history) => {
    return (dispatch) => {
        axios
            .get(`${API}/api/student/singleExam?classCode=${classCode}&examId=${examId}`)
            .then((res) => {
                let result = res.data;
                if (result.code === 200) {
                    dispatch({
                        type: Types.SET_EXAM,
                        payload: {
                            exam: result.data,
                        },
                    });
                } else {
                    history.push("/404")
                }
            })
            .catch((errors) => {
                try {
                    if (errors.response?.status === 401) {
                        removeCookie("token");
                        dispatch({
                            type: Types.SET_USER,
                            payload: {
                                isAuth: false,
                                user: {},
                            },
                        });

                    }
                } catch (error) {
                }
            });
    };
};

export const examCreate = (examInfo, history) => async (dispatch) => {
    try {
        let result = await axios.post(`${API}/api/teacher/examCreate`, examInfo);
        if (!result) {
            dispatch({
                type: Types.SET_MESSAGE,
                payload: {
                    message: "Server Error",
                },
            });
        } else {
            console.log(result);
            if (result.data.data.code == 200) {
                dispatch({
                    type: Types.SET_EXAMS,
                    payload: {
                        exams: result.data.data.exams,
                        message: "Exam Create Success",
                    }
                });

            } else {
                dispatch({
                    type: Types.SET_MESSAGE,
                    payload: {
                        classes: [],
                        message: result.data.message,
                    },
                });
                // history.push(`/login`);
            }
            history.push(`/teacher/class/${examInfo.classCode}`);
        }
    } catch (errors) {
        if (errors.response?.status === 422) {
            dispatch({
                type: Types.CLASS_ERROR,
                payload: {
                    errors: errors.response.data.errors,
                },
            });
        } else {
        }
    }
};

export const giveExam = (examInfo, history) => async (dispatch) => {
    try {
        let result = await axios.post(`${API}/api/student/giveExam`, examInfo);
        if (!result) {
            dispatch({
                type: Types.SET_MESSAGE,
                payload: {
                    message: "Server Error",
                },
            });
        } else {
            console.log(result);
            if (result.data.code == 200) {
                dispatch({
                    type: Types.SET_EXAM,
                    payload: {
                        exam: result.data.data,
                    },
                });

            } else {
                dispatch({
                    type: Types.SET_MESSAGE,
                    payload: {
                        classes: [],
                        message: result.data.message,
                    },
                });
                // history.push(`/login`);
            }
            history.push(`/student/view-class?classId=${examInfo.classCode}`);
        }
    } catch (errors) {
        if (errors.response?.status === 422) {
            dispatch({
                type: Types.CLASS_ERROR,
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
    history.push("/login");
    return {
        type: Types.SET_USER,
        payload: {
            isAuth: false,
            user: {},
        },
    };
};
