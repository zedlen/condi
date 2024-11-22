import { Injectable, Logger } from '@nestjs/common';
import { ExcelService } from '@shared/domain/interfaces/file/file.excel.service.interface';
import { WorkBook } from 'xlsx';
import fs from 'fs';
import { Readable } from 'stream';

@Injectable()
export class XlsxService implements ExcelService {
  private logger = new Logger(XlsxService.name);
  private read;
  private readFile;
  private utils;
  constructor() {
    this.loadLibs();
  }

  async loadLibs() {
    const { read, readFile, utils, set_fs, stream } = await import('xlsx');
    this.read = read;
    this.readFile = readFile;
    this.utils = utils;
    set_fs(fs);
    stream.set_readable(Readable);
  }

  async readFileBuffer(fileStream: Buffer): Promise<Map<string, Array<JSON>>> {
    try {
      console.log(this.read);
      const workbook = this.read(fileStream);
      return this.getWorkbookAsJSON(workbook);
    } catch (error) {
      this.logger.error(error);
      return new Map();
    }
  }

  async readFileFromPath(path: string): Promise<Map<string, Array<JSON>>> {
    try {
      const workbook = this.readFile(path);
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

  private getWorkbookAsJSON(workbook: WorkBook): Map<string, Array<JSON>> {
    const sheets = workbook.SheetNames;

    const data = new Map();
    try {
      sheets.forEach((sheetName) =>
        data.set(
          sheetName,
          this.utils.sheet_to_json(workbook.Sheets[sheetName], {
            range: workbook.Sheets[sheetName]['!ref'].includes('A1') ? 1 : 0,
          }),
        ),
      );
    } catch (err) {
      this.logger.error(err);
    } finally {
      return data;
    }
  }
}
