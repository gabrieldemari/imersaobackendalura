import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const connection = await conectarAoBanco(process.env.CONNECTION_STRING);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getAllPosts() {
    // Seleciona o banco de dados "imersao-instalike"
    const db = connection.db("imersao-instalike");
    // Seleciona a coleção "posts" dentro do banco de dados
    const collection = db.collection("posts");
    // Retorna um array com todos os itens da coleção
    return collection.find().toArray();
}

export async function createPost(newPost) {
    // Seleciona o banco de dados "imersao-instalike"
    const db = connection.db("imersao-instalike");

    // Seleciona a coleção "posts" dentro do banco de dados
    const collection = db.collection("posts");

    // 
    return collection.insertOne(newPost);
}

export async function updatePost(id, post) {
    // Seleciona o banco de dados "imersao-instalike"
    const db = connection.db("imersao-instalike");

    const objID = ObjectId.createFromHexString(id)

    // Seleciona a coleção "posts" dentro do banco de dados
    const collection = db.collection("posts");

    // 
    return collection.updateOne({_id: new ObjectId(objID)}, {$set: post});
}