import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
    constructor(mensagem = "Nenhum autor localizado neste ID") {
        super(mensagem, 404);
    }
}

export default NaoEncontrado;
