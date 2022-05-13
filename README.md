## Affirmation

Affirmation is an application that let's you create daily affirmations of positivity and inspiration to put you in a positive headspace. Simply create an affirmation when you wake up and manifest it into your daily life. When you head in for the evening, log your current mood and leave a note on how you feel as well as anything else on your mind. Through date & time indexing and the mood-meter, get a glimpse back in time to see how your mood and affirmations played a role in your everyday happiness. Having a bad day? Not to worry, we will generate an affirmation for you if your mood is neutral or worse so that you can get into a positive headspace and get the help you need to get on track.

Affirmations mission is to help you gain self confidence, improve how you tackle and improve your mental health and foster the ability to think and learn from your past to improve your future.

#### Run the App

1. Create a .env file and add the following configurations to the file

```bash
BASE_URL=/api/v1
MONGO_URI=<YOUR_MONGO_URI>
JWT_SECRET=<YOUR_JWT_SECRET>
NODE_DOCKER_PORT=4000 (this is the port to start the node app on)
# Note - client app starts on port 3000 and also 80 given NGINX as a reverse proxy. Regardless, the client will send api calls
# and they will be proxied to the node container if prefixed with /api/v1
```

**Run Using Docker (recommended)**

```bash
Make up-dev # go to localhost:80
```

### App Architecture
