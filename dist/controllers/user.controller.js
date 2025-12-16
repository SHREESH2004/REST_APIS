"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const registerController = (req, res) => {
    const body = req.body;
    res.json({
        message: body,
        status: 200
    });
};
exports.registerController = registerController;
//# sourceMappingURL=user.controller.js.map