import { ConfigService } from "@nestjs/config";
export declare class FilesService {
    private readonly configService;
    private dataRootPath;
    constructor(configService: ConfigService);
    isPathOuter(pathFile: string): boolean;
    resolvePath(pathFile: string): string;
    scanDirectory(pathScan: string): Promise<{
        message: string;
        path: string;
        list: any[];
    }>;
}
