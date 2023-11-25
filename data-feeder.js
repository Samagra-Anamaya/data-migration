const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const dataFolderPath = path.join(__dirname, 'data');
const distBatchMap = {};
const baseUrl = 'http://localhost:3000';

fs.readdir(dataFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading data folder:', err);
    return;
  }

  // Filter out directories, if any
  const fileNames = files.filter((file) =>
    fs.statSync(path.join(dataFolderPath, file)).isFile(),
  );
  populateMapAndPost(fileNames);
});

function populateMapAndPost(fileNames) {
  for (const file of fileNames) {
    const districtLGDCode = file.split('_')[0];
    const batch_no = file.split('_')[1];
    if (!distBatchMap[`${districtLGDCode}`]) {
      distBatchMap[`${districtLGDCode}`] = [];
    }
    distBatchMap[`${districtLGDCode}`].push(Number(batch_no));
  }
  readAndSendPost();
}

async function readAndSendPost() {
  let districtCodes = Object.keys(distBatchMap);
  for (const districtLGDCode of districtCodes) {
    distBatchMap[districtLGDCode].sort();
    for (const batch_no of distBatchMap[districtLGDCode]) {
      await readAndSendPostByDistrictBatch(districtLGDCode, batch_no);
    }
  }
}

async function readAndSendPostByDistrictBatch(districtLGDCode, batch_no) {
  const fileName = `${districtLGDCode}_${batch_no}`;
  const filePath = `${dataFolderPath}/${fileName}`;
  const fileContent = await readFileAsync(filePath, 'utf8');
  const dataObj = JSON.parse(fileContent);
  const payload = {
    districtLGDCode: districtLGDCode,
    batchNo: batch_no,
    data: dataObj,
  };
  const response = await axios.post(
    `${baseUrl}/data-scraper/saveDataForDistrict`,
    payload,
  );
  console.log(`File ${fileName} \tstatus`, response.data.message);
}
