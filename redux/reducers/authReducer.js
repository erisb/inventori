const INITIAL_STATE = {
    id : '',
    nama : '',
    email : '',
    token : '',
    status : 'NOT LOGIN',
    status_token : ''
};

const AuthReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type){
        default:
            return state;
        case 'LOGIN':
            const newState = Object.assign({},state,{
                id : action.payload.id,
                nama : action.payload.nama,
                email : action.payload.email,
                token : action.payload.token,
                status : 'SUCCESS',
                status_token : 'TOKEN BARU'
            })

            return newState;
        case 'REFRESH':
                const newAuth = Object.assign({},state,{
                    id : action.payload.id,
                    nama : action.payload.nama,
                    email : action.payload.email,
                    token : action.payload.token,
                    status : 'SUCCESS',
                    status_token : 'TOKEN REFRESH'
                })
    
                return newAuth;
        case 'LOGOUT':
            return INITIAL_STATE;
    }
};

export default AuthReducer;