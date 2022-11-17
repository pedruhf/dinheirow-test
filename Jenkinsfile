pipeline {
  agent any
  tools {
    nodejs "node-16.14"
  }

  stages {
    stage("build") {
      steps {
        echo "Building the application..."
        sh "npm install"
        sh "npm run build"
      }
    }

    stage("test") {
      steps {
        echo "Running all tests..."
        sh "npm run test"
      }
    }

    stage("deploy") {
      steps {
        echo "Deploying the application..."
      }
    }
  }
}