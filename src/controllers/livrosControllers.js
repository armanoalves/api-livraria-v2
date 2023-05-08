import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async (req, res) => {
        try {
            const livrosResultado = await livros.find()
                .populate("autor")
                .exec();
            res.status(200).json(livrosResultado);
        } catch (erro) {
            res.status(500).json({messagem: `${erro.message} - Erro interno no servidor`});
        }
    };

    static listarLivroPorId = async (req, res) => {
        try {
            const id = req.params.id;
            
            const livrosResultado = await livros.findById(id)
                .populate("autor", "nome")
                .exec();

            res.status(200).json(livrosResultado);
        } catch (erro) {
            res.status(400).send({messagem: `${erro.message} - ID do livro não localizado`});
        }
    };

    static cadastrarLivro = async (req, res) => {
        try {
            let livro = new livros(req.body);

            const livrosResultado = await livro.save();

            res.status(201).json(livrosResultado.toJSON());
        } catch (erro) {
            res.status(500).send({messagem: `${erro.message} - Erro ao cadastrar livro`});
        }
    };

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id;

            await livros.findByIdAndUpdate(id, {$set: req.body});

            res.status(200).json({messagem: "Livro atualizado com sucesso"});
        } catch (error) {
            res.status(400).send({messagem: `${error.message} - ID de livro não encontrado`});
        }
    };

    static excluirLivro = async (req, res)  => {
        try {
            const id = req.params.id;

            await livros.findByIdAndDelete(id);

            res.status(200).send({messagem: "Livro exclído com sucesso"});
        } catch (erro) {
            res.status(500).send({messagem: `${erro.message} - Falha ao exluir livro`});
        }
    };

    static listarLivroPorEditora = async (req, res) => {
        try {
            const editora = req.query.editora;

            const livrosResultado = await livros.find({editora: editora});

            res.status(200).json(livrosResultado);
        } catch (error) {
            res.status(500).send({messagem: `${error.message} - Erro interno no serivor`});
        }
    };
}

export default LivroController;