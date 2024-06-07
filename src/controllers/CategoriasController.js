import ConexaoMySql from "../database/conexaoMySql.js";

class CategoriasController {
    async listar(req, res) {
        try {
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'SELECT * FROM categoria';
            const [resultado] = await conexao.execute(sql);

            res.send(resultado.map((cat) => {
                return cat;
            }));
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async adicionar(req, res) {
        try {
            const novaCategoria = req.body;

            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'INSERT INTO categoria (nome, cor, imagem) VALUES(?,?,?)';
            const [resultado] = await conexao.execute(sql, [novaCategoria.nome, novaCategoria.cor, novaCategoria.imagem]);
            res.send(resultado);
        } catch (error) {
            res.status(500).send(error);

        }
    }
};

export default CategoriasController;