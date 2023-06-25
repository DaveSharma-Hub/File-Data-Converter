# File-Data-Converter
Convert CSV to JSON and JSON to CSV using a custom converter class

## Usage
```js
//CSV To JSON
const converter = new Converter();
const csvData = converter.readFile('fileName.csv');
const jsonData = converter.csvToJson(csvData);
converter.writeFile('newFileName.json',jsonData);



//JSON To CSV
const converter = new Converter();
const jsonData = converter.readFile('fileName.json');
const csvData = converter.jsonToCsv(csvData);
converter.writeFile('newFileName.csv',csvData);
```
