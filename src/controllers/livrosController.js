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

            const livroResultados = await livros.findById(id)
                .populate("autor", "nome")
                .exec();

            if (livroResultados !== null) {
                res.status(200).json(livroResultados);
            } else {
                next(new NaoEncontrado("Nenhum livro localizado neste ID"));
            }
        } catch (erro) {

            next(erro);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            let livro = new livros(req.body);

            const livroResultado = await livro.save();

            res.status(200).json({ message: "Livro cadastrado com Sucesso", autor: livroResultado });
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });
            if (livroResultado !== null) {
                res.status(200).json({ message: "Livro atualizado com Sucesso", autor: livroResultado });
            } else {
                next(new NaoEncontrado("Nenhum livro localizado neste ID"));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livroResultado = await livros.findByIdAndDelete(id);

            if (livroResultado !== null) {
                res.status(200).json("Livro excluido com Sucesso");
            } else {
                next(new NaoEncontrado("Nenhum livro localizado neste ID"));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static listarLivroPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora;

            const livrosResultado = await livros.find({ "editora": editora });

            if (livrosResultado !== null) {
                console.log(livrosResultado);
                res.status(200).json(livrosResultado);
            } else {
                next(new NaoEncontrado("Nenhum livro localizado neste ID"));
            }
        } catch (erro) {
            next(erro);
        }
    };



}

export default LivroController;