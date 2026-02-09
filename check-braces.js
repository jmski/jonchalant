import fs from "fs";
const content = fs.readFileSync("app/css/utilities.css", "utf8");
const lines = content.split("\n");
let openBraces = 0;
let closeBraces = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  for (let j = 0; j < line.length; j++) {
    if (line[j] === "{") openBraces++;
    if (line[j] === "}") closeBraces++;
  }
}

console.log("Opening braces: " + openBraces);
console.log("Closing braces: " + closeBraces);
console.log("Difference: " + (openBraces - closeBraces));

// Find any unclosed rules
let balance = 0;
let problematicLines = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const prevBalance = balance;
  for (let j = 0; j < line.length; j++) {
    if (line[j] === "{") balance++;
    if (line[j] === "}") balance--;
  }
  if (balance !== prevBalance && Math.abs(balance) > 5) {
    problematicLines.push(i + 1 + ": " + line.substring(0, 100));
  }
}

if (problematicLines.length > 0) {
  console.log("\nLines with large brace imbalance:");
  problematicLines.slice(0, 10).forEach((line) => console.log(line));
}
