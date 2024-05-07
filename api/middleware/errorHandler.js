const errorHandler = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        console.error('Error:', error);
        const status = error.status || 500;
        const message = error.message || 'An error occurred';
        res.status(status).json({ success: false, message, error: error.message });
    }
};

export default errorHandler;
