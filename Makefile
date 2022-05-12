build-dev-image:
	docker build -t node-api -f ./Docker/Dockerfile.dev .
run-dev-image:
	docker run --name node-app -p 4000:4000 --env-file .env node-api