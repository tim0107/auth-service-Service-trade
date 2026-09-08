//

const pool = require("./pool");
const crypto = require("crypto");

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function storeRefreshToken({ user_id, token_hash, expires_at }) {
  const result = await pool.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3) RETURNING id`,
    [user_id, token_hash, expires_at],
  );
  return result.rows[0];
}

// is this refresh token real , current and not revoked
// revoked mean have this token been manually killed yet
async function findValidToken(token_hash) {
  const result = await pool.query(
    `SELECT * FROM refresh_tokens WHERE token_hash = $1 AND revoked = FALSE AND expires_at > NOW()`,
    [token_hash],
  );
  return result.rows[0];
}

async function revokeToken(token_hash) {
  const result = await pool.query(
    `UPDATE refresh_tokens SET revoked = TRUE where token_hash = $1`,
    [token_hash],
  );
  return result.rows[0];
}

module.exports = {
  hashToken,
  findValidToken,
  storeRefreshToken,
  revokeToken,
};
