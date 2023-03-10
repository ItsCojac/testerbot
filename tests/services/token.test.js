const { sequelize } = require('../../src/db');
const Token = new (require('../../src/services/token'))(sequelize);




describe('Token', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  beforeEach(async () => {
    await sequelize.models.Token.destroy({ truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('create', () => {
    it('should create a token', async () => {
      const token = await Token.create({
        name: 'Test Token',
        symbol: 'TEST',
        decimals: 18,
      });
      expect(token.id).toEqual(1);
      expect(token.name).toEqual('Test Token');
      expect(token.symbol).toEqual('TEST');
      expect(token.decimals).toEqual(18);
    });
  });

  describe('findByName', () => {
    it('should find a token by name', async () => {
      await Token.create({
        name: 'Test Token',
        symbol: 'TEST',
        decimals: 18,
      });
      const token = await Token.findByName('Test Token');
      expect(token.id).toEqual(1);
      expect(token.name).toEqual('Test Token');
      expect(token.symbol).toEqual('TEST');
      expect(token.decimals).toEqual(18);
    });
  });
});
