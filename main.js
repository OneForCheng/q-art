const fs = require('fs');
const path = require('path');
const { v4: uuid4 } = require('uuid')

const getEntryFilePath = () => {
    const entry = process.argv[2] || 'default';
    return path.resolve(__dirname, `./data/${entry}`);
}

const saveData = (filePath, data) => {
    fs.writeFile(filePath, JSON.stringify(data), err => {
        if (err) {
            console.error(err)
        }
    })
}

const getNewItem = () => ({
    uuid: uuid4(),
    title: process.argv[3] || '',
    content: process.argv[4] || '',
})

const getFileContent = filePath => {
    if (fs.existsSync(filePath)) {
        const origin = fs.readFileSync(filePath, "utf8");
        return origin ? JSON.parse(origin) : null;
    }
    return null;
}

const main = () => {
    const filePath = getEntryFilePath();
    const newItem = getNewItem();
    const data = getFileContent(filePath) || [];
    saveData(filePath, [...data, newItem]);
}

main();
