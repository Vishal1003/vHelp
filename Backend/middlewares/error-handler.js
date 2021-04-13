function errorHandler(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        // Token invalid or missing
        return res.status(401).json({ message: "The user is not authorized" });
    } else if (err.name === "ValidationError") {
        // Example: Expected pdf but uploaded image file
        return res.status(400).json({ message: err });
    } else {
        //   Default to server error
        return res.status(500).json({ message: err });
    }
}
module.exports = errorHandler;
