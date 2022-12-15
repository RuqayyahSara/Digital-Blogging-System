import express from 'express'
import bcrypt from 'bcrypt'
import multer from "multer"
import serveIndex from "serve-index";
import config from 'config'
import jwt from "jsonwebtoken";

const { JWT } = config.get("SECRET_KEYS")
import { pool, getData, getDatas } from "../dbConnect.js"
import {
    userRegisterValidatorRules,
    userLoginValidatorRules,
    userBlogValidatorRules,
    errorMiddleware,
} from "../middleware/validation.js"
import generateToken from '../middleware/generateToken.js'
import authMiddleware from "../middleware/verifyToken.js"
const router = express.Router()

router.use('/uploads', serveIndex("uploads", { icons: true }), express.static('uploads'));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase().split(' ').join('-'))
    }
})
var upload = multer({ storage: storage })


router.get('/auth', async (req, res) => {
    try {
        let token = req.cookies['access_token'];
        const payload = jwt.verify(token, JWT);

        res.status(200).json({ payload });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Access Denied. Invalid Token/Token Expired" })
    }
})


router.post('/register', userRegisterValidatorRules(), errorMiddleware, async (req, res) => {
    try {
        let { username, email, password } = req.body
        const users = await getData()

        const emailFound = users.find(e => e.email == email)
        if (emailFound) return res.status(400).json({ error: "Email already registered" })
        //Password Hashing
        password = await bcrypt.hash(password, 12);
        const [user] = await pool.query(`INSERT INTO users (username, email, password) VALUES (?,?,?);`,
            [username, email, password])
        res.status(200).json({ success: "User is Registered Successfully" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.post('/login', userLoginValidatorRules(), errorMiddleware, async (req, res) => {
    try {
        const { email } = req.body
        const [user] = await pool.query(`SELECT * FROM users WHERE email=?`, [email]);

        if (!(user.length))
            return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });

        const passValid = await bcrypt.compare(req.body.password, user[0].password);
        if (!passValid)
            return res.status(401).json({ error: "Invalid Credentials" });

        let payload = {
            email: user[0].email,
            _id: user[0].id
        }
        let token = generateToken(payload);
        const { password, ...data } = user[0]
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.post('/blog', upload.single('img'), authMiddleware, userBlogValidatorRules(), errorMiddleware, async (req, res) => {
    try {
        let payload = req.payload
        let { title, descrpition, category } = req.body
        const [user] = await pool.query(`SELECT * FROM users WHERE email=?`, [payload.email]);

        if (!(user.length))
            return res.status(401).json({ errors: [{ msg: "Unauthorized access" }] });

        if (!(req.file)) return res.status(400).json({ error: "Upload Image !" });

        let [currdate] = await pool.query(`SELECT CURRENT_TIMESTAMP()`)
        await pool.query(`INSERT INTO posts (title, descrpition, img, date, category, uid) VALUES (?,?,?,?,?,?);`,
            [title, descrpition, `${config.get("URL")}/${req.file.path}`, currdate[0]['CURRENT_TIMESTAMP()'], category, payload._id])
        res.status(200).json({ success: "Blog added Successfully" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})


router.get('/blogs', async (req, res) => {
    try {
        let postss = await getDatas()
        let posts = []
        for (let i = 0; i < postss.length; i++) {
            let [user] = await pool.query(`SELECT * FROM users WHERE id=?`, [postss[i].uid]);
            posts.push({ ...postss[i], author: user[0].username })
        }
        res.status(200).json(posts);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.get('/blog/:id', async (req, res) => {
    try {
        let [post] = await pool.query(`SELECT * FROM posts WHERE id=?`, [req.params.id]);
        let [user] = await pool.query(`SELECT * FROM users WHERE id=?`, [post[0].uid]);
        const { password, ...data } = user[0]
        post[0].user = data
        res.status(200).json(post[0]);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

export default router