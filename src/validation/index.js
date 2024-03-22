function tokenIsSet () {
    return (localStorage.getItem("token") != null)
}

export { tokenIsSet }