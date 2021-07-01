export const setLoggedIn = (loginData) => {
    return {
        type : 'LOGIN',
        payload : loginData,
    }
}

export const setRefreshToken = (refreshData) => {
    return {
        type : 'REFRESH',
        payload : refreshData,
    }
}

export const Logout = () => {
    return {
        type : 'LOGOUT'
    }
}