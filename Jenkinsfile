#!groovy
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

pipeline {
    agent {
        // https://cwiki.apache.org/confluence/display/INFRA/Jenkins+node+labels
        label 'git-websites'
    }
   
    environment {
        HUGO_VERSION = '0.66.0'
        DEPLOY_BRANCH = 'asf-site'
        STAGING_BRANCH = 'asf-staging'
    }

    stages {
        stage('Prepare') {
            steps {
                script {
                    // Capture last commit hash for final commit message
                    env.LAST_SHA = sh(script:'git log -n 1 --pretty=format:\'%H\'', returnStdout: true).trim()

                    // Setup Hugo
                    env.HUGO_DIR = sh(script:'mktemp -d', returnStdout: true).trim()
                    sh """
                        mkdir -p ${env.HUGO_DIR}/bin
                        cd ${env.HUGO_DIR}
                        wget --no-verbose -O hugo.tar.gz https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz
                        tar xfzv hugo.tar.gz
                        mv hugo ${env.HUGO_DIR}/bin/
                    """

                    // Setup directory structure for generated content
                    env.TMP_DIR = sh(script:'mktemp -d', returnStdout: true).trim()
                    env.OUT_DIR = "${env.TMP_DIR}/content"
                    sh "mkdir -p ${env.OUT_DIR}"
                    
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    withEnv(["PATH+HUGO=${env.HUGO_DIR}/bin"]) {
                        sh "hugo --destination ${env.OUT_DIR}"
                    }
                }
            }
        }
        stage('Staging') {
            when {
                 not {
                     branch 'main'
                 } 
            }
            steps {
                script {
                    // Checkout branch with generated content
                    sh """
                        git checkout ${STAGING_BRANCH}
                        git pull origin ${STAGING_BRANCH}
                    """
                    
                    // Remove the content of the target branch and replace it with the content of the temp folder
                    sh """
                        rm -rf ${WORKSPACE}/content
                        git rm -r --cached content/*
                        mkdir -p ${WORKSPACE}/content
                        cp -rT ${env.TMP_DIR}/* ${WORKSPACE}/content
                    """
                    
                    // Commit the changes to the target branch
                    env.COMMIT_MESSAGE = "Staged site from ${BRANCH_NAME} (${env.LAST_SHA})"
                    sh """
                        git add -A
                        git commit -m "${env.COMMIT_MESSAGE}" | true
                    """
                    
                    // Push the generated content for deployment
                    sh "git push -u origin ${STAGING_BRANCH}"
                }
            }
        }
        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                }
            }
            steps {
                script {
                    // Checkout branch with generated content
                    sh """
                        git checkout ${DEPLOY_BRANCH}
                        git pull origin ${DEPLOY_BRANCH}
                    """
                    
                    // Remove the content of the target branch and replace it with the content of the temp folder
                    sh """
                        rm -rf ${WORKSPACE}/content
                        git rm -r --cached content/*
                        mkdir -p ${WORKSPACE}/content
                        cp -rT ${env.TMP_DIR}/* ${WORKSPACE}/content
                    """
                    
                    // Commit the changes to the target branch
                    env.COMMIT_MESSAGE = "Updated site from ${BRANCH_NAME} (${env.LAST_SHA})"
                    sh """
                        git add -A
                        git commit -m "${env.COMMIT_MESSAGE}" | true
                    """
                    
                    // Push the generated content for deployment
                    sh "git push -u origin ${DEPLOY_BRANCH}"
                }
            }
        }
    }
    
    post {
        always {
            script {
                sh """
                    rm -rf ${env.HUGO_DIR}
                    rm -rf ${env.TMP_DIR}
                """
            }
            deleteDir() /* clean up our workspace */
        }
    }
}

