import pool from '../config/db.js';

const User = {
  async create(username, password) {
    const result = await pool.query(
      'INSERT INTO usuarios (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    return result.rows[0];
  },

  async findByUsername(username) {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE username = $1',
      [username]
    );
    return result.rows[0];
  }
};

export default User;
