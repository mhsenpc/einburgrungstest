<template>
  <div class="question-container">
    <div class="question-text">
      {{ question.text }}
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
        @click="selectAnswer(answer)"
      >
        {{ answer.text }}
      </el-button>
    </div>

    <div class="navigation-buttons">
      <el-button 
        @click="$emit('prev')"
        :disabled="!canNavigatePrev"
      >
        <el-icon><arrow-left /></el-icon>
        قبلی
      </el-button>

      <el-button @click="$emit('skip')">
        <el-icon><position /></el-icon>
        رد کردن
      </el-button>

      <el-button
        @click="$emit('next')"
        :disabled="!canNavigateNext"
      >
        بعدی
        <el-icon><arrow-right /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script>
import { ArrowLeft, ArrowRight, Position } from '@element-plus/icons-vue'

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
  methods: {
    isSelected(answer) {
      return this.selectedAnswer && this.selectedAnswer.id === answer.id
    },
    selectAnswer(answer) {
      this.$emit('select-answer', answer)
      setTimeout(() => {
        this.$emit('next')
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
  padding: 15px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>