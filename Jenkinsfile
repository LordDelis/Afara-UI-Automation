pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        NODE_ENV = 'test'
        CYPRESS_CACHE_FOLDER = '.cache/Cypress'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm ci
                '''
            }
        }

        stage('Verify Cypress Install') {
            steps {
                sh '''
                    npx cypress verify
                '''
            }
        }

        stage('Run Smoke Tests') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    npx cypress run \
                      --spec "cypress/e2e/smoke/**/*.cy.js" \
                      --browser chrome
                '''
            }
        }

        stage('Run Regression Tests') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    npx cypress run \
                      --spec "cypress/e2e/regression/**/*.cy.js" \
                      --browser chrome
                '''
            }
        }

        stage('Generate Reports') {
            steps {
                sh '''
                    npm run report:merge || true
                    npm run report:generate || true
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/screenshots/**, cypress/videos/**', allowEmptyArchive: true
            junit 'cypress/results/*.xml'
        }

        failure {
            echo 'Test execution failed. Check logs and artifacts.'
        }

        success {
            echo 'All tests passed successfully.'
        }
    }
}