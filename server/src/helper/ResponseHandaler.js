const errorResponse = (res, 
    {
        message="Internal server error!", 
        statusCode=500
    }) => {
    return res.status(statusCode).json({
        success: false,
        message: message,
    });
}

const successResponse = (res, 
    {
        message="Internal server error!", 
        statusCode=200,
        payload = {}
    }) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        payload: payload
    });
}


module.exports = { errorResponse, successResponse };