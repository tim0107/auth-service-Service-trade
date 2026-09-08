// 1	POST /auth/register	Create a new account (email + password), starts unverified
// 2	POST /auth/verify-email	Confirm the student email is real, via a link/token sent by email
// 3	POST /auth/login	Check credentials, issue access token + refresh token
// 4	POST /auth/refresh	Trade a valid refresh token for a new access token
// 5	POST /auth/logout	Revoke a refresh token (kill that session)
// 6	POST /auth/forgot-password	Generate a reset token, send it via email
// 7	POST /auth/reset-password	Use that reset token to set a new password
