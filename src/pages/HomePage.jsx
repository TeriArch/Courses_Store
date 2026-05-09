import { Search } from "lucide-react";
import CourseCard from "../components/CourseCard";
import "./HomePage.css";

const levelOptions = [
	{ value: "all", label: "Все уровни" },
	{ value: "beginner", label: "Beginner" },
	{ value: "intermediate", label: "Intermediate" },
	{ value: "advanced", label: "Advanced" },
];

export default function HomePage({
	courses,
	searchQuery,
	selectedLevel,
	onSearchQueryChange,
	onLevelChange,
}) {
	return (
		<section className="home-page">
			<div className="hero">
				<p className="hero__brand">Hardcourse Node</p>
				<h1>Универсальный магазин курсов с гибким дизайном</h1>
				<p className="hero__subtitle">
					Выбирайте курсы в любом направлении, фильтруйте по уровню и находите
					обучение быстрее.
				</p>
			</div>

			<div className="filters" role="search">
				<label className="search-field" htmlFor="searchCourses">
					<Search size={16} />
					<input
						id="searchCourses"
						type="search"
						value={searchQuery}
						placeholder="Поиск курса, автора или тега"
						onChange={event => onSearchQueryChange(event.target.value)}
					/>
				</label>

				<label className="level-select" htmlFor="courseLevel">
					<span>Уровень</span>
					<select
						id="courseLevel"
						value={selectedLevel}
						onChange={event => onLevelChange(event.target.value)}
					>
						{levelOptions.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</label>
			</div>

			{courses.length > 0 ? (
				<div className="courses-grid">
					{courses.map(course => (
						<CourseCard key={course.id} course={course} />
					))}
				</div>
			) : (
				<p className="empty-state">
					Ничего не найдено. Попробуйте изменить запрос или фильтр.
				</p>
			)}
		</section>
	);
}
