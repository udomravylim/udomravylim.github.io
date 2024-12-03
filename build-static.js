const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public'); // Folder with your static assets
const outputDir = path.join(__dirname, 'dist'); // Output folder for static files

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Copy all static assets from 'public' to 'dist'
fs.cpSync(publicDir, outputDir, { recursive: true });

// Render your EJS templates into HTML
const templates = ['index.ejs']; // List all your EJS templates here
templates.forEach((template) => {
    const filePath = path.join(__dirname, template);
    const outputFilePath = path.join(outputDir, template.replace('.ejs', '.html'));

    const ejsTemplate = fs.readFileSync(filePath, 'utf8');
    const renderedHTML = ejs.render(ejsTemplate);

    fs.writeFileSync(outputFilePath, renderedHTML);
    console.log(`Rendered: ${template} -> ${outputFilePath}`);
});
