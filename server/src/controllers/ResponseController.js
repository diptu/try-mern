
const errorResponse = (res, { status = 500, message = "Internal server Error" }) => {

    res.status(status).json({
        success: false,
        message: message
    });
}

const successResponse = (res, { status = 200, message = "Ok", payload = {} }) => {

    res.status(status).json({
        success: true,
        message: message,
        payload: payload
    });
}
module.exports = { errorResponse, successResponse }