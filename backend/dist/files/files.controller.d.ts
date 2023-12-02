import { FilesService } from "./files.service";
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    scan(pathScan: any): Promise<{
        message: string;
        path: string;
        list: any[];
    }>;
}
