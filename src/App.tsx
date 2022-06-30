import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Choice from "./components/Choice";
import { DataAttributeObject, Question } from "./types";
import TextInput from "./components/TextInput";
import ReactSimplyCarousel from "react-simply-carousel";

const App = ({ widget }: any) => {
	const ref = useRef<HTMLDivElement>(null); // ref to the widget container div
	const [width, setWidth] = useState(300); // 300 min-width
	const [currentView, setCurrentView] = useState<number>(0);
	const [progressBarValue, setProgressBarValue] = useState<number>(0);
	const dataAttribute = widget.getAttribute("data-questions");
	const dataInJSON: DataAttributeObject = JSON.parse(dataAttribute);
	const questions: Array<Question> = dataInJSON?.questions;
	const [answers, setAnswers] = useState<object>({});

	const handleInput = (question?: string, input?: string) => {
		question && input && setAnswers({ ...answers, [question]: input });
	};

	/** There is an issue with the ReactSimplyCarousel where the sliding view containers need to have a fixed width. */
	/** This will give the container the same width (-50 for padding) as the widget */
	useLayoutEffect(() => {
		ref.current && setWidth(ref.current.offsetWidth - 50);
		window.addEventListener(
			"resize",
			() => ref.current && setWidth(ref.current.offsetWidth - 50)
		);
	}, []);

	/* This will make sure the progress bar fills correct and completes when the user answers the last question */
	// 1. If currentView > 0 because we dont want to have the progress bar filled before the user starts the survey
	// 2. currentView + 1 to not calculate percentage on a 0 value
	// 3. question.length - 1 because the last slide is always a none-question
	useEffect(() => {
		if (questions && currentView > 0) {
			setProgressBarValue(((currentView + 1) / (questions?.length - 1)) * 100);
		}
	}, [currentView]);

	return (
		<div className='survery_widget_container' ref={ref}>
			{questions ? (
				<>
					<h1 className='survery_widget_title'>{questions[currentView]?.title}</h1>
					<h2 className='survery_widget_description'>
						{questions[currentView]?.description}
					</h2>
					{currentView < questions.length - 1 && (
						<ProgressBar
							isLabelVisible={false}
							borderRadius='0px'
							bgColor='#F7D725'
							height='8px'
							className='survery_widget_progress_bar'
							completed={progressBarValue}
						/>
					)}
					<ReactSimplyCarousel
						backwardBtnProps={{ show: false }} // This will hide the back button
						forwardBtnProps={{ show: false }} // This will hide the forward button
						easing='linear'
						updateOnItemClick
						itemsToShow={1}
						itemsToScroll={1}
						speed={400} // slide speed
						activeSlideIndex={currentView}
						onRequestChange={setCurrentView}>
						{questions.map((question, index) => (
							<div style={{ width: width }} key={index}>
								<h2 className='survery_widget_question'>{question?.question}</h2>
								<div className='survery_widget_choices_container'>
									{question?.choices?.map((choice: string, choiceIndex) => (
										<Choice
											text={choice}
											key={choiceIndex}
											onClick={() => {
												handleInput(question.question, choice);
												setCurrentView(currentView + 1);
											}}
										/>
									))}
									{question?.inputs &&
										Object.keys(question?.inputs)?.map(
											(inputLabel: string, inputIndex) => (
												<TextInput
													placeholder={inputLabel}
													key={inputIndex}
													value={(inputText: string) =>
														handleInput(inputLabel, inputText)
													}
												/>
											)
										)}
								</div>
								{question?.backButton && (
									<button
										className='widget_back_button'
										onClick={() => setCurrentView(currentView - 1)}>
										{question.backButton}
									</button>
								)}
								{question.nextButton && (
									<button
										className='widget_submit_button'
										style={{
											width:
												questions[currentView]?.buttonWidth === "full" ? "100%" : "30%",
										}}
										onClick={() => setCurrentView(currentView + 1)}>
										{questions[currentView].nextButton}
									</button>
								)}
								{question.doneButton && (
									<button
										className='widget_submit_button'
										style={{
											width:
												questions[currentView]?.buttonWidth === "full" ? "100%" : "30%",
										}}
										onClick={() => console.log(answers)}>
										{questions[currentView].doneButton}
									</button>
								)}
							</div>
						))}
					</ReactSimplyCarousel>
				</>
			) : (
				<h1 className='survery_widget_title'>Saknar frågor.</h1>
			)}
		</div>
	);
};

export default App;
