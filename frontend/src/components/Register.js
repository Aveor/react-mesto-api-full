import React from "react";
import { Link, useHistory } from "react-router-dom";

function Register(props) {
  const { onRegister, openToolTip } = props;
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [registerEmailError, setRegisterEmailError] = React.useState("");
  const [registerPasswordError, setRegisterPasswordError] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const history = useHistory();

  function validate() {
    setRegisterEmailError(emailRef.current.validationMessage);
    setRegisterPasswordError(passwordRef.current.validationMessage);

    !emailRef.current.validity.valid
      ? setEmailValid(false)
      : setEmailValid(true);
    !passwordRef.current.validity.valid
      ? setPasswordValid(false)
      : setPasswordValid(true);
  }

  React.useEffect(() => {
    setDisabled(false);
    setRegisterEmailError("");
    setRegisterPasswordError("");
  }, []);

  React.useEffect(() => {
    emailValid && passwordValid ? setDisabled(false) : setDisabled(true);
  }, [emailValid, passwordValid, email, password]);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    validate();
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    validate();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password })
      .then(() => {
        setTimeout(openToolTip, 1000);
        history.push("/sign-in");
      })
      .catch(() => {
        openToolTip();
      });
  };

  return (
    <section className="register">
      <form
        disabled={disabled}
        onSubmit={handleSubmit}
        className="popup__container popup__container_register"
      >
        <h2 className="popup__title popup__title_register">Регистрация</h2>
        <input
          className="popup__input popup__input_register"
          id="email"
          name="email"
          type="email"
          value={email || ""}
          ref={emailRef}
          onChange={handleChangeEmail}
          placeholder="Email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          minLength="4"
          maxLength="40"
        />
        <span
          className={`popup__input-error ${!emailValid && "popup__input-error_active "
            }`}
          id="email-input-error"
        >
          {registerEmailError}
        </span>
        <input
          id="password"
          name="password"
          type="password"
          value={password || ""}
          ref={passwordRef}
          onChange={handleChangePassword}
          className="popup__input popup__input_register"
          required
          placeholder="Пароль"
          minLength="5"
          maxLength="20"
        />
        <span
          className={`popup__input-error ${!passwordValid && "popup__input-error_active"
            }`}
          id="password-input-error"
        >
          {registerPasswordError}
        </span>
        <button type="submit" className="popup__button-register">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="popup__span-register">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default Register;
