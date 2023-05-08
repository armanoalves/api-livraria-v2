import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = async (req, res) => {
        try {
            const autoresResultado = await autores.find();

            res.status(200).json(autoresResultado);
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - Erro interno no servidor`});
        }
    };

    static listarAutorPorId = async (req, res) => {
        try {
            const id = req.params.id;

            const autoresResultado = await autores.findById(id);

            if(autoresResultado !== null) {
                res.status(200).json(autoresResultado);
            } else {
                res.status(404).send({message: "ID do Autor não localizado"});
            }
        } catch (erro) {
            if(erro instanceof mongoose.Error.CastError) {
                res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
            } else {
                res.status(500).send({message: "Erro interno no servidor"});
            }
        }
    };

    static cadastrarAutor = async (req, res) => {
        try {
            let autor = new autores(req.body);

            const autorResultado = await autor.save();

            res.status(201).json(autorResultado.toJSON());
        } catch (erro) {
            res.status(500).send({message: `${erro.message} - Falha ao cadastrar o autor`});
        }
    };

    static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id;

            await autores.findByIdAndUpdate(id, {$set: req.body});

            res.status(200).send({message: "autor atualizado com sucesso."});
        } catch (erro) {
            res.status(500).send({message: `${erro.message} - falha ao atualizar autor.`});
        }            
    };

    static excluirAutor = async (req, res)  => {
        try {
            const id = req.params.id;

            await autores.findByIdAndDelete(id);
            
            res.status(200).send({message: "Autor excluído com sucesso."});
        } catch (erro) {
            res.status(500).send({message: `${erro.message} - falha ao excluir Autor.`});
        }
    };
}

export default AutorController;