const fs = require("fs");

const path = require("path");

const spellhtml = (dirStr) => {

    const items = fs.readdirSync(dirStr).map(file => {
        
    });

};

const currentDir = process.argv[2] || "./";

const treeStr = spellhtml(currentDir);

// fs.watchFile(path.join(__dirname, 'aa.txt'),11 11)
fs.writeFileSync(path.join(__dirname, "aa.txt"), treeStr, "utf8");
