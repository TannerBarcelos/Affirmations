build-node-image:
	cd backend && docker build -t backend -f Dockerfile.dev .
run-node-image:
	cd backend && docker run --name api-server -p 4000:4000 -v /app/node_modules -v $(shell pwd)/backend:/app --env-file .env backend