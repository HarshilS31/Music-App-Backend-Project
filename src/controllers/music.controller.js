import { musicModel } from "../models/music.model.js"
import jwt from "jsonwebtoken"
import { uploadFile } from "../services/storage.js"
import { albumModel } from "../models/album.model.js"

export const createMusic = async (req, res) => {

    if (req.user.role !== "Artist") {
        return res.status(403).json({
            message: "Sorry, you do not have access to create music"
        })
    }
    const { title } = req.body
    const file = req.file
    if (!file) {
        return res.status(400).json({
            message: "Music file is required"
        })
    }
    const uploadResponse = await uploadFile(
        file.buffer.toString("base64")
    )
    console.log("Upload response:", uploadResponse)
    const music = await musicModel.create({
        uri: uploadResponse.url,
        title,
        artist: req.user.id
    })
    return res.status(201).json({
        message: "Music created successfully",
        data: music
    })

}
export const createAlbum = async (req,res) => {

    if (req.user.role !== "Artist") {
        return res.status(403).json({
            message: "Sorry, you do not have access to create an album"
        })
    }
    const {title,musics} = req.body 
    const album = await albumModel.create({
        title,
        artist:req.user.id,
        musics:musics,
    })
    return res.status(201).json({message:"Album created successfully",album})
}   
export const getMusic = async(req,res) => {
    const musics = await musicModel.find().limit(2).populate("artist")
    res.status(200).json({
        message:"Music fetched successfully",
        musics
    })

}
export const getAlbum = async(req,res) => {
    const albums = await albumModel.find().select("title artist").populate("artist")
    res.status(200).json({
        message:"Albums fetched successfully",
        albums
    })

}