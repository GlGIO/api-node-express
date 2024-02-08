import NaoEncontrado from "../erros/NaoEncontrado.js";
import autores from "../models/Autor.js";
class AutorController {

    static listarAutores = async (req, res, next) => {
        try {
            const autoresResultado = await autores.find();

            if (autoresResultado !== null) {
                res.status(200).json(autoresResultado);
            } else {
                res.status(400).json({ message: "Nenhum autor localizado" });
            }
        } catch (erro) {
            next(erro);
        }
    };

    static listarAutorPorId = async (req, res, next) => {

        try {
            const id = req.params.id;

            const autorResultado = await autores.findById(id);

            if (autorResultado !== null) {
                res.status(200).json(autorResultado);
            } else {
                next(new NaoEncontrado("Nenhum autor localizado neste ID"));
            }
        } catch (erro) {
            next(erro);
        }
    };


    static cadastrarAutor = async (req, res, next) => {
        try {
            let autor = new autores(req.body);

            const autorResultado = await autor.save();

            res.status(201).json(autorResultado);
        } catch (erro) {
            next(erro);
        }
    };


    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autorResultado = await autores.findByIdAndUpdate(id, { $set: req.body }, { new: true });
            if (autorResultado) {
                res.status(200).json({ message: "Autor atualizado com Sucesso", autor: autorResultado });
            } else {
                next(new NaoEncontrado("Nenhum autor localizado neste ID"));
            }

        } catch (erro) {
            next(erro);
        }
    };

    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autorResultado = await autores.findByIdAndDelete(id);

            if (autorResultado) {
                res.status(200).json({ message: "Autor deletado com Sucesso", autor: autorResultado });
            } else {
                next(new NaoEncontrado("Nenhum autor localizado neste ID"));
            }
        } catch (erro) {
            next(erro);
        }
    };


}

export default AutorController;