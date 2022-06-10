import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Choice from "./components/Choice";
// @ts-ignore
import ViewSlider from "react-view-slider";
import { DataAttributeObject, Question } from "./types";
import TextInput from "./components/TextInput";

const App = ({ widget }: any) => {
	const [currentView, setCurrentView] = useState<number>(4);
	const [progressBarValue, setProgressBarValue] = useState<number>(0);
	const dataAttribute = widget.getAttribute("data-questions");
	const dataInJSON: DataAttributeObject = JSON.parse(dataAttribute);
	const questions: Array<Question> = dataInJSON.questions;

	// This function renders the view at the given index.
	// @ts-ignore
	const renderView = ({ index: viewIndex, active, transitionState }) => {
		return (
			<>
				<h2 className='survery_widget_question'>{questions[viewIndex]?.question}</h2>
				<div className='survery_widget_choices_container'>
					{questions[viewIndex]?.choices?.map((choice: string, choiceIndex) => (
						<Choice
							text={choice}
							key={choiceIndex}
							onClick={() => setCurrentView(currentView + 1)}
						/>
					))}
					{questions[viewIndex]?.inputs?.map((input: string, inputIndex) => (
						<TextInput
							placeholder={input}
							key={inputIndex}
							value={(input: string) => console.log("CORRECT: " + input)}
						/>
					))}
				</div>
				{questions[viewIndex]?.backButton && (
					<button
						className='widget_back_button'
						onClick={() => setCurrentView(currentView - 1)}>
						{questions[viewIndex]?.backButton}
					</button>
				)}
			</>
		);
	};

	/* This will make sure the progress bar fills correct and completes when the user answers the last question */
	// 1. If currentView > 0 because we dont want to have the progress bar filled before the user starts the survey
	// 2. currentView + 1 to not calculate percentage on a 0 value
	// 3. question.length - 1 because the last slide is always a none-question
	useEffect(() => {
		console.log("CHANGED");
		if (currentView > 0) {
			setProgressBarValue(((currentView + 1) / (questions.length - 1)) * 100);
		}
	}, [currentView]);

	return (
		<div className='survery_widget_container'>
			<h1 className='survery_widget_title'>{questions[currentView].title}</h1>
			<h2 className='survery_widget_description'>{questions[currentView].description}</h2>
			<ProgressBar
				isLabelVisible={false}
				borderRadius='0px'
				bgColor='#F7D725'
				height='8px'
				className='survery_widget_progress_bar'
				completed={progressBarValue}
			/>
			<ViewSlider
				renderView={renderView}
				numViews={questions.length}
				activeView={currentView}
				animateHeight
			/>
			{questions[currentView]?.nextButton && (
				<button
					className='widget_submit_button'
					onClick={() => setCurrentView(currentView + 1)}>
					{questions[currentView]?.nextButton}
				</button>
			)}
		</div>
	);
};

export default App;
