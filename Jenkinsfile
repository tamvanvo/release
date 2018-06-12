node {
    tool name: 'Gradle-4.4', type: 'gradle'
    def packageVersion = '2.1.0'
    def gradleHome = '/var/lib/jenkins/tools/hudson.plugins.gradle.GradleInstallation/Gradle-4.4'
    stage('Sync project') {
     sh "git submodule update --init --recursive"
     sh "git submodule sync --recursive"
   }
   stage('Build') {
     sh "'${gradleHome}/bin/gradle' clean buildFull"
   }
   stage('Upload to S3') {
    sh "aws s3api put-object --bucket qtest-storage --key 'tmp/qtest automation/${packageVersion}/agentctl-${packageVersion}-windows-x64-full.zip' --body $WORKSPACE/build/distributions/agentctl-${packageVersion}-windows-x64-full.zip"
    sh "aws s3api put-object --bucket qtest-storage --key 'tmp/qtest automation/${packageVersion}/agentctl-${packageVersion}-osx-x64-full.tgz' --body $WORKSPACE/build/distributions/agentctl-${packageVersion}-osx-x64-full.tgz"
    sh "aws s3api put-object --bucket qtest-storage --key 'tmp/qtest automation/${packageVersion}/agentctl-${packageVersion}-linux-x64-full.tgz' --body $WORKSPACE/build/distributions/agentctl-${packageVersion}-linux-x64-full.tgz"
   }
}