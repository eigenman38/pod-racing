import * as fs from 'fs';

let filePath = "test.txt";


try {
    let file = fs.readFileSync(filePath, "utf-8");
    let lines = file.split("\r\n");  //windows cr lf

    console.log(`Number of Lines: ${lines?.length} Lines = ${lines}`);
}
catch (error) {

    console.error(`Error Opening file: ${filePath}: Error = ${error}`);
}








export function readline(): string {

    return '';
}