import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = async (req, res, next) => {
        try {
            const autoresResultado = await autores.find();

            res.status(200).json(autoresResultado);
        } catch (erro) {
            next(erro);
        }
    };

    static listarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autoresResultado = await autores.findById(id);

            if(autoresResultado !== null) {
                res.status(200).json(autoresResultado);
            } else {
                res.status(404).send({message: "ID do Autor não localizado"});
            }
        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            let autor = new autores(req.body);

            const autorResultado = await autor.save();

            res.status(201).json(autorResultado.toJSON());
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            await autores.findByIdAndUpdate(id, {$set: req.body});

            res.status(200).send({message: "autor atualizado com sucesso."});
        } catch (erro) {
            next(erro);
        }            
    };

    static excluirAutor = async (req, res, next)  => {
        try {
            const id = req.params.id;

            await autores.findByIdAndDelete(id);
            
            res.status(200).send({message: "Autor excluído com sucesso."});
        } catch (erro) {
            next(erro);
        }
    };
}

export default AutorController;