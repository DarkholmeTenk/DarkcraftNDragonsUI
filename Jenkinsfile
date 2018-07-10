pipeline {
	agent any
	stages {
		stage('Build Docker Image') {
			steps {
				sh 'docker build -t dnd/dnd_gui:latest .'
			}
		}
	}
}
