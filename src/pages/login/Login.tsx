import LoginForm from "./components/loginForm";
import "../../styles/login.scss";

function Login() {
  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h2 className="login-title">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
