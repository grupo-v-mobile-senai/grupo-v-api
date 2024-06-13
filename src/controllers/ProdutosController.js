import ConexaoMySql from '../database/conexaoMySql.js';

class ProdutosController {
    async listar(req, res) {
        try {
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'SELECT * FROM produto';
            const [resultado] = await conexao.execute(sql);
            
            res.send(resultado.map((prod) => {
                return prod;
            }))
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async adicionar(req, res) {
        try {
            const novoProduto = req.body;

            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'INSERT INTO produto (nome, estoque, cor, categoria_id) VALUES(?,?,?,?)';
            const [resultado] = await conexao.execute(sql, [novoProduto.nome, novoProduto.estoque, novoProduto.cor, novoProduto.categoria_id]);
            res.send(resultado);
        } catch (error) {
            res.status(500).send(error);

        }
    }
}

export default ProdutosController;