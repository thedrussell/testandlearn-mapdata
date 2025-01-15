export const colors = {
	'Outreach Health': '#2BACD0',
	'IPS': '#F7D461',
	'Personalised Budgets': '#F0706B',
	'Using Data to Prevent Homelessness': '#14B8A6',
	'Citadel': '#0C4A6E',
	'Systems-wide Evaluation': '#78716C',
	'Deep Dive Justice': '#047857',
	'Accommodate or Connect': '#FB923C',
	'Accommodation and Immigration Advice': '#BE185D',
};

export const colorKeyValList = Object.entries(colors).reduce((out, [key, val]) => {
	out.push(key);
	out.push(val);
	return out;
}, []);

console.log(colorKeyValList);