"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(req, res, next) {
    const NOT_FOUND_STATUS_CODE = 404;
    res
        .status(NOT_FOUND_STATUS_CODE)
        .send('<h1>Page not found</h1>');
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map