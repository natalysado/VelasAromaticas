import dbConnect from '../../../config/db';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      user = new User({ username, email, password, isAdmin: false });
      await user.save();

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(201).json({ token, user: { id: user._id, email: user.email, isAdmin: user.isAdmin } });
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}