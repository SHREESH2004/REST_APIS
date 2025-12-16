"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const registerController = (req, res) => {
    const { name, email, password } = req.body;
    res.status(200).json({
        data: {
            name: name,
            email: email,
            password: password
        },
    });
};
exports.registerController = registerController;
//# sourceMappingURL=user.controller.js.map