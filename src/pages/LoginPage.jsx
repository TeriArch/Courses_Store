import { useState } from "react";
import "./LoginPage.css";

export default function LoginPage({ onNavigate }) {
  const [attempts, setAttempts] = useState(0);
  const [secondsLeft, setSeconds] = useState(0);

  const handleSubmit = async event => {
		event.preventDefault();
    setAttempts(prev => prev++);
    if(attempts >= 3){
      
      return;
    }

		const formData = new FormData(event.target);
		if (formData.get("honeypot")) {
			console.warn("Bot detected!");
			return;
		}


		

		// setTimeout(() => {
		// 	setIsSubmitting(false);
		// 	alert(`Успех! Аккаунт для ${email} создан.`);
		// }, 2000);
	};

  return (
		<section className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h1>Вход в аккаунт</h1>
				<p>
					Введите данные, чтобы получить доступ к личному кабинету и курсам.
				</p>

				<label htmlFor="loginEmail">Email</label>
				<input
					id="loginEmail"
					type="email"
					placeholder="you@example.com"
					autoComplete="email"
					required
				/>

				<label htmlFor="registerEmail" style={{ display: "none" }}>
					Enter your birthDate
				</label>
				<input
					type="date"
					name="honeypot"
					style={{ display: "none" }}
					tabIndex="-1"
					autoComplete="off"
				/>

				<label htmlFor="loginPassword">Пароль</label>
				<input
					id="loginPassword"
					type="password"
					placeholder="Ваш пароль"
					autoComplete="current-password"
					required
				/>

				{/* <span className="tooManyAttemptsText">Слишком много попыток. Повторите позже</span> */}

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