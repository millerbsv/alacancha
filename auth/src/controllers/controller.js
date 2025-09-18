import User from '../models/model.js';

export async function registerUser(req, res) {
  const { username, password } = req.body;
  try {
    const newUser = await User.create(username, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
}

export async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (user && user.password === password) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
