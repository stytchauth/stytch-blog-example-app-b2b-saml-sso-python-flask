import os
import sys

from flask import Flask, request, redirect, make_response
from flask_cors import CORS
from stytch import B2BClient

from stytch.b2b.models.organizations import SearchQuery, SearchQueryOperator

import dotenv

# load the .env file
dotenv.load_dotenv()

# By default, run on localhost:3000
HOST = os.getenv("HOST", "localhost")
PORT = int(os.getenv("PORT", "3000"))

# Load the Stytch credentials, but quit if they aren't defined
STYTCH_PROJECT_ID = os.getenv("STYTCH_PROJECT_ID")
STYTCH_SECRET = os.getenv("STYTCH_SECRET")
STYTCH_PUBLIC_TOKEN = os.getenv("STYTCH_PUBLIC_TOKEN")
if STYTCH_PROJECT_ID is None:
    sys.exit("STYTCH_PROJECT_ID env variable must be set before running")
if STYTCH_SECRET is None:
    sys.exit("STYTCH_SECRET env variable must be set before running")
if STYTCH_PUBLIC_TOKEN is None:
    sys.exit("STYTCH_PUBLIC_TOKEN env variable must be set before running")

# NOTE: Set environment to "live" if you want to hit the live api
stytch_client = B2BClient(
    project_id=STYTCH_PROJECT_ID,
    secret=STYTCH_SECRET,
    environment="test",
)

app = Flask(__name__)
app.secret_key = "some-secret-key"
CORS(app, supports_credentials=True)  # This will enable CORS for all routes


@app.route("/authenticate", methods=["GET"])
def authenticate():
    response = make_response(redirect("http://localhost:5173/"))
    token_type = request.args["stytch_token_type"]
    if token_type == "sso":
        resp = stytch_client.sso.authenticate(sso_token=request.args["token"])
        if resp.status_code != 200:
            return "something went wrong authenticating token"
    else:
        # handle other authentication method callbacks
        return "unsupported auth method"

    response.set_cookie("stytch_session", resp.session_token)
    return response


@app.route("/org/<string:slug>", methods=["GET"])
def org_index(slug: str):
    resp = stytch_client.organizations.search(
        query=SearchQuery(
            operator=SearchQueryOperator.AND,
            operands=[{"filter_name": "organization_slugs", "filter_value": [slug]}],
        )
    )
    if resp.status_code != 200 or len(resp.organizations) == 0:
        return "Error fetching org"

    organization = resp.organizations[0]
    connection_id = organization.sso_active_connections[0].connection_id
    return {
        "sso_url": f"https://test.stytch.com/v1/public/sso/start?connection_id={connection_id}&public_token={STYTCH_PUBLIC_TOKEN}",
        "org_name": organization.organization_name,
    }


# run's the app on the provided host & port
if __name__ == "__main__":
    # in production you would want to make sure to disable debugging
    app.run(host=HOST, port=PORT, debug=True)
