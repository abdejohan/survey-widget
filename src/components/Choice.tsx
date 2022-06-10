import React from "react";
import CheckCircleIcon from "../assets/icons/CheckCircleIcon";

interface ChoiceProps {
	text: string;
	onClick: () => void;
}
const Choice: React.FC<ChoiceProps> = (props) => {
	const { text, onClick } = props;

	return (
		<div onClick={onClick} className='widget_choice_container'>
			<CheckCircleIcon
				style={{ color: "#ffffff", height: "22px", width: "22px", marginRight: "10px" }}
			/>
			<span className='widget_choice'>{text}</span>
		</div>
	);
};

export default Choice;
