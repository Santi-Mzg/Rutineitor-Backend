import User from '../models/user.model.js';

export const getUser = async (req, res) => {
  try {
    const userFound = await User.findOne({ username: req.params.username })

    if (!userFound) {
      return res.status(404).json({ message: "No se encontró el usuario" });
    }

    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        isTrainer: userFound.isTrainer,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getUsers = async (req, res) => {
    try {
      const usersData = await User.find({})

      if (usersData.length === 0) {
        return res.status(404).json({ message: "No se encontraron usuarios" });
      }

      const users = [];
      
      usersData.forEach(user => {
        users.push({
            id: user._id,
            username: user.username,
            email: user.email,
            isTrainer: user.isTrainer,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
      });

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