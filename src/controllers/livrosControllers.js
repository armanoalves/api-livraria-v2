import NaoEncontrado from "../erros/NaoEncontrado.js";
import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async (req, res, next) => {
        try {
            const livrosResultado = await livros.find()
                .populate("autor")
                .exec();
            res.status(200).json(livrosResultado);
        } catch (erro) {
            next(erro);
        }
    };

    static listarLivroPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            
            const livrosResultado = await livros.findById(id)
                .populate("autor", "nome")
                .exec();

            if(livrosResultado !== null) {
                res.status(200).json(livrosResultado);
            } else {
                next(new NaoEncontrado("ID do livro não localizado"));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            let livro = new livros(req.body);

            const livrosResultado = await livro.save();

            res.status(201).json(livrosResultado.toJSON());
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livrosResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

            if(livrosResultado !== null) {
                res.status(200).json({messagem: "Livro atualizado com sucesso"});
            } else {
                next(new NaoEncontrado("ID do livro não localizado"));
            }
        } catch (error) {
            next(error);
        }
    };

    static excluirLivro = async (req, res, next)  => {
        try {
            const id = req.params.id;

            const livrosResultado = await livros.findByIdAndDelete(id);

            if(livrosResultado !== null) {
                res.status(200).send({messagem: "Livro exclído com sucesso"});
            } else {
                next(new NaoEncontrado("ID do livro não localizado"));
            }

        } catch (erro) {
            next(erro);
        }
    };

    static listarLivroPorEditora = async (req, res) => {
        try {
            const editora = req.query.editora;

            const livrosResultado = await livros.find({editora: editora});

            if(livrosResultado !== null) {
                res.status(200).json(livrosResultado);
            } 

        } catch (error) {
            res.status(500).send({messagem: `${error.message} - Erro interno no serivor`});
        }
    };
}

export default LivroController;