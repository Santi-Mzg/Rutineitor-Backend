import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const token_secret = process.env.TOKEN_SECRET

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userFoundbyEmail = await User.findOne({ email })
        if (userFoundbyEmail) return res.status(400).json({ message: "El email ya se encuentra registrado" })

        const userFoundByUsername = await User.findOne({ username })
        if (userFoundByUsername) return res.status(400).json({ message: "Nombre de usuario no disponible" })

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            isTrainer: false,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie("token", token, { 
            httpOnly: true, // No accesible desde JavaScript del lado del cliente
            secure: true, // Solo se envía por HTTPS
            sameSite: "None",
            expires: new Date(Date.now() + 3600000) // 1 hora de expiración
        })

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            isTrainer: userSaved.isTrainer,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = await createAccessToken({ id: userFound._id });
         
        res.cookie("token", token, {
          httpOnly: true, // No accesible desde JavaScript del lado del cliente
          secure: true, // Solo se envía por HTTPS
          sameSite: "None",
          expires: new Date(Date.now() + 3600000) // 1 hora de expiración
        });
        
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            age: userFound.age,
            weight: userFound.weight,
            height: userFound.height,
            goal: userFound.goal,
            isTrainer: userFound.isTrainer,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', { 
        httpOnly: true, 
        secure: true,
        sameSite: "None" 
    });
    return res.sendStatus(200);
};

export const modify = async (req, res) => {
    const { username, age, weight, height, goal } = req.body;

    try {
        const userFound = await User.findOne({ username })
        if (!userFound) return res.status(400).json({ message: "Usuario no se encuentra registrado" })

        userFound.username = username;
        userFound.age = age;
        userFound.weight = weight;
        userFound.height = height;
        userFound.goal = goal;

        const userSaved = await userFound.save();

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            age: userSaved.age,
            weight: userSaved.weight,
            height: userSaved.height,
            goal: userSaved.goal,
            isTrainer: userSaved.isTrainer,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const verifyToken = async (req, res) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "No autorizado" })

    jwt.verify(token, token_secret, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado" })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "No autorizado" })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            age: userFound.age,
            weight: userFound.weight,
            height: userFound.height,
            goal: userFound.goal,
            isTrainer: userFound.isTrainer,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    })
}