import bcrypt from 'bcrypt';
import User from '../../../models/User';
import dbConnect from '../../../utils/db';

async function handler(req, res) {
  
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await  dbConnect()

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    return;
  }

  const newUser = new User({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    isAdmin: false,
  });
  
  const user = await newUser.save();
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export default handler;