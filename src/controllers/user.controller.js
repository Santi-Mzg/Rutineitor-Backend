import User from '../models/user.model.js';

export const getUser = async (req, res) => {
  try {
    const userFound = await User.find({ username: req.params.username })
    console.log(JSON.stringify(userFound))

    if (!userFound) {
      return res.status(404).json({ message: "No se encontró el usuario" });
    }

    res.json(userFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getUsers = async (req, res) => {
    try {
      const users = await User.find({})
      console.log(JSON.stringify(users))

      if (users.length === 0) {
        return res.status(404).json({ message: "No se encontraron usuarios" });
      }

      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userFound = await User.findOneAndDelete({ _id: req.params.id });
        if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}