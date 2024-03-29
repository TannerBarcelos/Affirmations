## Affirmations

![App Image](./frontend/src/assets/images/readme_img.png)

Affirmation is an application that lets you create daily affirmations of positivity and inspiration to put you in a positive headspace. Create an affirmation when you wake up and manifest it into your everyday life. When you head in for the evening, log your current mood and leave a note on how you feel and anything else on your mind. Through date & time indexing and the mood meter, get a glimpse back to see how your mood and affirmations played a role in your everyday happiness. Having a bad day? Not to worry, we will generate an affirmation for you if your mood is neutral or worse so that you can get into a positive headspace and get the help you need to get on track.

Affirmations' mission is to help you gain self-confidence, improve how you tackle and improve your mental health and foster the ability to think and learn from your past to improve your future.

#### How to run

- In the frontend directory, create a `.env` file and add the following properties
```bash
VITE_BACKEND_URL=http://localhost:4000
```
- In the backend directory, create a `.env` file and add the following properties
```bash
MONGO_URI=<mongo_uri_connection_string>
JWT_SECRET=<some_key>
```
