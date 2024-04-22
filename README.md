# Demo application using Stytch Authentication Provider

You need to make sure you have the following

- **Python**: Python 3.8+ installed on your machine. You can install it from the [Python official website](https://www.python.org/).
- **Okta Account**: Sign up for an Okta account which will be used as your Identity Provider (IdP). You can [register for a free 30 days trial account](https://www.okta.com/free-trial/).
- **Stytch Account**: Register with [Stytch for their B2B SaaS product](https://stytch.com/dashboard/start-now). **Make sure you register for the B2B SaaS Authentication product**.
- **Node**: Node v20.10.0+ installed on your machine. You can install it by following the instructions from [their website](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Run the backend

Start by installing the needed packages

```
pip3 install Flask flask-cors stytch requests
```

Then run the backend with the following command :

```
cd api
python3 app.py
```

## Run the frontend

Start by installing the needed packages

```
npm install
```

Then run the frontend with the following command :

```
npm start
```

## Demo Gifs

- Using Magic Link

![Singing in with Magic Link](https://i.imgur.com/bgwgACJ.gif)

- Using SSO with Okta

![SSO from Okta application](https://i.imgur.com/Q00ok25.gif)
