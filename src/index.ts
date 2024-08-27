import { promises as fs } from "fs";

export async function parcer(input: string, output: string): Promise<void> {
  if (!input || !output) {
    console.error("Please provide both input and output file paths.");
    return;
  }

  try {
    const csvData = await fs.readFile(input, "utf8");
    console.log("CSV Data:", csvData); // Debugging line

    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const jsonData = lines.slice(1).map((line) => {
      const values = line.split(",");
      if (values.length !== headers.length) {
        throw new Error("Malformed CSV data");
      }
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {} as Record<string, string>);
    });

    console.log("JSON Data:", JSON.stringify(jsonData, null, 2)); // Debugging line

    await fs.writeFile(output, JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
}
