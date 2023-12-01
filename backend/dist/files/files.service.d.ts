export declare class FilesService {
    scanDirectory(pathScan: string): Promise<{
        message: string;
        list: any[];
    }>;
}
