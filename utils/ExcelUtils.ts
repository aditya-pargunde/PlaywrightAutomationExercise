import * as XLSX from 'xlsx';

export class ExcelUtils {
    static getSheetData(filePath: string, sheetName: string) {
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(worksheet);
    }
}