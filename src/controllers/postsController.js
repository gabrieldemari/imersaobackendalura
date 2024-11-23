import gerarDescricaoComGemini from "../services/geminiService.js";
import {getAllPosts, createPost, updatePost} from "../models/postsModel.js";
import fs from "fs";

export async function listPosts(req, res) {
    // Chama a função para buscar os posts
    const posts = await getAllPosts();
    // Envia uma resposta HTTP com status 200 (ok) e os posts no formato JSON
    res.status(200).json(posts);
}

// Função para postar novos posts
export async function makeNewPost(req, res) {
    const newPost = req.body;
    try { // Tenta fazer o post
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try { // Tenta fazer o post
        const createdPost = await createPost(newPost);
        // Renomeia a imagem para <id do post>.png
        //sugestão de melhoria: aceitar outros formatos
        const updatedImage = `uploads/${createdPost.insertedId}.png`; 
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function updateNewPost(req, res) {
    const id = req.params.id;

    const imgUrl = `http://localhost:3000/${id}.png`;

    

    try { 
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);

        const description = await(gerarDescricaoComGemini(imgBuffer));

        const post = {
            imgUrl: imgUrl,
            descricao: description,
            alt: req.body.alt
        };

        const updatedPost = await updatePost(id, post);

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }    
}