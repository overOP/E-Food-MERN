const permitTo = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: "You are not authorized to perform this action",
            });
        }
        next();
    }
}

export default permitTo