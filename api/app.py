from flask import Flask, request, jsonify
from flask_cors import CORS
from stytch import B2BClient
import requests

app = Flask(__name__)
CORS(app, supports_credentials=True)  # This will enable CORS for all routes

client = B2BClient(
    project_id="YOUR_PROJECT_ID",
    secret="YOUR_SECRET",
)

@app.route('/start-sso')
def start_sso():
    try:
        url = 'https://test.stytch.com/v1/public/sso/start'
        params = {
            'connection_id': 'YOUR_CONNECTION_ID',
            'public_token': 'YOUR_PUBLIC_TOKEN'
        }
        response = requests.get(url, params=params)
        return response.content, response.status_code, {'Content-Type': 'text/html'}
    except requests.RequestException as e:
        response_text = getattr(e.response, 'text', 'No response text')
        return jsonify(error=str(e), response_text=response_text), 500

@app.route('/authenticate', methods=['POST'])
def authenticate():
    token = request.json.get('token')
    tokenType = request.json.get('type')
    try:
        if tokenType == "sso" :
            resp = client.sso.authenticate(sso_token=token)
            return handle_authenticate_response(resp), 200
        else:
            resp = client.magic_links.authenticate(magic_links_token=token)
            return handle_authenticate_response(resp), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/send-magic-link', methods=['POST'])
def send_magic_link():
    email_address = request.json.get('email_address')

    try:
        client.magic_links.email.login_or_signup(
            organization_id="YOUR_ORG_ID",
            email_address=email_address,
        )
        return "success"
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def handle_authenticate_response(resp):
    # Basic info
    status_code = resp.status_code
    request_id = resp.request_id
    # Member info
    member_info = {
        "member_id": resp.member.member_id,
        "email_address": resp.member.email_address,
        "status": resp.member.status,
        "name": resp.member.name,
        "is_admin": resp.member.is_admin
    }

    # Session info
    session_token = resp.session_token
    session_jwt = resp.session_jwt

    # Organization info
    organization_info = {
        "organization_id": resp.organization.organization_id,
        "organization_name": resp.organization.organization_name,
        "organization_slug": resp.organization.organization_slug
    }

    # Constructing a response dict
    response_data = {
        "status_code": status_code,
        "request_id": request_id,
        "member_info": member_info,
        "session_token": session_token,
        "session_jwt": session_jwt,
        "organization_info": organization_info
    }

    return response_data

if __name__ == '__main__':
    app.run(debug=True)
