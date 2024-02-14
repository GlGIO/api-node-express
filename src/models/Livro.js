import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: { type: String },
        titulo: {
            type: String,
            required: [true, "o Titulo é obrigatório"]
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "autores", required: [true, "o Autor é obrigatório"]
        },
        editora: {
            type: String,
            required: [true, "o Nome da Editora é obrigatório"],
            enum: {
                values: ["Alura", "Classicos"],
                message: "A editora {VALUE} não é um valor permitido"
            }
        },
        numeroPaginas: {
            type: Number,
            min: [10, "O número de páginas {VALUE} deve estar entre 10 e 5000"],
            max: [5000, "O número de páginas {VALUE} deve estar entre 10 e 5000"]
        }
    }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;