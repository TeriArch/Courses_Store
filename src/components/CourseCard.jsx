import { Clock3, Layers2, PlayCircle } from "lucide-react";
import { memo } from "react";
import { busket } from "../data/busket";
import "./CourseCard.css";

function CourseCard({ course }) {
	return (
		<article className="course-card">
			<div className="course-card__top">
				<span className="course-level">{course.levelLabel}</span>
				<span className="course-price">{course.price}</span>
			</div>

			<h3 className="course-title">{course.title}</h3>
			<p className="course-author">Автор: {course.author}</p>

			<div className="course-meta">
				<span>
					<Clock3 size={14} /> {course.duration}
				</span>
				<span>
					<Layers2 size={14} /> {course.lessons} уроков
				</span>
				<span>
					<PlayCircle size={14} /> {course.format}
				</span>
			</div>

			<button type="button" className="course-btn more-btn">
				Подробнее
			</button>
			<button
				type="button"
				className="course-btn basket-btn"
				onClick={() => {
					busket.push(course.id);
					console.log(busket);
				}}
			>
				В корзину
			</button>
		</article>
	);
}
export default memo(CourseCard);
