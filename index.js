const express = require("express");
const pool = require("./db/pool");

const app = express();

// when json or html send here , this middleware handle it , without this , it will be  undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  pool is the connection to Postgres
// get the route from db-test
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ connected: true, time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
