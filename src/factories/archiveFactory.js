const ArchiveRepository = require("../repositories/archiveRepository");
const ArchiveService = require("../services/archiveService");
const { join } = require("path");
const path = require("path");

const filename = join(__dirname, "../../database", "data.json");

const generateInstance = () => {
  const archiveRepository = new ArchiveRepository({
    file: filename,
  });

  const archiveService = new ArchiveService({
    archiveRepository,
  });

  return archiveService;
};

module.exports = { generateInstance };
