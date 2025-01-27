<template>
  <div class="question-container">
    <div class="question-text">
      <div class="primary-text">{{ question.text }}</div>
      <div class="translation-text">{{ question.translation }}</div>
    </div>
    
    <div v-if="question.image" class="question-image">
      <img :src="question.image" :alt="question.text">
    </div>

    <div class="answers-container">
      <el-button
        v-for="answer in question.answers"
        :key="answer.id"
        :type="isSelected(answer) ? 'primary' : 'default'"
        class="answer-button"
        size="large"
        round
        :plain="!isSelected(answer)"
        :disabled="isLoading"
        @click="selectAnswer(answer)"
      >
        <div class="primary-text">
          <b>{{ answer.text }} </b>
          <br/>
          <br/> 
          {{ answer.translation }}
        </div>
        
      </el-button>
    </div>

    <div class="navigation-buttons">
      <el-button 
        @click="$emit('prev')"
        :disabled="!canNavigatePrev"
      >
        <el-tooltip
          content="قبلی"
          placement="top"
          effect="light"
        >
          <el-icon><ArrowLeft /></el-icon>
        </el-tooltip>
      </el-button>

      <el-button @click="$emit('skip')">
        <el-tooltip
          content="رد کردن"
          placement="top"
          effect="light"
        >
          <el-icon><position /></el-icon>
        </el-tooltip>
      </el-button>

      <el-button
        @click="$emit('next')"
        :disabled="!canNavigateNext"
      >
        <el-tooltip
          content="بعدی"
          placement="top"
          effect="light"
        >
          <el-icon><arrow-right /></el-icon>
        </el-tooltip>
      </el-button>
    </div>
  </div>
</template>

<script>
import { ArrowLeft, ArrowRight, Position } from '@element-plus/icons-vue'
import { ref } from 'vue'

export default {
  name: 'ExamQuestion',
  components: {
    ArrowLeft,
    ArrowRight,
    Position
  },
  props: {
    question: {
      type: Object,
      required: true
    },
    selectedAnswer: {
      type: Object,
      default: null
    },
    canNavigatePrev: {
      type: Boolean,
      default: false
    },
    canNavigateNext: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const isLoading = ref(false)
    
    return {
      isLoading
    }
  },
  methods: {
    isSelected(answer) {
      return this.selectedAnswer && this.selectedAnswer.id === answer.id
    },
    selectAnswer(answer) {
      if (this.isLoading) return
      this.isLoading = true
      this.$emit('select-answer', answer)
      setTimeout(() => {
        this.$emit('next')
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.question-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  direction: rtl;
}

.question-text {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: right;
}

.primary-text {
  margin-bottom: 0.5rem;
  direction: ltr;
  text-align: left;
}

.translation-text {
  font-size: 0.9em;
  color: #666;
  margin-top: 0.25rem;
  direction: rtl;
  text-align: right;
}

.question-image {
  margin-bottom: 2rem;
}

.question-image img {
  max-width: 100%;
  height: auto;
}

.answers-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.answer-button {
  text-align: right;
  height: auto;
  white-space: normal;
  padding: 15px 25px;
  width: 100%;
  transition: all 0.3s ease;
}

.answer-button:hover {
  transform: translateX(-5px);
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>