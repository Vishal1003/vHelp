function errorHandler(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        // Token invalid or missing
        return res.json({ message: "The user is not authorized" });
    } else if (err.name === "ValidationError") {
        // Example: Expected pdf but uploaded image file
        return res.json({ message: err });
    } else {
        //   Default to server error
        return res.json({ message: err });
    }
}
module.exports = errorHandler;
