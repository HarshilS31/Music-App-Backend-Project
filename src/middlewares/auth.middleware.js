import jwt from "jsonwebtoken"
export const authArtist = async(req,res,next) => {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({message:"Unauthourized"})

    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!=="Artist") {
            return res.status(403).json({message:"You do not have the access to create music/album!"})
        }
        req.user=decoded
        next()
    }catch(error) {
        return res.status(401).json({message:"Unauthourized"})
    }
}
export const authUser = async(req,res,next) => {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({message:"Unauthourized"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!=="User") {
            return res.status(403).json({message:"You can't fetch music!"})
            
        }
        req.user=decoded
    }catch(error) {
        return res.status(401).json({message:"Unauthourized"})
    }
}