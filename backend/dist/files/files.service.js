"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const fs = require("fs");
const path = require("path");
const common_1 = require("@nestjs/common");
const mime_1 = require("../core/files/mime");
let FilesService = class FilesService {
    async scanDirectory(pathScan) {
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
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
//# sourceMappingURL=files.service.js.map