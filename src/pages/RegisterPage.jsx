import { useEffect, useState, useCallback, useMemo } from "react";
import { Eye, EyeClosed } from "lucide-react";
import "./RegisterPage.css";

export default function RegisterPage({ onNavigate }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	//	pwn
	const [isPwned, setIsPwned] = useState(false);
	const [isChecking, setIsChecking] = useState(false);
	const [riskAccepted, setRiskAccepted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const passRequirements = useMemo(() => {
		return {
			length: password.length >= 8,
			hasUpper: /[A-Z]/.test(password),
			hasNumber: /[0-9]/.test(password),
			hasSpecial: /[^A-Za-z0-9]/.test(password),
		};
	}, [password]);

	const isPassValid = useMemo(() => {
		return Object.values(passRequirements).every(Boolean);
	}, [passRequirements]);
	const passHint = useMemo(() => {
		if (password.length === 0) return { text: "", color: "" };

		if (!passRequirements.length) return { text: "Минимум 8 символов", color: "#ff4d4d" };
		if (!passRequirements.hasNumber) return { text: "Добавьте хотя бы одну цифру", color: "#ff944d" };
		if (!passRequirements.hasUpper) return { text: "Нужна заглавная буква", color: "#ffdb4d" };
		if (!passRequirements.hasSpecial) return { text: "Добавьте спецсимвол (!@#$%^&*)", color: "#ffdb4d" };

		if (isChecking) return { text: "Проверяем в базах утечек...", color: "#ffdb4d" };
		if (isPwned) return { text: "⚠️ Пароль найден в базах утечек!", color: "#6f0808" };

		return { text: "Отличный пароль!", color: "#4dff88" };
	}, [password, passRequirements, isChecking, isPwned]);

	//	hide pass
	const hidePassword = useCallback(() => setShowPassword(false), []);
	useEffect(() => {
		if (!showPassword) return;

		let timer;
		const resetTimer = () => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => hidePassword(), 11000);
		};
		resetTimer();

		const events = ["mousedown", "keypress", "scroll", "touchstart"];
		events.forEach(event => window.addEventListener(event, resetTimer));

		const handleVisibilityChange = () => {
			if (document.hidden) hidePassword();
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			if (timer) clearTimeout(timer);
			events.forEach(event => window.removeEventListener(event, resetTimer));
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [showPassword, hidePassword]);

	//	hash
	const checkPwnedPassword = async pass => {
		try {
			const msgUint8 = new TextEncoder().encode(pass);
			const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8);
			const hashHex = Array.from(new Uint8Array(hashBuffer))
				.map(b => b.toString(16).padStart(2, "0"))
				.join("")
				.toUpperCase();

			const prefix = hashHex.slice(0, 5);
			const suffix = hashHex.slice(5);

			const response = await fetch(
				`https://api.pwnedpasswords.com/range/${prefix}`,
			);
			const text = await response.text();
			return text.includes(suffix);
		} catch (error) {
			console.error("HIBP API Error:", error);
			return false;
		}
	};

	useEffect(() => {
		if (!isPassValid) {
			setIsPwned(false);
			setRiskAccepted(false);
			return;
		}

		setIsChecking(true);
		const timer = setTimeout(async () => {
			const pwned = await checkPwnedPassword(password);
			setIsPwned(pwned);
			setIsChecking(false);
		}, 800);

		return () => {
			clearTimeout(timer);
			setIsChecking(false);
		};
	}, [password, isPassValid]);

	const handlePasswordChange = e => {
		setPassword(e.target.value);
		setIsPwned(false);
		setRiskAccepted(false);
	};

	//	form
	const handleSubmit = async event => {
		event.preventDefault();
		if (isSubmitting) return;

		const formData = new FormData(event.target);
		if (formData.get("honeypot")) {
			console.warn("Bot detected!");
			return;
		}

		if (!isPassValid) return;

		if (isPwned && !riskAccepted) {
			alert(
				"Нужно подтвердить, что вы принимаете риски использования утекшего пароля.",
			);
			return;
		}

		setIsSubmitting(true);

		// setTimeout(() => {
		// 	setIsSubmitting(false);
		// 	alert(`Успех! Аккаунт для ${email} создан.`);
		// }, 2000);
	};

	const complexityProgress =
		(Object.values(passRequirements).filter(Boolean).length / 4) * 100;

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

				<label htmlFor="registerPassword">Пароль</label>
				<div className="inputWrapper">
					<input
						id="registerPassword"
						onChange={handlePasswordChange}
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

				<div className="complexity-wrapper">
					<div
						className="complexity-bar"
						style={{
							width: `${complexityProgress}%`,
							backgroundColor: passHint.color,
						}}
					></div>
				</div>

				<span className="password-hint" style={{ color: passHint.color }}>
					{passHint.text}
				</span>

				{isPwned && (
					<div
						className="risk-container"
						style={{ display: "flex", gap: "8px", marginTop: "8px" }}
					>
						<input
							type="checkbox"
							id="riskCheck"
							checked={riskAccepted}
							onChange={() => setRiskAccepted(!riskAccepted)}
						/>
						<label
							htmlFor="riskCheck"
							style={{ fontSize: "0.8rem", color: "gray" }}
						>
							Я осознаю риски и хочу использовать этот пароль
						</label>
					</div>
				)}

				<button
					type="submit"
					disabled={
						isSubmitting ||
						isChecking ||
						!isPassValid ||
						(isPwned && !riskAccepted)
					}
					style={{
						opacity: isChecking || (isPwned && !riskAccepted) ? 0.5 : 1,
					}}
				>
					{isSubmitting
						? "Регистрация..."
						: isChecking
							? "Проверка..."
							: "Создать аккаунт"}
				</button>

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
