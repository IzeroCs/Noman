export declare namespace FilesMime {
    const types: {
        [k: string]: string;
    };
    const icons: {
        [k: string]: string;
    };
    type MimeResult = {
        extension: string;
        type: string;
        icon: string;
    };
    function lookup(filename: string): MimeResult | null;
}
