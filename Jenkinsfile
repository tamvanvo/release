node {
    properties([
     pipelineTriggers([
        [
            $class: "GitLabPushTrigger",
            branchFilterType: "NameBasedFilter",
            includeBranchesSpec: "${branch}",
            triggerOnPush: true,
            secretToken: "322b775c0044b3181ea8b356911ec05d"
        ]
     ])
    ])
    tool name: 'Gradle-4.4', type: 'gradle'
    def gradleHome = '/var/lib/jenkins/tools/hudson.plugins.gradle.GradleInstallation/Gradle-4.4'
    stage('Prepare') {
        git branch: "${branch}", credentialsId: '1fd4fb1d-717a-4000-90bf-aeb9bbd7ef6e', url: 'git@git.qasymphony.com:qtest/qautomation-installer.git'
    }
    stage('Sync project') {
     sh "git submodule update --init --recursive"
     sh "git submodule sync --recursive"
   }
   stage('Build') {
     sh "'${gradleHome}/bin/gradle' clean buildFull"
   }
   stage('Upload to S3') {
       //https://github.com/jenkinsci/gitlab-plugin#branch-filtering
       // is not trigger build
       if (env.gitlabSourceBranch == null) { 
            def packageVersion = readFile "${WORKSPACE}/qautomation/agent/src/main/resources/version/version.txt"
            println "build version ${packageVersion}"
            def folder = "tmp/qtest automation"
            if(deploy == "Release (Will upload to release folder)") {
                folder = "qtest-automation"
            }
    
            println "deploy folder ${folder}"
            sh "aws s3api put-object --bucket qtest-storage --key '${folder}/${packageVersion}/agentctl-${packageVersion}-windows-x64-full.zip' --body $WORKSPACE/build/distributions/agentctl-${packageVersion}-windows-x64-full.zip"
            sh "aws s3api put-object --bucket qtest-storage --key '${folder}/${packageVersion}/agentctl-${packageVersion}-windows-x64-full.zip.md5' --body $WORKSPACE/build/distributions/agentctl-${packageVersion}-windows-x64-full.zip.md5"
            sh "aws s3api put-object --bucket qtest-storage --key '${folder}/${packageVersion}/agentctl-${packageVersion}-osx-x64-full.tgz' --body $WORKSPACE/build/distributions/agentctl-${packageVersion}-osx-x64-full.tgz"
            sh "aws s3api put-object --bucket qtest-storage --key '${folder}/${packageVersion}/agentctl-${packageVersion}-osx-x64-full.tgz.md5' --body $WORKSPACE/build/distributions/agentctl-${packageVersion}-osx-x64-full.tgz.md5"
            sh "aws s3api put-object --bucket qtest-storage --key '${folder}/${packageVersion}/agentctl-${packageVersion}-linux-x64-full.tgz' --body $WORKSPACE/build/distributions/agentctl-${packageVersion}-linux-x64-full.tgz"
            sh "aws s3api put-object --bucket qtest-storage --key '${folder}/${packageVersion}/agentctl-${packageVersion}-linux-x64-full.tgz.md5' --body $WORKSPACE/build/distributions/agentctl-${packageVersion}-linux-x64-full.tgz.md5"
       } 
   }
}
