#!groovy

def kubernetes_config = """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:12.10.0-alpine
    tty: true
  - name: jnlp
    volumeMounts:
    - name: volume-known-hosts
      mountPath: /home/jenkins/.ssh
  volumes:
  - name: volume-known-hosts
    configMap:
      name: known-hosts
"""

pipeline {
    agent {
        kubernetes {
            label 'explorer-for-zos-pod_' + env.BRANCH_NAME + '_' + env.BUILD_NUMBER
            yaml kubernetes_config
        }
    }    
    options {
        timestamps()
        timeout(time: 3, unit: 'HOURS')
        skipDefaultCheckout(false)
    }
    environment {
       branchName = "${env.BRANCH_NAME}"
    }
    stages {
        stage('Install & Test') {
            environment {
                npm_config_cache = "${env.WORKSPACE}"
            }
            steps {
                container('node') {
                    sh "pwd"
                    sh "ls"
                    sh "npm ci"
                    // sh "npm test"

                    // sh "npm i vsce"
                    sh "ls"

                    // sh "rm -rf _cacache"

                    sh "ls"


                    sh "npm i vsce -prefix $HOME/agent/workspace/che-che4z-explorer-for-zos_cicd/tools -g"
                    sh "rm -rf _cacache"
                    sh "ls"
                    sh "$HOME/agent/workspace/che-che4z-explorer-for-zos_cicd/tools/lib/node_modules/vsce/out/vsce package"
                    // sh "vsce package"
                    sh "ls"
                }
            }
        }
        stage('Package') {
            environment {
                npm_config_cache = "${env.WORKSPACE}"
            }
            steps {
                container('node') {
                    // sh "npm run webpack-production"
                    // sh "npm i vsce -prefix $HOME/agent/workspace/che-che4z-explorer-for-zos_cicd/tools -g"
                    // sh "$HOME/agent/workspace/che-che4z-explorer-for-zos_cicd/tools/lib/node_modules/vsce/out/vsce package"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (branchName == 'master' || branchName == 'development') {
                        container('jnlp') {
                            sshagent ( ['projects-storage.eclipse.org-bot-ssh']) {
                                sh '''
                                ssh genie.che4z@projects-storage.eclipse.org rm -rf /home/data/httpd/download.eclipse.org/che4z/snapshots/$branchName
                                ssh genie.che4z@projects-storage.eclipse.org mkdir -p /home/data/httpd/download.eclipse.org/che4z/snapshots/$branchName
                                scp -r /home/jenkins/agent/workspace/*/*.vsix genie.che4z@projects-storage.eclipse.org:/home/data/httpd/download.eclipse.org/che4z/snapshots/$branchName
                                '''
                            }
                        }
                    } else {
                        echo "Deployment skipped for branch: ${branchName}"
                        container('jnlp') {
                            sshagent ( ['projects-storage.eclipse.org-bot-ssh']) {
                                sh '''
                                ssh genie.che4z@projects-storage.eclipse.org rm -rf /home/data/httpd/download.eclipse.org/che4z/snapshots/$branchName
                                ssh genie.che4z@projects-storage.eclipse.org mkdir -p /home/data/httpd/download.eclipse.org/che4z/snapshots/$branchName
                                scp -r /home/jenkins/agent/workspace/*/*.vsix genie.che4z@projects-storage.eclipse.org:/home/data/httpd/download.eclipse.org/che4z/snapshots/$branchName
                                '''
                            }
                        }
                    }
                }
            }
        }
    }
}
