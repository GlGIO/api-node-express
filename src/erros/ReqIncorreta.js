import ErroBase from "./ErroBase.js";

class ReqIncorreta extends ErroBase {
    constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
        super(mensagem, 400);
    }
}

export default ReqIncorreta;