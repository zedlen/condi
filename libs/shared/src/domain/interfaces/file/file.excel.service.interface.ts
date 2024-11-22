export abstract class ExcelService {
  abstract readFileBuffer(
    fileStream: Buffer,
  ): Promise<Map<string, Array<JSON>>>;
  abstract readFileFromPath(path: string): Promise<Map<string, Array<JSON>>>;
  abstract createInPath(path: string, data: Array<JSON>): string;
  abstract createBuffer(data: Array<JSON>): Buffer;
}
