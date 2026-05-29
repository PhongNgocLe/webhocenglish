import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5175

const dbFile = path.resolve(__dirname, 'data', 'db.txt')
const subscriberFile = path.resolve(__dirname, 'data', 'subscribers.txt')
const quizLogFile = path.resolve(__dirname, 'data', 'quiz-results.txt')

app.use(express.json())

async function ensureFile(filePath, initial = '') {
  try {
    await fs.access(filePath)
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, initial, 'utf-8')
  }
}

async function readDatabase() {
  await ensureFile(dbFile, '{}')
  const raw = await fs.readFile(dbFile, 'utf-8')
  return JSON.parse(raw || '{}')
}

app.get('/api/content', async (req, res) => {
  try {
    const db = await readDatabase()
    return res.json(db)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Không thể đọc dữ liệu.' })
  }
})

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Email không hợp lệ.' })
  }

  try {
    await ensureFile(subscriberFile)
    await fs.appendFile(subscriberFile, `${new Date().toISOString()} | ${email}\n`, 'utf-8')
    return res.json({ message: 'Đăng ký nhận tư vấn thành công.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Không thể lưu email.' })
  }
})

app.post('/api/quiz', async (req, res) => {
  const { answers } = req.body
  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Dữ liệu bài quiz không hợp lệ.' })
  }

  try {
    const db = await readDatabase()
    const quizData = db.quizData || []
    let score = 0
    const details = quizData.map((item, index) => {
      const selected = answers[index]
      const isCorrect = selected === item.answer
      if (isCorrect) score += 1
      return {
        question: item.question,
        selected: typeof selected === 'number' ? item.options[selected] : null,
        correct: item.options[item.answer],
        isCorrect
      }
    })

    await ensureFile(quizLogFile)
    await fs.appendFile(
      quizLogFile,
      `${new Date().toISOString()} | score:${score}/${quizData.length} | answers:${JSON.stringify(answers)}\n`,
      'utf-8'
    )

    return res.json({ score, total: quizData.length, details })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Không thể đánh giá bài quiz.' })
  }
})

if (process.env.NODE_ENV === 'production') {
  const staticPath = path.resolve(__dirname, 'dist')
  app.use(express.static(staticPath))
  app.get('*', (req, res) => res.sendFile(path.join(staticPath, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`)
})
