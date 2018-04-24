properties([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactNumToKeepStr: '5', numToKeepStr: '5']]])

node {
    try {
        stage("Checkout") {
            checkout scm
        }
        stage("Install") {
            sh 'npm install'
        }
        stage("Lint") {
            sh 'npm run lint -s'
        }
        stage("Build") {
            sh 'npm run build -s'
            sh 'mv dist external'
        }
        stage("Build") {
            sh 'npm run build:internal -s'
            sh 'mv dist internal'
        }
        stage("Archive artifacts") {
            sh "git rev-parse --short HEAD > git-commit-id"
            writeFile file: 'build-id', text: env.BUILD_NUMBER
            archiveArtifacts artifacts: "git-commit-id, build-id, external/**/*, internal/**/*", fingerprint: false
        }
        currentBuild.result = "SUCCESS"
    } catch(e) {
        currentBuild.result = "FAILURE"
        throw e
    }
}
