export const internalServerErrorResponse = (error) => {
    return {
        message: 'Something went wrong',
        err: error,
        data: {},
        success: false
    }
}

export const customErrorResponse = (error) => {
    if(!error.message && !error.explanation) {
        return internalServerErrorResponse(error);
    }
    return {
        message: error.message,
        err: error.explanation,
        data: {},
        success: false
    }
}