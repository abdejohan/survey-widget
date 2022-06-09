import React from "react";

interface ChoiceProps {
	text: string;
}
const Choice: React.FC<ChoiceProps> = (props) => {
	const { text } = props;

	return (
		<div className='widget_choice_container'>
			<span className='widget_choice'>{text}</span>
		</div>
	);
};

export default Choice;
