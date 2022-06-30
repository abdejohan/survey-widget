type Question = {
	key: number;
	title: string;
	description: string;
	question: string | undefined;
	choices: Array<string> | undefined;
	inputs: Array<string> | undefined;
	backButton: string | undefined;
	nextButton: string | undefined;
	doneButton: string | undefined;
	buttonWidth: string | undefined;
};

type DataAttributeObject = {
	questions: [Question];
};

export { Question, DataAttributeObject };
