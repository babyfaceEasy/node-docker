const protect = (req, res, next) => {
    const { user } = req.session
    if(!user) {
        return res.status(401).json({ status: 'fail', message: 'unauthorized'})

    }

    // set the user on the request object
    req.user = user

    next()
}

module.exports = protect