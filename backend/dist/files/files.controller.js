"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const fs = require("fs");
const path = require("path");
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const mime_1 = require("../core/files/mime");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async scan(pathScan) {
        const resolvePath = path.resolve(path.join("E:", pathScan));
        if (!fs.existsSync(resolvePath))
            throw new common_1.NotFoundException("Directory does not exists");
        const list = fs.readdirSync(resolvePath);
        const resolveItemPath = (item) => {
            return path.resolve(path.join(resolvePath, item));
        };
        return {
            message: "Scan directory successfully",
            list: list
                .filter((item) => {
                return fs.existsSync(resolveItemPath(item));
            })
                .map((item) => {
                const stat = fs.lstatSync(resolveItemPath(item));
                const info = {
                    name: item,
                    size: stat.size,
                    mode: stat.mode,
                    is_directory: stat.isDirectory(),
                    created_time: stat.ctimeMs,
                    modified_time: stat.mtimeMs
                };
                if (stat.isFile()) {
                    const mime = mime_1.FilesMime.lookup(item);
                    info.icon = mime.icon;
                    info.extension = mime.extension;
                }
                return info;
            })
        };
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Get)("/scan"),
    __param(0, (0, common_1.Query)("path")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "scan", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)("files"),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map