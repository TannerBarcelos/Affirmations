build-image:
	docker build -t node-api -f ./Docker/Dockerfile.dev .
run-image:
	docker run --name node-app -p 4000:4000 -v /app/node_modules -v $(shell pwd):/app --env-file .env node-api