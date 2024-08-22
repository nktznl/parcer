// create a csv parser in es6

class Parser {
  constructor() {
    this.delimiter = ",";
    this.newline = "\n";
  }

  parse(text) {
    const rows = text.split(this.newline);
    return rows.map((row) => row.split(this.delimiter));
  }
}

export { Parser };
