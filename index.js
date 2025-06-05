import express from 'express'
import cors from 'cors'
import { Pool } from 'pg'

const app = express()
const port = 8080

const pool = new Pool({
  host: 'db',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'feedbackdb',
})

app.use(cors())
app.use(express.json())

app.get('/feedbacks', async (req, res) => {
  const result = await pool.query('SELECT * FROM feedback ORDER BY id ASC')
  res.json(result.rows)
})

app.post('/feedbacks', async (req, res) => {
  const { text } = req.body
  const result = await pool.query(
    'INSERT INTO feedback(text) VALUES($1) RETURNING *',
    [text]
  )
  res.json(result.rows[0])
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})