import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'ian123',
  database: 'elecStock',
};

class ConexaoMySql {
  async getConexao() {
    if (!ConexaoMySql.conexao) {
      ConexaoMySql.conexao = await mysql.createConnection(dbConfig);
    }

    return ConexaoMySql.conexao;
  }
}

export default ConexaoMySql;