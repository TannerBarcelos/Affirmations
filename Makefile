build-node-image:
	cd backend && docker build -t backend -f Dockerfile.dev .
run-node-image:
	cd backend && docker run --name api-server -p 4000:4000 -v /app/node_modules -v $(shell pwd):/app --env-file .env backend
build-client-image:
	cd frontend && docker build -t react-app -f Dockerfile.dev .
run-client-image:
	docker run --name client -p 3000:3000 -v /app/node_modules -v $(shell cd frontend && pwd):/app --env-file .env react-app