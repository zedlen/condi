import { Injectable, Logger } from '@nestjs/common';
import { ExcelService } from '@shared/domain/interfaces/file/file.excel.service.interface';
import xlsx from 'node-xlsx';

@Injectable()
export class ExcelJSService implements ExcelService {
  private logger = new Logger(ExcelJSService.name);

  async readFileBuffer(fileBuffer: Buffer): Promise<Map<string, Array<JSON>>> {
    try {
      console.log('i am here', xlsx);
      const rows = xlsx.parse(fileBuffer);
      console.log(rows);
      //const workbook = await excel.xlsx.load(fileBuffer);
      //return this.getWorkbookAsJSON(workbook);
    } catch (error) {
      this.logger.error(error);
      return new Map();
    }
  }

  async readFileFromPath(path: string): Promise<Map<string, Array<JSON>>> {
    try {
      /*const excel = new Excel.Workbook();
      const workbook = await excel.xlsx.readFile(path);
      return this.getWorkbookAsJSON(workbook);*/
    } catch (error) {
      this.logger.error(error);
      return new Map();
    }
  }

  createBuffer(data: Array<JSON>): Buffer {
    return Buffer.from(JSON.stringify(data));
  }
  createInPath(path: string, data: Array<JSON>): string {
    console.log(data);
    return path;
  }

  private getWorkbookAsJSON(workbook: any): Map<string, Array<JSON>> {
    const sheets = workbook.worksheets;
    console.log(sheets);
    const data = new Map();
    try {
      /*sheets.forEach((sheetName) =>
        data.set(
          sheetName,
          utils.sheet_to_json(workbook.Sheets[sheetName], {
            range: workbook.Sheets[sheetName]['!ref'].includes('A1') ? 1 : 0,
          }),
        ),
      );*/
    } catch (err) {
      this.logger.error(err);
    } finally {
      return data;
    }
  }
}
