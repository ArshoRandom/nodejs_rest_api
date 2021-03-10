exports.handler = (res, error, status) => {
    res.status(status || 500).json({
        error_message: error.message ? error.message : error
    })
}
