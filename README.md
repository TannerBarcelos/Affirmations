## Affirmation

Affirmation is an application that let's you create daily affirmations of positivity and inspiration to put you in a positive headspace. Simply create an affirmation when you wake up and manifest it into your daily life. When you head in for the evening, log your current mood and leave a note on how you feel as well as anything else on your mind. Through date & time indexing and the mood-meter, get a glimpse back in time to see how your mood and affirmations played a role in your everyday happiness. Having a bad day? Not to worry, we will generate an affirmation for you if your mood is neutral or worse so that you can get into a positive headspace and get the help you need to get on track.

I believe doing this technique every day will help you gain self confidence, improve how you tackle and improve your mental health and foster the ability to think and learn from your past to improve your future

#### Run the App

1. Create a .env file and add the following configurations to the file

```bash
PORT=4000
MONGO_URI=<your_uri>
```

**Run Using Docker (recommended)**

```bash
# Docker build
Make build-dev-image
# Docker run
Make run-dev-image
# Ensure container is running (given it runs in detatched mode)
docker ps -a | grep node-app
```

**Run Using NPM**

```bash
npm install
npm run server
```
