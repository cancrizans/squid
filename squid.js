toneSequences = {
	'H': "˥˥",
	'L': "˩˩",
	'R': "˩˥",
	'F': "˥˩",
	'P': "˩˥˧",
	'D': "˥˩˧",
	'T': "˥˩˧˩",
	'J': "˩˥˧˥"
}

var storage = "⁷ƍꔌꕃꕄ ꗏ ꘟ꘩ꘋꘫꗌ౮ᴛਕ੧ਠ6ㇸヘⲱωᲹᲜᲫᦽ𐒘𐒉߶";

var doublestroke = '\u0348'
var omeget = '\u032B'

var esssh = '𐒘'

var alphabet = {
	't':'ਕ',
	'y':'ꔌ',
	"rs":"6"+doublestroke,
	"ts":"#",
	"ch":"#"+doublestroke,
	'sh':esssh,
	'k':'Ʒ',
	'g':"Ʒ"+doublestroke,	
	'z':esssh+omeget,
	's':esssh+doublestroke,
	'b':'6',
	'_':'ᴛ',
	'r':'ω',
	'n':'ヘ',
	'm':'ヘ'+doublestroke,
	'a':""
}


function toScript(text){
	//should prepend _
	

	Object.keys(alphabet).forEach(function(key,index){
		let sub = alphabet[key];
		//let re = new RegExp(key,'g');
		//text = text.replace(key,sub);
		text = text.split(key).join(sub);
	});

	return text;
}

function aff(a,b){
	return a + "\u0361" + b;
}

var affV = aff("t","s");
var affP = aff("t","ʃ");
var affR = aff("ʈ","ʂ");

function toIPA(text){
	

	text = text.replace(/-/g,"")
				.replace(/mm/g,"mː")
				.replace(/nny/g,"ɲː")
				.replace(/nn/g,"nː")
				.replace(/ny/g,"ɲ")
				.replace(/rnn/g,"ɳː")
				.replace(/rn/g,"ɳ")
				.replace(/rr/g,"rː")
				.replace(/rs/g,"ʂ")
				.replace(/ṣh/g,"ʂ")
				.replace(/trj/g,"ɖʐ")
				.replace(/rz/g,"ʐ")
				.replace(/ẓh/g,"ʐ")
				.replace(/j/g,"dʒ")
				.replace(/dz/g,"dz")
				.replace(/sh/g,"ʃ")
				.replace(/zh/g,"ʒ")
				.replace(/ċċh/g,"ʈːʂ")
				.replace(/ccz/g,"ʈːʂ")
				.replace(/rcch/g,"ʈːʂ")
				.replace(/cch/g,"tːʃ")
				.replace(/ċh/g,affR)
				.replace(/cz/g,affR)
				.replace(/rch/g,affR)
				.replace(/ch/g,affP)
				.replace(/kk/g,"kː")
				.replace(/gg/g,"gː")
				.replace(/tt/g,"tː")
				.replace(/dd/g,"dː")
				.replace(/!!/g,"!ː")
				.replace(/tts/g,"tːs")
				.replace(/ts/g,affV)
				.replace(/pp/g,"pː")
				.replace(/y/g,"j");

	words = text.split(" ");

	outwords = [];

	V = "ə"

	for (let w of words){
		let m = w.match(/^((?:H|L|R|F|P|D|J|T)?)(.*)$/);
		let tone = m[1];

		if(tone == ""){
			outwords.push(w.replace(/a/g,V));
			continue;
		}
		
		let bareword = m[2];
		let tonification = tonify(bareword,tone);

		let outsyllables = tonification.consonants.map( (s,i) => s+V+tonification.pitches[i] );

		outwords.push(outsyllables.join("."));

	}



	return outwords.join("  ");

}


var vowelRE = /[a|e|o|i|u|y|à-æ|è-ö|ø-ý|ÿ|Ā-ą|Ē-ě|Ō-œ|Ũ-ų|Ŷ-Ÿ|Ǎ-ǣ]/g

function searchify(word){
	return word.replace(vowelRE,"a")
				.replace(/aa/g,"a");
}


function tonify(word,tone){

		let syllables = word.trim().split("a").slice(0,-1);

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
			console.log("ERROR");
			
		}

		return {'consonants':syllables,'pitches':pitches}
}

function applyToneRomanise(word,tone){
	let tonification = tonify(word,tone);
	let romanisations = tonification.pitches.map(function(p,i) {
										if(["w","y","j"].includes(tonification.consonants[i]))
											return "a";

										return p.replace(/˧/,"e").replace(/˩/,"o").replace(/˥/,"a");
									}

		);

	romanisations[0] = accent(romanisations[0],tone);
	return tonification.consonants.map((c,i) => c + romanisations[i]).join("");
}

function compactRomanise(text){
	text = text.replace(/rs/g,"ṣh")
				.replace(/rn/g,"ṇ")
				.replace(/rz/g,"ẓh");
	return text;
}



nounInflection = {
	"F": {
		"ABS":"D",
		"DOM":"R",
		"ABL":"F",
		"TRANS":"L",
		"IND":"H"
	},
	"M": {
		"ABS":"P",
		"DOM":"R",
		"ABL":"L",
		"TRANS":"L",
		"IND":"H"
	}
}

function getInflectionToneNoun(wgender, wcase){
	return nounInflection[wgender][wcase];
}


precomposed_accented = {
	"Fa":"à",
	"Ra":"á",
	"Fo":"ò",
	"Fa":"à",
	"Ha":"ā",
	"Da":"ǎ",
	"Ta":"ȁ",
	"La":"ȧ",
	"Ja":"ã",
	"Pa":"â",
	"Po":"ô"
}

function accent(vowel,tone){

	if (tone+vowel in precomposed_accented){
		return precomposed_accented[tone+vowel];
	}

	diacritic = {
		"F":"\u0300",
		"R":"\u0301",
		"D":"\u0306",
		"P":"\u0302",
		"H":"\u0304",
		"L":"\u0307",
		"T":"\u030f",
		"J":"\u0303"
	}

	return vowel + diacritic[tone];


}