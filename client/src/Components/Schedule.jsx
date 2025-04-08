// import "@bitnoi.se/react-scheduler/dist/style.css";
import React, { useCallback, useState } from "react";
// import { Scheduler } from "@bitnoi.se/react-scheduler";
// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
import { useEffect } from "react";

dayjs.extend(isBetween);

export default function Schedule() {
	const [filterButtonState, setFilterButtonState] = useState(0);
	const [SchedulerData, setSchedulerData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("http://localhost:3001/events/");
				if (!response.ok) {
					console.error(
						"Server error:",
						response.status,
						response.statusText
					);
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setSchedulerData(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const [range, setRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});

	const handleRangeChange = useCallback((range) => {
		setRange(range);
	}, []);

	// Filtering events that are included in current date range
	// Example can be also found on video https://youtu.be/9oy4rTVEfBQ?t=118&si=52BGKSIYz6bTZ7fx
	// and in the react-scheduler repo App.tsx file https://github.com/Bitnoise/react-scheduler/blob/master/src/App.tsx
	const filteredSchedulerData = SchedulerData.map((person) => ({
		...person,
		data: person.data.filter(
			(project) =>
				// we use "dayjs" for date calculations, but feel free to use library of your choice
				dayjs(project.startDate).isBetween(
					range.startDate,
					range.endDate
				) ||
				dayjs(project.endDate).isBetween(
					range.startDate,
					range.endDate
				) ||
				(dayjs(project.startDate).isBefore(range.startDate, "day") &&
					dayjs(project.endDate).isAfter(range.endDate, "day"))
		),
	}));

	return (
		<section>
			<Scheduler
				data={filteredSchedulerData}
				isLoading={isLoading}
				onRangeChange={handleRangeChange}
				onTileClick={(clickedResource) => console.log(clickedResource)}
				onItemClick={(item) => console.log(item)}
				onFilterData={() => {
					// Some filtering logic...
					setFilterButtonState(1);
				}}
				onClearFilterData={() => {
					// Some clearing filters logic...
					setFilterButtonState(0);
				}}
				config={{
					zoom: 0,
					filterButtonState,
				}}
			/>
		</section>
	);
}
