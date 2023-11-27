"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesMime = void 0;
const path = require("path");
const mime_db_1 = require("./mime.db");
var FilesMime;
(function (FilesMime) {
    FilesMime.types = {};
    FilesMime.icons = {};
    function lookup(filename) {
        const extension = path
            .extname("x." + filename)
            .toLowerCase()
            .slice(1);
        if (!extension)
            return null;
        const type = FilesMime.types[extension] || "unknown";
        if (!type)
            return null;
        const icon = FilesMime.icons[extension] || "unknown";
        return { extension, type, icon };
    }
    FilesMime.lookup = lookup;
    function populateMaps() {
        Object.keys(mime_db_1.DBMimeType).forEach((type) => {
            const exts = mime_db_1.DBMimeType[type];
            if (!exts || !exts.length) {
                return;
            }
            for (let i = 0; i < exts.length; ++i) {
                FilesMime.types[exts[i]] = type;
            }
        });
        Object.keys(mime_db_1.DBIcon).forEach((icon) => {
            const exts = mime_db_1.DBIcon[icon];
            if (!exts || !exts.length) {
                return;
            }
            for (let i = 0; i < exts.length; ++i) {
                FilesMime.icons[exts[i]] = icon;
            }
        });
    }
    populateMaps();
})(FilesMime || (exports.FilesMime = FilesMime = {}));
//# sourceMappingURL=mime.js.map