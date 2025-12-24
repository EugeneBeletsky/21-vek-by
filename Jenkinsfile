pipeline {
  agent { label 'linux' }
  options { timestamps() }
  environment {
    BASE_URL = credentials('BASE_URL')
    LOGIN_EMAIL = credentials('LOGIN_EMAIL')
    LOGIN_PASSWORD = credentials('LOGIN_PASSWORD')
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
      }
    }
    stage('Test') {
      steps {
        sh 'npx playwright test --reporter=line,html,allure-playwright'
      }
      post {
        always {
          archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true, allowEmptyArchive: true
          archiveArtifacts artifacts: 'allure-results/**', fingerprint: true, allowEmptyArchive: true
        }
      }
    }
  }
}

