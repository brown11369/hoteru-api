const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.roles) return res.status(403).send({ success: false, message: "not allowed" });
        const rolesArray = [...allowedRoles]
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)
        if (!result) return res.status(403).send({ success: false, message: "not allowed." });
        next()
    }
}
module.exports = verifyRoles;