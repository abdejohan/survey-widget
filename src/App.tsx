import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Choice from "./components/Choice";
// @ts-ignore
import ViewSlider from "react-view-slider";

const App = ({ widget }: any) => {
	const [currentView, setCurrentView] = useState<number>(0);
	const subreddit = widget.getAttribute("data-questions");
	console.log(JSON.parse(subreddit));
	// This function renders the view at the given index.
	// @ts-ignore
	const renderView = ({ index, active, transitionState }) => (
		<>
			<h2 className='survery_widget_question'>Vad är ditt mål?</h2>
			<div className='survery_widget_choices_container'>
				<Choice text='Bygga mer muskler' />
				<Choice text='Bygga mer muskler' />
				<Choice text='Bygga mer muskler' />
			</div>
		</>
	);

	return (
		<div className='survery_widget_container'>
			<h1 className='survery_widget_title'>4 frågor från En gratis konsultation</h1>
			<h2 className='survery_widget_description'>
				Fyll i formuläret nedan för att bli kontaktad för en gratis konsultation där vi
				tillsammans ser hur vi kan hjälpa just dig.
			</h2>
			<ProgressBar
				isLabelVisible={false}
				borderRadius='0px'
				bgColor='#F7D725'
				height='8px'
				className='survery_widget_progress_bar'
				completed={60}
			/>
			<ViewSlider
				renderView={renderView}
				numViews={3}
				activeView={currentView}
				animateHeight
			/>
			<button
				className='widget_submit_button'
				onClick={() => setCurrentView(currentView + 1)}>
				CLICK
			</button>
		</div>
	);
};

export default App;
