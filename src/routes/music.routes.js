import express from "express"
import { createMusic,createAlbum, getMusic,getAlbum } from "../controllers/music.controller.js"
import { authArtist,authUser } from "../middlewares/auth.middleware.js"
import multer from "multer"
const upload = multer({
    storage:multer.memoryStorage()
})

const router = express.Router()
router.post("/upload",authArtist,upload.single("music"),createMusic)
router.post("/album",authArtist,createAlbum)
router.get("/",authUser,getMusic)
router.get("/album",authUser,getAlbum)
export default router
