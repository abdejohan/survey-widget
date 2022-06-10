import React from "react";

interface ChoiceProps {
	text: string;
	onClick: () => void;
}
const Choice: React.FC<ChoiceProps> = (props) => {
	const { text, onClick } = props;

	return (
		<div onClick={onClick} className='widget_choice_container'>
			<span className='widget_choice'>{text}</span>
		</div>
	);
};

export default Choice;
