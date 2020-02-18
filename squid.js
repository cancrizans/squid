function toIPA(text){


	text = text.replace(/-/g,"")
				.replace(/a/g,"ə.")
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

	return text;

}