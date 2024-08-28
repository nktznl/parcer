import { promises as fs } from "fs";

/**
 * Converts a CSV file to a JSON file.
 *
 * @param {string} input - The path to the input CSV file.
 * @param {string} output - The path to the output JSON file.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function parcer(input: string, output: string): Promise<void> {
  // Check if both input and output file paths are provided
  if (!input || !output) {
    console.error("Please provide both input and output file paths.");
    return;
  }

  try {
    // Read the CSV file
    const csvData = await fs.readFile(input, "utf8");
    console.log("CSV Data:", csvData); // Debugging line

    // Split the CSV data into lines
    const lines = csvData.split("\n");
    // Extract the headers from the first line
    const headers = lines[0].split(",");

    // Convert the CSV data to JSON format
    const jsonData = lines.slice(1).map((line) => {
      const values = line.split(",");
      // Check if the number of values matches the number of headers
      if (values.length !== headers.length) {
        throw new Error("Malformed CSV data");
      }
      // Create an object for each line
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {} as Record<string, string>);
    });

    console.log("JSON Data:", JSON.stringify(jsonData, null, 2)); // Debugging line

    // Write the JSON data to the output file
    await fs.writeFile(output, JSON.stringify(jsonData, null, 2));
  } catch (error) {
    // Log any errors that occur during the process
    console.error(`Error: ${(error as Error).message}`);
  }
}
