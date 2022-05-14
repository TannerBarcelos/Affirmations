build-node-image:
	cd backend && docker build -t node-api -f Dockerfile.dev .
run-node-image:
	cd backend && docker run --name node-backend -p 4000:4000 -v /app/node_modules -v $(shell pwd):/app --env-file .env node-api


build-client-image:
	cd frontend && docker build -t react-app -f Dockerfile.dev .
run-client-image:
	docker run --name react-client -p 3000:3000 -v /app/node_modules -v $(shell cd frontend && pwd):/app --env-file .env react-app


up-build:
	docker compose -f docker-compose-dev.yml up --build
up-dev:
	docker compose -f docker-compose-dev.yml up
down-dev:
	docker compose -f docker-compose-dev.yml down