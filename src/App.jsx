import { useState, useEffect } from 'react'

const stats = [
  { value: '30+', label: 'Bài học tương tác' },
  { value: '96%', label: 'Học viên tự tin giao tiếp' },
  { value: '100%', label: 'Lộ trình linh hoạt' }
]

const features = [
  {
    title: 'Học qua ngữ cảnh thực tế',
    description:
      'Không chỉ là từ vựng rời rạc, bạn sẽ học cách sử dụng câu trong tình huống đời thường qua các video sinh động.'
  },
  {
    title: 'Hệ thống ghi nhớ thông minh (SRS)',
    description:
      'Thuật toán lặp lại ngắt quãng giúp bạn ghi nhớ từ vựng mãi mãi mà không cần nỗ lực quá nhiều.'
  },
  {
    title: 'Tương tác 1-1 cùng AI',
    description:
      'Luyện phát âm và giao tiếp phản xạ bất cứ lúc nào với trợ lý ảo được tối ưu hóa cho người Việt.'
  }
]

const demoLessons = [
  {
    title: 'Bài 01 - Phá băng giao tiếp',
    duration: '5 phút',
    level: 'Cơ bản',
    description:
      'Học 10 mẫu câu mở đầu để bắt chuyện tự nhiên và thoải mái với người nước ngoài.',
    bullets: ['Áp dụng Small talk trong đời thực', 'Tập nói đúng nhịp câu', 'Tăng tự tin khi mở lời'],
    sample: ['Hi, how are you?', 'Where are you from?', 'What do you do?']
  },
  {
    title: 'Bài 02 - Giao tiếp công việc',
    duration: '7 phút',
    level: 'Trung cấp',
    description:
      'Kỹ năng giao tiếp văn phòng với các mẫu câu chuẩn dùng trong email và họp online.',
    bullets: ['Từ vựng chuyên ngành dễ nhớ', 'Câu trả lời linh hoạt', 'Giữ nhịp tự nhiên khi nói'],
    sample: ['Could you clarify that?', 'I will follow up soon.', 'Let me know your thoughts.']
  },
  {
    title: 'Bài 03 - Phản xạ phát âm nhanh',
    duration: '6 phút',
    level: 'Tăng tốc',
    description:
      'Bài tập phát âm /s/ và /z/ giúp bạn nói rõ ràng và tự tin hơn trong mọi tình huống.',
    bullets: ['Phát âm đúng âm cuối', 'Luyện tập cùng video mẫu', 'Nhận phản hồi nhanh'],
    sample: ['This is a success.', 'She has a house.', 'Please pass the notes.']
  }
]

const lessonDatabase = [
  {
    title: 'Bài 04 - Từ vựng du lịch',
    duration: '8 phút',
    level: 'Cơ bản',
    description: 'Tăng vốn từ về du lịch, đơn giản để bạn có thể hỏi đường và đặt phòng khách sạn.',
    highlight: 'Thực hành trực tiếp những câu hỏi và đáp án cơ bản.'
  },
  {
    title: 'Bài 05 - Hội thoại nhà hàng',
    duration: '7 phút',
    level: 'Cơ bản',
    description: 'Những mẫu câu thiết yếu khi gọi món, hỏi phục vụ và thanh toán.',
    highlight: 'Giúp bạn ăn uống tự tin khi đi du lịch hoặc làm việc tại nước ngoài.'
  },
  {
    title: 'Bài 06 - Viết email chuyên nghiệp',
    duration: '9 phút',
    level: 'Trung cấp',
    description: 'Hướng dẫn cấu trúc email công việc, thuyết phục và lịch sự.',
    highlight: 'Bài tập mẫu email theo từng tình huống thực tế.'
  },
  {
    title: 'Bài 07 - Giao tiếp phỏng vấn',
    duration: '10 phút',
    level: 'Trung cấp',
    description: 'Chuẩn bị và luyện tập các câu hỏi thường gặp trong phỏng vấn xin việc.',
    highlight: 'Tăng tự tin trả lời câu hỏi cá nhân và mục tiêu nghề nghiệp.'
  },
  {
    title: 'Bài 08 - Kỹ năng thuyết trình',
    duration: '12 phút',
    level: 'Nâng cao',
    description: 'Học cách trình bày ý tưởng rõ ràng, mạch lạc và cuốn hút.',
    highlight: 'Kèm lời khuyên về giọng nói và cử chỉ tự nhiên.'
  }
]

const quizData = [
  {
    question: 'Câu nào dưới đây là cách chào buổi sáng phù hợp trong môi trường công việc?',
    options: ['Good morning, how are you?', 'See you later', 'Happy birthday', 'Good night'],
    answer: 0
  },
  {
    question: 'Bạn nên nói gì khi muốn nhờ đồng nghiệp giải thích lại?',
    options: ['Could you repeat that, please?', 'I do not know.', 'Maybe later.', 'That is wrong.'],
    answer: 0
  },
  {
    question: 'Câu nào sau đây dùng để đề nghị giúp đỡ một cách lịch sự?',
    options: ['Can I help you?', 'Tell me now.', 'You must do it.', 'I will not help.'],
    answer: 0
  },
  {
    question: 'Khi kết thúc cuộc gọi, bạn nên nói gì để lịch sự?',
    options: ['Thank you for your time.', 'Stop talking.', 'I go now.', 'Later.'],
    answer: 0
  },
  {
    question: 'Câu nào phù hợp để trả lời khi bạn chưa hiểu nội dung?',
    options: ['Could you explain that again?', 'Yes, I know everything.', 'No problem.', 'I did not come.'],
    answer: 0
  }
]

const sampleLesson = {
  name: 'Bài 01 - Phá băng giao tiếp trong 5 phút',
  description:
    'Trong bài học này, bạn sẽ nắm vững 10 mẫu câu "vạn năng" để bắt đầu cuộc trò chuyện với người nước ngoài một cách tự nhiên và tự tin nhất.',
  goals: [
    'Hiểu cách sử dụng cấu trúc "Small talk".',
    'Phát âm chuẩn âm đuôi /s/ và /z/.',
    'Vượt qua nỗi sợ khi nói tiếng Anh.'
  ]
}

const testimonials = [
  {
    name: 'Nguyễn Văn An',
    role: 'Sinh viên',
    quote:
      'Mình từng mất gốc tiếng Anh hoàn toàn, nhưng sau 3 tháng học tại Phong Lê, mình đã có thể tự tin giao tiếp cơ bản và xem phim không cần sub. Cảm ơn đội ngũ rất nhiều!'
  },
  {
    name: 'Trần Thu Thủy',
    role: 'Nhân viên văn phòng',
    quote:
      'Giao diện rất dễ dùng, các bài học của Phong Lê cực kỳ sát với thực tế công việc của mình. Rất đáng đầu tư!'
  }
]

function App() {
  const [email, setEmail] = useState('')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizResult, setQuizResult] = useState(null)
  const [quizDetails, setQuizDetails] = useState([])
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || 'Không thể tải dữ liệu.')
        }
        setContent(data)
      } catch (err) {
        setError('Không thể kết nối đến backend. Dữ liệu tạm thời sẽ được sử dụng.')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  const featuresData = content?.features ?? features
  const loadedDemoLessons = content?.demoLessons ?? demoLessons
  const loadedLessonDatabase = content?.lessonDatabase ?? lessonDatabase
  const loadedQuizData = content?.quizData ?? quizData

  const handleSubscribe = async (event) => {
    event.preventDefault()
    if (!email.trim()) {
      return
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Đăng ký thất bại.')
      }
      setEmail('')
      alert(data.message)
    } catch (err) {
      alert(err.message || 'Đăng ký thất bại.')
    }
  }

  const handleQuizChange = (index, value) => {
    setQuizAnswers((current) => ({ ...current, [index]: Number(value) }))
  }

  const handleQuizSubmit = async (event) => {
    event.preventDefault()
    if (Object.keys(quizAnswers).length < loadedQuizData.length) {
      alert('Vui lòng trả lời hết các câu hỏi.')
      return
    }

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: quizAnswers })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Không thể gửi quiz.')
      }
      setQuizResult(data.score)
      setQuizDetails(data.details)
      setShowQuizResult(true)
    } catch (err) {
      alert(err.message || 'Lỗi gửi quiz.')
    }
  }

  const handleQuizReset = () => {
    setQuizAnswers({})
    setQuizResult(null)
    setQuizDetails([])
    setShowQuizResult(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Phong Lê English</div>
        <nav>
          <a href="#method">Phương pháp</a>
          <a href="#demo">Học thử</a>
          <a href="#practice">Kho bài học</a>
          <a href="#lesson">Bài mẫu</a>
          <a href="#reviews">Đánh giá</a>
          <a href="#contact">Liên hệ</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Học Tiếng Anh Thông Minh</p>
            <h1>Chinh Phục Tiếng Anh Cùng Phong Lê – Học Thông Minh, Nhớ Lâu Hơn.</h1>
            <p>
              Bạn mệt mỏi với cách học vẹt truyền thống? Tại đây, chúng tôi kết hợp phương pháp học tư duy cùng công nghệ AI hiện đại để giúp bạn làm chủ tiếng Anh chỉ trong 30 phút mỗi ngày. Bắt đầu lộ trình cá nhân hóa của riêng bạn ngay hôm nay!
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Học Thử Miễn Phí
              </a>
              <a className="button secondary" href="#method">
                Khám Phá Lộ Trình
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-shadow" />
            <div className="visual-card">
              <div className="visual-header">
                <span>AI Coach</span>
                <strong>Học theo nhịp của bạn</strong>
              </div>
              <h2>30 phút mỗi ngày</h2>
              <p>Chuẩn hoá phát âm, nắm ngữ cảnh và tăng phản xạ giao tiếp với lộ trình cá nhân.</p>
              <div className="visual-features">
                <span>👍 Tương tác 1-1</span>
                <span>📈 Theo dõi tiến độ</span>
                <span>🎯 Mục tiêu rõ ràng</span>
              </div>
            </div>
          </div>
        </section>

        {loading && (
          <section className="section loading-banner">
            <div className="banner-content">Đang tải dữ liệu học thử từ backend...</div>
          </section>
        )}

        {error && (
          <section className="section error-banner">
            <div className="banner-content">{error}</div>
          </section>
        )}

        <section className="stats-strip">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="section method" id="method">
          <div className="section-header">
            <p className="eyebrow">Phương pháp học</p>
            <h2>Tại sao nên chọn Phong Lê English?</h2>
          </div>
          <div className="cards-grid">
            {featuresData.map((item) => (
              <article key={item.title} className="feature-card">
                <div className="feature-icon">✓</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section demo" id="demo">
          <div className="section-header">
            <p className="eyebrow">Trải nghiệm học thử</p>
            <h2>Khám phá nội dung học thử ngay bây giờ</h2>
          </div>

          <div className="demo-grid">
            {loadedDemoLessons.map((lesson) => (
              <article key={lesson.title} className="demo-card">
                <div className="demo-meta">
                  <strong>{lesson.title}</strong>
                  <span>{lesson.duration} · {lesson.level}</span>
                </div>
                <p>{lesson.description}</p>
                <ul>
                  {lesson.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="sample-phrases">
                  {lesson.sample.map((phrase) => (
                    <span key={phrase}>{phrase}</span>
                  ))}
                </div>
                <a className="button secondary" href="#contact">
                  Học thử ngay
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section practice" id="practice">
          <div className="section-header">
            <p className="eyebrow">Kho học liệu</p>
            <h2>Database bài học tiếng Anh phù hợp</h2>
          </div>

          <div className="lesson-db-grid">
            {loadedLessonDatabase.map((lesson) => (
              <article key={lesson.title} className="lesson-card">
                <div className="lesson-label">{lesson.level}</div>
                <strong>{lesson.title}</strong>
                <p>{lesson.description}</p>
                <p className="lesson-highlight">{lesson.highlight}</p>
                <span className="lesson-duration">{lesson.duration}</span>
              </article>
            ))}
          </div>

          <div className="section-header quiz-header">
            <p className="eyebrow">Kiểm tra nhanh</p>
            <h2>Quiz 5 câu để luyện phản xạ</h2>
          </div>

          <form className="quiz-form" onSubmit={handleQuizSubmit}>
            {loadedQuizData.map((item, index) => (
              <article key={item.question} className="quiz-card">
                <p className="quiz-question">
                  <span>{index + 1}.</span> {item.question}
                </p>
                <div className="quiz-options">
                  {item.options.map((option, optionIndex) => (
                    <label key={option} className="quiz-option">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionIndex}
                        checked={quizAnswers[index] === optionIndex}
                        onChange={(e) => handleQuizChange(index, e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </article>
            ))}

            <div className="quiz-actions">
              <button type="submit" className="button primary">
                Nộp bài
              </button>
              <button type="button" className="button secondary" onClick={handleQuizReset}>
                Làm lại
              </button>
            </div>
          </form>

          {showQuizResult && (
            <div className="quiz-result">
              <strong>Bạn đã trả lời đúng {quizResult} trên {loadedQuizData.length} câu.</strong>
              <div className="quiz-review">
                {quizDetails.map((item, index) => {
                  return (
                    <div key={`${item.question}-${index}`} className={`quiz-review-item ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                      <p>{item.question}</p>
                      <p>
                        Câu trả lời của bạn: <strong>{item.selected || 'Chưa chọn'}</strong>
                      </p>
                      <p>
                        Đáp án đúng: <strong>{item.correct}</strong>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </section>

        <section className="section lesson" id="lesson">
          <div className="section-header">
            <p className="eyebrow">Bài học mẫu</p>
            <h2>{sampleLesson.name}</h2>
          </div>
          <p className="lesson-description">{sampleLesson.description}</p>
          <ul className="lesson-goals">
            {sampleLesson.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
          <div className="lesson-cta">
            <a className="button primary" href="#contact">
              Tham gia ngay
            </a>
            <a className="button secondary" href="#reviews">
              Xem đánh giá
            </a>
          </div>
        </section>

        <section className="section testimonials" id="reviews">
          <div className="section-header">
            <p className="eyebrow">Đánh giá từ học viên</p>
            <h2>Tiếng nói thật, tương lai thật</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <p className="quote">“{item.quote}”</p>
                <div className="testimonial-author">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section signup" id="contact">
          <div className="signup-panel">
            <div>
              <p className="eyebrow">Đăng ký nhận tư vấn</p>
              <h2>Bắt đầu hành trình tiếng Anh của bạn cùng Phong Lê</h2>
              <p>Nhập email để nhận lộ trình miễn phí và tin tức ưu đãi dành riêng cho bạn.</p>
            </div>
            <form className="subscribe-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="button primary">
                Nhận lộ trình
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>Về chúng tôi</h3>
            <p>
              Phong Lê English là nền tảng học tiếng Anh trực tuyến hàng đầu, mang sứ mệnh giúp 1 triệu người Việt tự tin bước ra thế giới.
            </p>
          </div>
          <div>
            <h3>Liên hệ</h3>
            <p>Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
            <p>Email: support@phongle-english.com</p>
            <p>Hotline: 1900-XXXX</p>
          </div>
        </div>
        <div className="footer-bottom">Copyright © 2026 Phong Le English. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default App
