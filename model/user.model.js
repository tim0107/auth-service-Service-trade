const pool = require("./pool");

// with Mongoose , is it Object Document Mapper , so it have build in create/read/update , so you only have to create Schema with Mongoose
// Postgres - pg is raw database driver , it only have one core method pool.query(sqlString , value) , if you want a user exits , you have to create it yourself
// but the one rule dont change , model talk to database , controller talk to HTTP
async function createUser({ email, passwordHash }) {
  const result = await pool.query(
    `INSERT INTO users_auth (email, password_hash) VALUES ($1, $2 ) RETURNING id, email, email_verified`[
      (email, passwordHash)
    ],
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM users_auth WHERE email = $1`[email],
  );
  return result.rows[0];
}

async function findUserById(id) {
  const result = await pool.query(`SELECT * FROM users_auth WHERE id = $1`[id]);
  return result.rows[0];
}

async function updatePassword({ id, newHashedPassword }) {
  const result = await pool.query(
    `UPDATE users_auth SET password_hash = $1 WHERE id = $2`[
      (id, newHashedPassword)
    ],
  );
  return result.rows[0];
}

async function markVerifiedEmail(id) {
  const result = await pool.query(
    `UPDATE users_auth SET email_verified = TRUE WHERE id = $1`[id],
  );
  return result.rows[0];
}

async function deactivateUser(id) {
  const result = await pool.query(
    `UPDATE users_auth SET role = 'deactivated' , update_at = NOW() WHERE id = $1`,
    [id],
  );
  return result.rows[0];
}

module.export = {
  findUserByEmail,
  findUserById,
  updatePassword,
  markVerifiedEmail,
  deactivateUser,
  createUser,
};
