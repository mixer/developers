properties([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactNumToKeepStr: '5', numToKeepStr: '5']]])

def isMaster = env.BRANCH_NAME == "master"

node {
    try {
        stage("Checkout") {
            checkout scm
            sh 'rm -rf internal external'
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
        stage("Build internal") {
            sh 'npm run build:internal -s'
            sh 'mv dist internal'
        }
        stage("Archive artifacts") {
            sh "git rev-parse --short HEAD > git-commit-id"
            writeFile file: 'build-id', text: env.BUILD_NUMBER
            archiveArtifacts artifacts: "git-commit-id, build-id, external/**/*, internal/**/*", fingerprint: false
        }
        stage("Deploy internal") {
            if (isMaster) {
                ftpPublisher alwaysPublishFromMaster: false, continueOnError: false, failOnError: true, publishers: [
                    [
                        configName: 'internal_doc_site',
                        transfers: [ [removePrefix: 'internal', sourceFiles: 'internal/**/*', excludes: ''] ]
                    ]
                ]
            }
        }
        currentBuild.result = "SUCCESS"
    } catch(e) {
        currentBuild.result = "FAILURE"
        throw e
    }
}
