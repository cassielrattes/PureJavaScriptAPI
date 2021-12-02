class ArchiveService {
  constructor({ archiveRepository }) {
    this.archiveRepository = archiveRepository;
  }

  async find(itemId) {
    return this.archiveRepository.find(itemId);
  }

  async create(data) {
    return this.archiveRepository.create(data);
  }
}

module.exports = ArchiveService;
