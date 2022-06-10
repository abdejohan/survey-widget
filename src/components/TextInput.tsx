import React from "react";

interface TextInputProps {
	placeholder: string;
	value: (value: string) => void;
}
const TextInput: React.FC<TextInputProps> = (props) => {
	const { value, placeholder } = props;

	const handleInput = (text: string) => {
		return value(text);
	};

	return (
		<input
			className='widget_input'
			placeholder={placeholder}
			onChange={(event) => handleInput(event.target.value)}></input>
	);
};

export default TextInput;
