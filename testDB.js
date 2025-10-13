const pool = require('./config/database');

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()'); // test simple
    console.log('✅ Connexion OK :', res.rows[0]);
  } catch (err) {
    console.error('❌ Erreur connexion DB :', err.message);
  } finally {
    pool.end();
  }
}

testConnection();
