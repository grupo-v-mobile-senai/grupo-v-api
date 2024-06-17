import ConexaoMySql from '../database/conexaoMySql.js';

class ProdutosController {
    async listar(req, res) {
        try {
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'SELECT * FROM produto WHERE categoria_id = ?';
            const [resultado] = await conexao.execute(sql, [req.params.idCategoria]);

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
            const sql = 'INSERT INTO produto (nome, estoque, cores, categoria_id) VALUES(?,?,?,?)';
            const [resultado] = await conexao.execute(sql, [novoProduto.nome, novoProduto.estoque, novoProduto.cores, novoProduto.categoria.id]);
            res.send(resultado);
        } catch (error) {
            res.status(500).send(error);

        }
    }
    async atualizar(req, res) {
        try {
            const produtoEditado = req.body;

            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'UPDATE produto SET nome = ?, estoque = ?, cores = ? WHERE id = ?';
            const [resultado] = await conexao.execute(sql, [produtoEditado.nome, produtoEditado.estoque, produtoEditado.cores, produtoEditado.id]);
            res.send(resultado);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async excluir(req, res) {
        try {
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'DELETE FROM produto WHERE id = ?';
            const [resultado] = await conexao.execute(sql, [+req.params.idProduto]);

            res.send(resultado);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default ProdutosController;