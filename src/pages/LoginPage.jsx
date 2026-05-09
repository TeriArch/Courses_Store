import "./LoginPage.css";

export default function LoginPage({ onNavigate }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Вход в аккаунт</h1>
        <p>Введите данные, чтобы получить доступ к личному кабинету и курсам.</p>

        <label htmlFor="loginEmail">Email</label>
        <input id="loginEmail" type="email" placeholder="you@example.com" required />

        <label htmlFor="loginPassword">Пароль</label>
        <input id="loginPassword" type="password" placeholder="Ваш пароль" required />

        <button type="submit">Войти</button>

        <p className="auth-switch">
          Нет аккаунта?
          <button type="button" onClick={() => onNavigate("register")}>
            Зарегистрироваться
          </button>
        </p>
      </form>
    </section>
  );
}