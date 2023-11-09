class CashflowService {
  #googleSheetsService;

  constructor(googleSheetsService) {
    this.#googleSheetsService = googleSheetsService;
  }

  newEntry({ date, category, amount, comment }) {
    return this.#googleSheetsService.insert([
      [date, category, amount, comment],
    ]);
  }

  async getCategories() {
    const categories = await this.#googleSheetsService.getCategories();
    return categories.flatMap((category) => category);
  }
}

module.exports = CashflowService;
