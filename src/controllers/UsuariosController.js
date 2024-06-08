import ConexaoMySql from "../database/conexaoMySql.js";

class UsuariosController {
    async listar(req, resp) {
        try {
            const filtro = req.query.filtro || '';
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'SELECT * FROM usuarios WHERE nome LIKE ?';
            const [resultado] = await conexao.execute(sql, [`%${filtro}%`]);

            resp.send(
                resultado.map((u) => {
                    delete u.senha;
                    return u;
                })
            );
        } catch (error) {
            resp.status(500).send(error);
        }
    }

    async adicionar(req, resp) {
        try {
            const novoCadastro = req.body;

            if (!novoCadastro.nome || !novoCadastro.senha) {
                resp.status(400).send('Os campos de usuario e senha devem ser preenchidos!');
                return;
            }

            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'INSERT INTO usuarios (nome, senha) VALUES (?,md5(?))';
            const resultado = await conexao.execute(sql, [novoCadastro.nome, novoCadastro.senha]);

            resp.send({ resultado })
        } catch (error) {
            resp.status(500).send(error);
        }
    }

    async atualizar(req, resp) {
        try {
            const usuarioEditar = req.body;

            if (!usuarioEditar.nome) {
                resp.status(400).send('O campo de usuario deve ser preenchidos!');
                return;
            }

            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'UPDATE usuarios SET nome = ? WHERE id_usuarios = ?';
            const resultado = await conexao.execute(sql, [usuarioEditar.nome, usuarioEditar.id_usuarios]);

            resp.send({ resultado });
        } catch (error) {
            resp.status(500).send(error);
        };
    }

    async excluir(req, resp) {
        try {
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'DELETE FROM usuarios WHERE id_usuarios = ?';
            const [resultado] = await conexao.execute(sql, [+req.params.idUsuario]);

            resp.send(resultado)
        } catch (error) {
            resp.status(500).send(error)
        }

    }
}

export default UsuariosController;