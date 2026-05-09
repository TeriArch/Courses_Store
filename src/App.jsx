import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { courses } from "./data/courses";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesQuery =
        query.length === 0 ||
        course.title.toLowerCase().includes(query) ||
        course.author.toLowerCase().includes(query) ||
        course.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesLevel = selectedLevel === "all" || selectedLevel === course.level;

      return matchesQuery && matchesLevel;
    });
  }, [searchQuery, selectedLevel]);

  const handleNavigate = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  const handleThemeToggle = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const pageContent = {
    home: (
      <HomePage
        courses={filteredCourses}
        searchQuery={searchQuery}
        selectedLevel={selectedLevel}
        onSearchQueryChange={setSearchQuery}
        onLevelChange={setSelectedLevel}
      />
    ),
    login: <LoginPage onNavigate={handleNavigate} />,
    register: <RegisterPage onNavigate={handleNavigate} />,
  };

  return (
    <div className="app-shell">
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onThemeToggle={handleThemeToggle}
        theme={theme}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((open) => !open)}
      />
      <main className="page-content">{pageContent[activePage]}</main>
    </div>
  );
}