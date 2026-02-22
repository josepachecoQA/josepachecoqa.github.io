const fs = require('fs');
const path = require('path');
const { createInstrumenter } = require('istanbul-lib-instrument');

const sourcePath = path.join(__dirname, '..', 'script.js');
const outputDir = path.join(__dirname, '..', 'assets', 'instrumented');
const outputPath = path.join(outputDir, 'script.js');

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function run() {
    const source = fs.readFileSync(sourcePath, 'utf8');
    const instrumenter = createInstrumenter({ produceSourceMap: true });
    const instrumented = instrumenter.instrumentSync(source, sourcePath);

    ensureDir(outputDir);
    fs.writeFileSync(outputPath, instrumented, 'utf8');

    const map = instrumenter.lastSourceMap();
    if (map) {
        fs.writeFileSync(`${outputPath}.map`, JSON.stringify(map), 'utf8');
    }
}

run();
