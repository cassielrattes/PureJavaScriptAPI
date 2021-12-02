const { readFile, writeFile } = require("fs/promises");

class ArchiveRepository {
  constructor({ file }) {
    this.file = file;
  }

  async _currentFile() {
    return JSON.parse(await readFile(this.file));
  }

  async find(itemId) {
    const all = await this._currentFile();
    if (!itemId) return all;

    return all.find(({ id }) => itemId === id);
  }

  async create(data) {
    const currentFile = await this._currentFile();
    currentFile.push(data);

    await writeFile(this.file, JSON.stringify(currentFile));

    return data.id;
  }
}

module.exports = ArchiveRepository;
