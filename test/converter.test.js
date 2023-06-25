const { Converter } = require('../converter/index');
const fs = require('node:fs');

test('Converter csv to json',()=>{
    const convert = new Converter();
    const csvString = "id,name,tag,type\n123,John,G,M\n313,Bob,J,B";
    const expectedJsonValue = '[{"id":"123","name":"John","tag":"G","type":"M"},{"id":"313","name":"Bob","tag":"J","type":"B"}]';
    const convertedJsonValue = convert.csvToJson(csvString);
    expect(convertedJsonValue).toBe(expectedJsonValue);
});

test('Converter json to csv',()=>{
    const convert = new Converter();
    const jsonString = '[{"id":"123","name":"John","tag":"G","type":"M"},{"id":"313","name":"Bob","tag":"J","type":"B"}]';
    const expectedCsvString = "id,name,tag,type\n123,John,G,M\n313,Bob,J,B";
    const convertedCsvValue = convert.jsonToCsv(jsonString);
    expect(convertedCsvValue).toBe(expectedCsvString);
});

test('Read csv file and convert to json',()=>{
    const convert = new Converter();
    const csvString = convert.readFile('testData.csv');
    const expectedJsonValue = '[{"id":"123","name":"John","tag":"G","type":"M"},{"id":"313","name":"Bob","tag":"J","type":"B"}]';
    const convertedJsonValue = convert.csvToJson(csvString);
    expect(convertedJsonValue).toBe(expectedJsonValue);
});

test('Read csv file and convert to json with empty next line',()=>{
    const convert = new Converter();
    const csvString = convert.readFile('testData2.csv');
    const expectedJsonValue = '[{"id":"123","name":"John","tag":"G","type":"M"},{"id":"313","name":"Bob","tag":"J","type":"B"}]';
    const convertedJsonValue = convert.csvToJson(csvString);
    expect(convertedJsonValue).toBe(expectedJsonValue);
});

test('Read json file and convert to csv',()=>{
    const convert = new Converter();
    const jsonString = convert.readFile('testData.json');
    const expectedCsvString = "id,name,tag,type\n123,John,G,M\n313,Bob,J,B";
    const convertedCsvValue = convert.jsonToCsv(jsonString);
    expect(convertedCsvValue).toBe(expectedCsvString);
});

test('Read csv file and convert to json, write to new json file',()=>{
    const convert = new Converter();
    const newFileName = 'csvToJsonTest.json';
    const csvString  = convert.readFile('testData.csv');
    const expectedJsonValue = '[{"id":"123","name":"John","tag":"G","type":"M"},{"id":"313","name":"Bob","tag":"J","type":"B"}]';
    const jsonData = convert.csvToJson(csvString);
    convert.writeFile(newFileName,jsonData);
    
    const fileReadJsonData = convert.readFile(newFileName);
    expect(fileReadJsonData).toBe(expectedJsonValue);
    
    fs.unlink(newFileName, (err) => {
        if (err) throw err;
      }); 
})