const fs = require("fs");
const xlsx = require("xlsx");

const workbook = xlsx.readFile("peer_review_2024.xlsx");
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const excelData = xlsx.utils.sheet_to_json(worksheet);  
const peerResponsesSheet = workbook.Sheets[workbook.SheetNames[1]];
const peerResponsesData = xlsx.utils.sheet_to_json(peerResponsesSheet);
const ratingsSheet =   workbook.Sheets[workbook.SheetNames[2]];
const ratingsData = xlsx.utils.sheet_to_json(ratingsSheet);
const stlSheet = workbook.Sheets[workbook.SheetNames[4]];
const stlData = xlsx.utils.sheet_to_json(stlSheet);
module.exports = { excelData, peerResponsesData, ratingsData, stlData};
