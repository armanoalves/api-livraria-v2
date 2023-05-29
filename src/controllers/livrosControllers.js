import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, livros} from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find(); 

      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
            
      const livroResultado = await livros
        .findById(id, {}, { autopopulate: false })
        .populate("autor");

      if(livroResultado !== null) {
        res.status(200).json(livroResultado);
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

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if(busca !== null) {
        const livrosResultado = livros.find(busca);

        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }

    } catch (error) {
      res.status(500).send({messagem: `${error.message} - Erro interno no serivor`});
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if(minPaginas || maxPaginas) busca.numeroPaginas = {}; 

  if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas ;

  if(nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if(autor !== null) {
      busca.autor = autor._id;
    } else  {
      busca = null;
    }

  }

  return busca;
}

export default LivroController;