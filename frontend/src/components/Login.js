import React from "react";

function Login(props) {
  const { onLogin, onLoginState } = props;
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginEmailError, setLoginEmailError] = React.useState("");
  const [loginPasswordError, setLoginPasswordError] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!email || !password) {
        return
    }
    onLogin({ email, password });
    setEmail('');
    setPassword('');
}

  function validate() {
    setLoginEmailError(emailRef.current.validationMessage);
    setLoginPasswordError(passwordRef.current.validationMessage);

    !emailRef.current.validity.valid
      ? setEmailValid(false)
      : setEmailValid(true);
    !passwordRef.current.validity.valid
      ? setPasswordValid(false)
      : setPasswordValid(true);
  }

  React.useEffect(() => {
    setDisabled(false);
    setLoginEmailError("");
    setLoginPasswordError("");
  }, []);

  React.useEffect(() => {
    emailValid && passwordValid ? setDisabled(false) : setDisabled(true);
  }, [emailValid, passwordValid, email, password]);

  React.useEffect(() => {
    onLoginState(false);
  }, [onLoginState]);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    validate();
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    validate();
  }

  return (
    <section className="register">
      <form
        onSubmit={handleSubmit}
        disabled={disabled}
        className="popup__container popup__container_register"
      >
        <h2 className="popup__title popup__title_register">Вход</h2>
        <input
          className="popup__input popup__input_register"
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email || ""}
          ref={emailRef}
          onChange={handleChangeEmail}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          minLength="4"
          maxLength="40"
        />
        <span
          className={`popup__input-error ${!emailValid && "popup__input-error_active "
            }`}
          id="email-input-error"
        >
          {loginEmailError}
        </span>
        <input
          className="popup__input popup__input_register"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="5"
          maxLength="20"
          value={password || ""}
          ref={passwordRef}
          onChange={handleChangePassword}
        />
        <span
          className={`popup__input-error ${!passwordValid && "popup__input-error_active"
            }`}
          id="password-input-error"
        >
          {loginPasswordError}
        </span>
        <button type="submit" className="popup__button-register">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
