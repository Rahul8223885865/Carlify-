function isLoggedIn() {
    return !!sessionStorage.getItem("user")
}

export default isLoggedIn
