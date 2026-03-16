import { readFileSync } from 'fs';

const c = readFileSync('app/css/pages.css', 'utf8');

// Check comment balance
let inComment = false;
let opens = 0, closes = 0;
let lines = c.split('\n');
let lastOpenLine = -1;

for (let i = 0; i < c.length; i++) {
  if (!inComment && c[i] === '/' && c[i+1] === '*') {
    inComment = true;
    opens++;
    // find line number
    const lineNum = c.substring(0, i).split('\n').length;
    lastOpenLine = lineNum;
    i++;
  } else if (inComment && c[i] === '*' && c[i+1] === '/') {
    inComment = false;
    closes++;
    i++;
  }
}
console.log('Comment opens:', opens, 'closes:', closes, 'currently in comment:', inComment);
if (inComment) console.log('Last open comment at line:', lastOpenLine);

// Find any line that looks like it has a selector without { 
// (very basic check for lines ending with character that could be selector-like)
for (let i = 0; i < lines.length; i++) {
  const l = lines[i].trimEnd();
  // Check lines that might be CSS selectors without opening brace on same line
  // Look for lines that are not comments, not properties, end with certain chars
  if (l && !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*') && !l.trim().startsWith('@') && l.trim().endsWith(',') && i < 3970 && i > 3940) {
    console.log('Potential multi-line selector at line', (i+1), ':', l.trim().substring(0, 80));
  }
}
