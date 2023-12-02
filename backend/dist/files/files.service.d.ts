export declare class FilesService {
    scanDirectory(pathScan: string): Promise<{
        message: string;
        path: string;
        list: any[];
    }>;
}
