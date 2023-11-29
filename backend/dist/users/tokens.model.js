"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = void 0;
const mongoose = require("mongoose");
exports.TokenSchema = new mongoose.Schema({
    access: {
        type: String,
        required: true,
        unique: true
    },
    userid: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
//# sourceMappingURL=tokens.model.js.map