import { useEffect, useState, useCallback } from "react";
import { Eye, EyeClosed } from "lucide-react";
import "./RegisterPage.css";

export default function RegisterPage({ onNavigate }) {
  const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");
	const validatePass = pass => {
		const requirements = {
			length: pass.length >= 8,
			hasUpper: /[A-Z]/.test(pass),
			hasNumber: /[0-9]/.test(pass),
			hasSpecial: /[!@#$%^&*]/.test(pass),
		};
		return requirements;
	};
	const [showPassword, setShowPassword] = useState(false);
	const hidePassword = useCallback(() => setShowPassword(false), []);

	useEffect(() => {
		if (!showPassword) return;
		let timer;
		const resetTimer = () => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => hidePassword(), 20000);
		};
		resetTimer();
		const events = [
			"mousedown",
			"mousemove",
			"keypress",
			"scroll",
			"touchstart",
		];
		events.forEach(event => window.addEventListener(event, resetTimer));
		document.addEventListener("visibilitychange", () => {
			if (document.hidden) setShowPassword(false);
		});

		return () => {
			if (timer) clearTimeout(timer);
			events.forEach(event => window.removeEventListener(event, resetTimer));
			document.removeEventListener("visibilitychange", () => {
				if (document.hidden) hidePassword();
			});
		};
	}, [showPassword, hidePassword]);

	const handleSubmit = event => {
		event.preventDefault();

	};

	return (
		<section className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h1>Регистрация</h1>
				<p>Создайте аккаунт и сохраните персональную подборку курсов.</p>

				<label htmlFor="registerName">Имя</label>
				<input
					id="registerName"
					onChange={e => setName(e.target.value)}
					autoComplete="name"
					value={name}
					type="text"
					placeholder="Ваше имя"
					required
				/>

				<label htmlFor="registerEmail">Email</label>
				<input
					id="registerEmail"
					onChange={e => setEmail(e.target.value)}
					autoComplete="email"
					value={email}
					type="email"
					placeholder="you@example.com"
					required
				/>

				<label htmlFor="registerPassword">Пароль</label>
				<div className="inputWrapper">
					<input
						id="registerPassword"
						onChange={e => setPassword(e.target.value)}
						autoComplete="new-password"
						value={password}
						type={!showPassword ? "password" : "text"}
						placeholder="Минимум 8 символов"
						required
					/>
					<button
						type="button"
						onClick={() => setShowPassword(prev => !prev)}
						aria-label={showPassword ? "Hide password" : "Show password"}
						id="passToggle"
					>
						{!showPassword ? <EyeClosed /> : <Eye />}
					</button>
				</div>

				<button type="submit">Создать аккаунт</button>

				<p className="auth-switch">
					Уже есть аккаунт?
					<button type="button" onClick={() => onNavigate("login")}>
						Войти
					</button>
				</p>
			</form>
		</section>
	);
}
