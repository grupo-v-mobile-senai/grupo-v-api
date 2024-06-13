import ConexaoMySql from "../database/conexaoMySql.js";

class UsuariosController {
    async listar(req, resp) {
        try {
            const idUsuarioLogado = req.headers['x-usuario-logado'];

            console.log(idUsuarioLogado);

            const filtro = req.query.filtro || '';
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'SELECT * FROM usuario WHERE nome LIKE ?';
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

            if (!novoCadastro.nome || !novoCadastro.email || !novoCadastro.senha) {
                resp.status(400).send('Os campos de usuario, e-mail e senha devem ser preenchidos!');
                return;
            }

            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?,?,md5(?))';
            const resultado = await conexao.execute(sql, [novoCadastro.nome, novoCadastro.email, novoCadastro.senha]);

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
            const sql = 'UPDATE usuario SET nome = ? WHERE id = ?';
            const resultado = await conexao.execute(sql, [usuarioEditar.nome, usuarioEditar.email, usuarioEditar.id]);

            resp.send({ resultado });
        } catch (error) {
            resp.status(500).send(error);
        };
    }

    async excluir(req, resp) {
        try {
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'DELETE FROM usuario WHERE id = ?';
            const [resultado] = await conexao.execute(sql, [+req.params.idUsuario]);

            resp.send(resultado)
        } catch (error) {
            resp.status(500).send(error)
        }

    }
}

export default UsuariosController;