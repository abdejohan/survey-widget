import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Choice from "./components/Choice";

const App = ({ widget }: any) => {
	console.log(widget);
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
			<h2 className='survery_widget_question'>Vad är ditt mål?</h2>
			<Choice text='gg1' />
			<Choice text='gg2' />
			<Choice text='gg3' />
			<Choice text='gg4' />
		</div>
	);
};

export default App;
