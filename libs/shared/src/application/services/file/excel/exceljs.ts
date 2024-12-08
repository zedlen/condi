import { Injectable, Logger } from '@nestjs/common';
import { ExcelService } from '@shared/domain/interfaces/file/file.excel.service.interface';
import * as Excel from 'exceljs';

@Injectable()
export class ExcelJSService implements ExcelService {
  private logger = new Logger(ExcelJSService.name);

  async readFileBuffer(fileBuffer: Buffer): Promise<Map<string, Array<JSON>>> {
    try {
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(fileBuffer);
      return this.getWorkbookAsJSON(workbook);
    } catch (error) {
      this.logger.error(error);
      return new Map();
    }
  }

  async readFileFromPath(path: string): Promise<Map<string, Array<JSON>>> {
    try {
      const excel = new Excel.Workbook();
      const workbook = await excel.xlsx.readFile(path);
      return this.getWorkbookAsJSON(workbook);
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

  private getWorkbookAsJSON(
    workbook: Excel.Workbook,
  ): Map<string, Array<JSON>> {
    const sheets = workbook.worksheets;
    const data = new Map();
    try {
      sheets.forEach((sheet) => {
        const headersRow = sheet.hasMerges ? 2 : 1;
        const sheetData = [];
        const header = sheet.getRow(headersRow);
        sheet.eachRow((row, rowNumber) => {
          const rowValues = row.values;
          if (rowNumber > headersRow) {
            const data = {};
            header.eachCell((cell, index) => {
              data[(cell.value as string) || ''] = rowValues[index];
            });
            sheetData.push(data);
          }
        });
        data.set(sheet.name, sheetData);
      });
    } catch (err) {
      this.logger.error(err);
    } finally {
      return data;
    }
  }
}
