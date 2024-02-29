import * as Types from '../actions/types'

const init={
    isAuth:false,
    isTeacher:false,
    isStudent:false,
    user:{},
    message:"",
    errors:{}
}
const authReducer=(state=init,action)=>{
    switch (action.type) {
        case Types.SET_USER:
            return {
                user:action.payload.user,
                isTeacher:action.payload.isTeacher,
                isStudent:action.payload.isStudent,
                isAuth:action.payload.isAuth,
                message:"",
                errors:{}
            }
        case Types.USER_ERROR:
            return {
                ...state,
                errors:action.payload.errors
            }
        case Types.SET_MESSAGE:
            return {
                ...state,
                message:action.payload.message
            }
        default:
            return state
    }
}
export default authReducer;