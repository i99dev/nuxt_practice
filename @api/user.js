// user.js
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const axios = require("axios");


router.get('/', (req, res) => {
  // Authenticate the user and generate a JWT
  const { email, password } = req.body
  if (email === 'test@example.com' && password === 'password') {
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' })
    return res.json({ token })
  }
  return res.status(401).json({ message: 'Invalid email or password' })
})

router.post('/logout', (req, res) => {
  // Invalidate the user's JWT
  return res.json({ message: 'Successfully logged out' })
})

router.post('/register', (req, res) => {
  // Register a new user and generate a JWT
  const { email, password } = req.body
  // Store the new user in a database or in memory
  const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' })
  return res.json({ token })
})


router.get("/github", async (req, res) => {
  const { authorization } = req.headers;
  const { data } = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: authorization,
    },
  });
  res.send(data);
});

module.exports = router;

module.exports = router
