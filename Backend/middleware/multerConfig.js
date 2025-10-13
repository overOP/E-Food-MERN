import multer from "multer";

const storange = multer.diskStorage({
    destination: (req, file, cd) => {
        //check the mine type of the file
        const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"]
        if (!allowedFileTypes.includes(file.mimetype))  return cd(new Error("this file type is not allowed"))
        //check the file size in bytes
        if (file.size > 1000000) return cd(new Error("this file is too large"));
        cd(null, "./uploads")
    },
    filename: (req, file, cd) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cd(null,uniqueSuffix + "-" + file.originalname)
    }
})

const upload = multer({
    storage: storange
})

export default upload