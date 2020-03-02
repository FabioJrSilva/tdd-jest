const DB = require('../../../database/index');

class AccountRepository {
  constructor() {
    this.db = DB;
  }

  async all(filter = {}) {
    return this.db('accounts').where(filter).select();
  }

  async create(account) {
    if (!account.name) throw new Error({ error: 'Nome é obrigatório!' });
    if (!account.user_id) throw new Error({ error: 'user_id é obrigatório!' });

    const accountDb = await this.all({ name: account.name });
    if (accountDb && accountDb.length) throw new Error({ error: 'Conta já existe!' });

    return this.db('accounts').insert(account, '*');
  }
}

module.exports = new AccountRepository();
