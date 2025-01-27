<template>
  <div class="results-container">
    <h1>نتایج آزمون</h1>
    
    <div class="results-summary">
      <div class="result-item">
        <h3>پاسخ‌های صحیح</h3>
        <div class="result-value correct">{{ correctAnswers }}</div>
      </div>
      <div class="result-item">
        <h3>پاسخ‌های نادرست</h3>
        <div class="result-value incorrect">{{ incorrectAnswers }}</div>
      </div>
      <div class="result-item">
        <h3>سوالات بی‌پاسخ</h3>
        <div class="result-value skipped">{{ skippedAnswers }}</div>
      </div>
    </div>

    <div class="success-rate">
      <h2>درصد موفقیت</h2>
      <div class="percentage">{{ successRate }}%</div>
    </div>

    <div class="chart-container">
      <Pie
        :data="chartConfig.data"
        :options="chartConfig.options"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'ExamResults',
  components: {
    Pie
  },
  props: {
    questions: {
      type: Array,
      required: true
    },
    selectedAnswers: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const correctAnswers = computed(() => {
      return Object.values(props.selectedAnswers).filter(answer => 
        answer.correct
      ).length
    })

    const incorrectAnswers = computed(() => {
      return Object.values(props.selectedAnswers).filter(answer => 
        !answer.correct
      ).length
    })

    const skippedAnswers = computed(() => {
      return props.questions.length - Object.keys(props.selectedAnswers).length
    })

    const successRate = computed(() => {
      return Math.round((correctAnswers.value / props.questions.length) * 100)
    })

    const chartConfig = computed(() => ({
      data: {
        labels: ['پاسخ‌های صحیح', 'پاسخ‌های نادرست', 'سوالات بی‌پاسخ'],
        datasets: [{
          data: [correctAnswers.value, incorrectAnswers.value, skippedAnswers.value],
          backgroundColor: ['#67C23A', '#ff9900', '#909399']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            rtl: true,
            labels: {
              font: {
                size: 14
              }
            }
          }
        }
      }
    }))

    return {
      correctAnswers,
      incorrectAnswers,
      skippedAnswers,
      successRate,
      chartConfig
    }
  }
}
</script>

<style scoped>
.results-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  direction: rtl;
}

.results-summary {
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
}

.result-item {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f7fa;
  min-width: 200px;
}

.result-item h3 {
  margin: 0 0 10px 0;
  color: #606266;
}

.result-value {
  font-size: 2.5rem;
  font-weight: bold;
}

.result-value.correct {
  color: #67C23A;
}

.result-value.incorrect {
  color: #F56C6C;
}

.result-value.skipped {
  color: #909399;
}

.success-rate {
  margin: 40px 0;
}

.success-rate .percentage {
  font-size: 3rem;
  font-weight: bold;
  color: #409EFF;
}

.chart-container {
  height: 400px;
  margin: 40px 0;
}

.restart-button {
  margin-top: 20px;
}
</style>