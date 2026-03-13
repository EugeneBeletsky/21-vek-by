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
        sh 'npx playwright test'
      }
    }
    stage('Generate Allure Report') {
      steps {
        sh 'npx allure generate allure-results --clean -o allure-report'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true, allowEmptyArchive: true
      archiveArtifacts artifacts: 'allure-results/**', fingerprint: true, allowEmptyArchive: true
      archiveArtifacts artifacts: 'allure-report/**', fingerprint: true, allowEmptyArchive: true
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
    }
  }
}
