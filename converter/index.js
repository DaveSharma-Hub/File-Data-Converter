const fs = require('fs');

class Converter{
    constructor(fileName){
        this.fileName = fileName;
    }
    
    delimiter(inputString, character){
        return inputString.split(character);
    }
    
    convertToObject(valueArray){
        const obj = this.headers.reduce((acc,header)=>{
            acc[header] = header;
            return acc;
        },{});
        for(let i=0;i<valueArray.length && this.headers.length;i++){
            obj[this.headers[i]] = valueArray[i];
        }
        return obj;
    }
    
    csvToJson(csv){
        // this.readCSVFile();
        // const csv = "id,name,tag,type\n123,John,G,M\n313,Bob,J,B";

        const tokens = this.delimiter(csv,'\n');
        const headerString = tokens[0];
        const valueString = tokens.slice(1,tokens.length);
        this.headers = this.delimiter(headerString,',');
        const json = new Array();
        valueString.forEach((value)=>{
            const valueArray = this.delimiter(value,',');
            const obj = this.convertToObject(valueArray);
            json.push(obj);
        })
        this.jsonString = JSON.stringify(json);
        // this.createJSONFile()
        return this.jsonString;
    }
    
    jsonToCsv(jsonString){
        const json = JSON.parse(jsonString);
        
        const headers = json.reduce((acc,value)=>{
            Object.keys(value).forEach((key)=>{
                acc[key] = key;
            })
            return acc;
        },{});

        let csvString = "";
        const headersArray = Object.keys(headers);
        headersArray.forEach((header,index)=>{
            csvString += header
            if(index<headersArray.length-1){
                csvString += ","
            }
        })
        csvString+="\n";
        json.forEach((obj,index)=>{
            let line = "";
            const jsonArray = Object.entries(obj);
            jsonArray.forEach(([key,value],index)=>{
                line += value
                if(index<jsonArray.length-1){
                    line += ',';
                }
            });
            if(index < json.length-1){
                line += "\n";
            }
            csvString += line;
        });
        this.csvString = csvString;
        return this.csvString;
    }

    readFile(fileName){
        try{
            const fileContents = fs.readFileSync(fileName, 'utf-8');
            return fileContents;
        }catch(err){
            throw new Error('Reading file error', err);
        }
    }
}


module.exports ={
    Converter
}