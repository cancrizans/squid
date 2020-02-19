toneSequences = {
	'H': "˥",
	'L': "˩",
	'R': "˩˥",
	'F': "˥˩",
	'P': "˩˥˩",
	'D': "˥˩˥",
	'T': "˥˩˧˩",
	'J': "˩˥˧˥"
}


function toIPA(text){


	text = text.replace(/-/g,"")
				.replace(/mm/g,"mː")
				.replace(/nny/g,"ɲː")
				.replace(/nn/g,"nː")
				.replace(/ny/g,"ɲ")
				.replace(/rrn/g,"ɳː")
				.replace(/rn/g,"ɳ")
				.replace(/rs/g,"ʂ")
				.replace(/sh/g,"ʃ")
				.replace(/cch/g,"tːʃ")
				.replace(/ch/g,"tʃ")
				.replace(/kk/g,"kː")
				.replace(/gg/g,"gː")
				.replace(/tt/g,"tː")
				.replace(/dd/g,"dː")
				.replace(/!!/g,"!ː")
				.replace(/tts/g,"tːs")
				.replace(/y/g,"j");

	words = text.split(" ");

	outwords = [];

	for (let w of words){
		let m = w.match(/^((?:H|L|R|F|P|D|J|T)?)(.*)$/);
		let tone = m[1];

		if(tone == ""){
			outwords.push(w);
			continue;
		}
		
		let syllables = m[2].trim().split("a").slice(0,-1);

		let pitches = [...toneSequences[tone]];

		if(pitches.length > syllables.length)
		{
			let a = pitches.pop();
			let b = pitches.pop();
			pitches.push(b+a);
		}

		if(pitches.length > syllables.length){
			let a = pitches.shift();
			let b = pitches.shift();
			pitches.unshift(a+b);
		}

		if(syllables.length > pitches.length){

			if(pitches.length == 2)
			{
				pitches.splice(1,0,'˧');
			}
		}

		while(syllables.length > pitches.length){
			pitches.splice(1,0,pitches[1]);
		}


		if(syllables.length != pitches.length)
		{
			outwords.push("ERROR");
			continue;
		}

		let outsyllables = syllables.map( (s,i) => s+"ə"+pitches[i] );

		outwords.push(outsyllables.join("."));

	}






	return outwords.join(" ");

}