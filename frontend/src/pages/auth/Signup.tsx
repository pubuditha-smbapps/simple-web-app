import SignupForm from "./components/signupForm";
import "../../styles/login.scss";

function Signup() {
  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h2 className="login-title">Signup</h2>
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
