import * as xlsx from 'xlsx';

function readExcelFile(filePath) {
  try {
    const path = '/';
    const file = xlsx.readFile(`${path}/${filePath}`);
    const data = [];
    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

const uploadedFile = readExcelFile('VillageDetails.xlsx');
console.log(uploadedFile);
