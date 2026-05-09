import { Menu, Moon, Sun, X } from "lucide-react";
import "./Header.css";

const navItems = [
  // { key: "home", label: "Главная" },
  { key: "login", label: "Вход" },
  { key: "register", label: "Регистрация" },
];

export default function Header({
  activePage,
  onNavigate,
  onThemeToggle,
  theme,
  isMenuOpen,
  onMenuToggle,
}) {
  return (
		<header className="header">
			<div className="header__inner">
				<button
					className="brand"
					type="button"
					onClick={() => onNavigate("home")}
				>
					Hardcourse Node
				</button>

				<nav className="desktop-nav" aria-label="Основная навигация">
					{navItems.map(item => (
						<button
							key={item.key}
							type="button"
							className={`nav-link ${activePage === item.key ? "is-active" : ""}`}
							onClick={() => onNavigate(item.key)}
						>
							{item.label}
						</button>
					))}
				</nav>

				<div className="header-actions">
					<button
						className="icon-btn"
						type="button"
						onClick={onThemeToggle}
						aria-label="Сменить тему"
					>
						{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
					</button>
					<button
						className="icon-btn mobile-only"
						type="button"
						onClick={onMenuToggle}
						aria-label="Меню"
					>
						{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			<div className={`mobile-panel ${isMenuOpen ? "is-open" : ""}`}>
				<nav className="mobile-nav" aria-label="Мобильная навигация">
					{navItems.map(item => (
						<button
							key={item.key}
							type="button"
							className={`mobile-link ${activePage === item.key ? "is-active" : ""}`}
							onClick={() => onNavigate(item.key)}
						>
							{item.label}
						</button>
					))}
				</nav>
			</div>
		</header>
	);
}