// Store a reset request — when someone clicks "forgot password," you generate a temporary token and save a record: which user it's for, a hash of the token (not the raw token, same reasoning as refresh tokens), and when it expires.
// Check if a reset token is still valid — when someone clicks the link from their email and submits a new password, you need to verify: does this token exist, has it not been used already, and has it not expired yet.
// Mark a reset token as used — once someone successfully resets their password with a given token, that token should never be usable again, even if it hasn't technically expired yet (prevents reusing an old email link).

const pool = require("./pool");

async function resetPassword() {}
