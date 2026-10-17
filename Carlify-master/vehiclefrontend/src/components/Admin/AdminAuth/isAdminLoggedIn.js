function isAdminLoggedIn() {
    return !!sessionStorage.getItem("admin")
}

export default isAdminLoggedIn

