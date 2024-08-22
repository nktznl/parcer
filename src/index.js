import fs from "fs";
import { Parser } from "./parser.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;

const input = argv.input;
const output = argv.output;

if (!input || !output) {
  console.error("Please provide both input and output file paths.");
  process.exit(1);
}

fs.readFile(input, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const parser = new Parser();
  const parsedData = parser.parse(data);

  const headers = parsedData[0];
  const result = parsedData.slice(1).map((row) => {
    return headers.reduce((acc, header, index) => {
      acc[header] = row[index];
      return acc;
    }, {});
  });

  fs.writeFile(output, JSON.stringify(result, null, 2), (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});
