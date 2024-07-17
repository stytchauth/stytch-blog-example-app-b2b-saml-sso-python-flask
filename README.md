# Integrating SAML Single Sign-On with Python, Okta, and Stytch
This is a companion example app for the tutorial blog post - [Integrating SAML Single Sign-On with Python, Okta, and Stytch](https://stytch.com/blog/integrating-saml-sso-with-python-okta-stytch). Read the blog post to get started and follow along. 

## Getting started

You need to make sure you have the following

- **Python**: Python 3.8+ installed on your machine. You can install it from the [Python official website](https://www.python.org/).
- **Okta Account**: Sign up for an Okta account which will be used as your Identity Provider (IdP). You can [register for a free 30 days trial account](https://www.okta.com/free-trial/).
- **Stytch Account**: Register with [Stytch for their B2B SaaS product](https://stytch.com/dashboard/start-now). **Make sure you register for the B2B SaaS Authentication product**.
- **Node**: Node v20.10.0+ installed on your machine. You can install it by following the instructions from [their website](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Setup

Copy `api/.env-TEMPLATE` to `api/.env` and set the following environment variables from the [Stytch Dashboard](https://stytch.com/dashboard/).

- `STYTCH_PROJECT_ID`
- `STYTCH_SECRET`
- `STYTCH_PUBLIC_TOKEN`

Copy `ui/.env-TEMPLATE` to `ui/.env` and set the following environment variables from the [Stytch Dashboard](https://stytch.com/dashboard/).

- `VITE_STYTCH_PUBLIC_TOKEN`

### Run the backend

Start by installing the needed packages

```
cd api
python3 -m venv venv
source venv/bin/activate
pip3 install Flask flask-cors stytch requests
```

Then run the backend with the following command :

```
python3 app.py
```

### Run the frontend

Start by installing the needed packages:

```
npm install
```

Then run the frontend with the following command:

```
npm run dev
```