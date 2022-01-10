import * as fs from 'fs';

let filePath = "test.txt";
let lines: string[] | null = null;
let index: number = 0;



export function readline(): string {


    if (lines == null) {
        try {

            let file = fs.readFileSync(filePath, "utf-8");
            lines = file.split("\r\n");  //windows cr lf
            index = 0;


            //console.log(`Number of Lines: ${lines?.length} Lines = ${lines}`);
        }
        catch (error) {

            console.error(`Error Opening file: ${filePath}: Error = ${error}`);
            return '';
        }
    }

    if (lines == null || index >= lines.length) {

        // eof 
        return '';

    }

    return lines[index];
}