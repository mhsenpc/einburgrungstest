<template>
  <div class="exam-container">
    <div class="timer" v-if="examStarted">
      <el-icon><timer /></el-icon>
      {{ formatTime(timeRemaining) }}
    </div>

    <div v-if="!examStarted" class="start-page">
      <h1>آزمون تابعیت آلمان</h1>
      <div class="exam-info">
        <p>به آزمون تابعیت آلمان خوش آمدید.</p>
        <ul>
          <li>این آزمون شامل 30 سوال است</li>
          <li>برای هر سوال 4 گزینه وجود دارد که تنها یکی از آنها صحیح است</li>
          <li>شما می‌توانید سوالات را رد کنید و بعداً به آنها برگردید</li>
          <li>زمان آزمون 60 دقیقه است</li>
        </ul>
      </div>
      <el-button type="primary" @click="startExam">
        شروع آزمون
        <el-icon><video-play /></el-icon>
      </el-button>
    </div>

    <div v-else>
      <div class="progress-info">
        <span>سوال {{ currentQuestionIndex + 1 }} از {{ questions.length }}</span>
      </div>

      <ExamQuestion
        :question="currentQuestion"
        :selectedAnswer="selectedAnswers[currentQuestion.id]"
        :canNavigatePrev="currentQuestionIndex > 0"
        :canNavigateNext="currentQuestionIndex < questions.length - 1"
        @select-answer="handleAnswerSelect"
        @prev="previousQuestion"
        @next="nextQuestion"
        @skip="skipQuestion"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeUnmount } from 'vue'
import { Timer, VideoPlay } from '@element-plus/icons-vue'
import ExamQuestion from '@/components/ExamQuestion.vue'
import { getRandomQuestions } from '@/data/questions'

export default {
  name: 'ExamView',
  components: {
    ExamQuestion,
    Timer,
    VideoPlay
  },
  setup() {
    const examStarted = ref(false)
    const questions = ref([])
    const currentQuestionIndex = ref(0)
    const selectedAnswers = ref({})
    const timeRemaining = ref(60 * 60) // 60 minutes in seconds
    let timer

    const currentQuestion = computed(() => 
      questions.value[currentQuestionIndex.value] || null
    )

    const startExam = () => {
      questions.value = getRandomQuestions(30)
      examStarted.value = true
      startTimer()
    }

    const startTimer = () => {
      timer = setInterval(() => {
        if (timeRemaining.value > 0) {
          timeRemaining.value--
        } else {
          clearInterval(timer)
          // Handle exam completion
        }
      }, 1000)
    }

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const handleAnswerSelect = (answer) => {
      selectedAnswers.value[currentQuestion.value.id] = answer
    }

    const nextQuestion = () => {
      if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value++
      }
    }

    const previousQuestion = () => {
      if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--
      }
    }

    const skipQuestion = () => {
      nextQuestion()
    }

    onBeforeUnmount(() => {
      if (timer) {
        clearInterval(timer)
      }
    })

    return {
      examStarted,
      questions,
      currentQuestionIndex,
      currentQuestion,
      selectedAnswers,
      timeRemaining,
      startExam,
      formatTime,
      handleAnswerSelect,
      nextQuestion,
      previousQuestion,
      skipQuestion
    }
  }
}
</script>

<style scoped>
.exam-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  direction: rtl;
}

.timer {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
}

.start-page {
  text-align: center;
  padding: 40px;
}

.exam-info {
  max-width: 600px;
  margin: 30px auto;
  text-align: right;
}

.exam-info ul {
  list-style-type: none;
  padding: 0;
}

.exam-info li {
  margin: 10px 0;
  position: relative;
  padding-right: 20px;
}

.exam-info li:before {
  content: "•";
  position: absolute;
  right: 0;
  color: #42b983;
}

.progress-info {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #666;
}
</style>