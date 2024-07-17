import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SSOLogin() {
    const { orgId } = useParams();
    const [orgName, setOrgName] = useState('');
    const [orgUrl, setOrgUrl] = useState('');
  
    useEffect(() => {
      fetch(`http://localhost:3000/org/${orgId}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setOrgName(data.org_name)
          setOrgUrl(data.sso_url)
        })
        .catch(error => console.error('Error fetching org data:', error));
    }, [orgId]);
  
    return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">
            Continue to {orgName}
          </h2>
          <a href={orgUrl} className="login-link">
            Continue with SAML SSO
          </a>
        </div>
      </div>
    );
  }

export default SSOLogin;