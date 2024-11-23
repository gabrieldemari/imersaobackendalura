import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts, makeNewPost, uploadImage, updateNewPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionSuccessStatus: 200
};

// Trecho de código necessário para Windows, para fazer o upload mantendo o nome original do arquivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Trecho de código para Linux ou MacOS
//const upload = multer({dest: "./uploads"});

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Permite que o servidor interprete requisições com o corpo no formato JSON
    app.use(express.json());

    app.use(cors(corsOptions));

    // Rota para buscar todos os posts
    app.get("/posts", listPosts);

    // Rota para criar um post
    app.post("/posts", makeNewPost);

    // Rota para fazer upload de imagens
    app.post("/upload", upload.single("imagem"), uploadImage);

    // Rota para atualizar os novos posts
    app.put("/upload/:id", updateNewPost);
};

export default routes;