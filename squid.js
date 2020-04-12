

var tH = "˦";
var tL = "˨";
var tM = "˧";

var matchL = new RegExp(tL);
var matchMH = new RegExp(tM+"|"+tH);
var matchH = new RegExp(tH);
var matchM = new RegExp(tM);
var matchLM = new RegExp(tL+"|"+tM);

var toneSequences = {
	'H': tH,
	'L': tL,
	'R': tL+tH,
	'F': tH+tL,
	'P': tL+tH+tM,
	'D': tH+tL+tM,
	'T': tH+tL+tM+tL,
	'J': tL+tH+tM+tH
}

var tonesLetters = Object.keys(toneSequences);

var precomposed_accented = {
	"Ha":"ā",
	"Fa":"à",
	"Ra":"á",
	"Da":"ǎ",

	"Ta":"ȁ",
	"La":"ȧ",
	"Ja":"ã",
	"Pa":"â",

	"Ho":"ō",
	"Fo":"ò",
	"Ro":"ó",
	"Do":"ǒ",

	"To":"ȍ",
	"Lo":"ȯ",
	"Jo":"õ",
	"Po":"ô",

	"He":"ē",
	"Fe":"è",
	"Re":"é",
	"De":"ě",

	"Te":"ȅ",
	"Le":"ė",
	"Je":"ẽ",
	"Pe":"ê",


	"Hi":"ī",
	"Fi":"ì",
	"Ri":"í",
	"Di":"ǐ",

	"Ti":"ȉ",
	"Li":"ı",
	"Ji":"ĩ",
	"Pi":"î",


	"Hu":"ū",
	"Fu":"ù",
	"Ru":"ú",
	"Du":"ǔ",

	"Tu":"ȕ",
	"Lu":"ü",
	"Ju":"ũ",
	"Pu":"û",

}

var unaccented = ["a","e","i","o","u"];

var deAccentRegexpes = {};

for (let T of tonesLetters){
	deAccentRegexpes[T] = new RegExp("["+unaccented.map(v=>precomposed_accented[T+v]).join("|")+"]", "i" );
}



var deAccentFull = new RegExp("["+Object.values(precomposed_accented).join("|")+"]","g");
var vowelNormalise = new RegExp("["+Object.values(precomposed_accented).concat(unaccented).join("|")+"]","g");



var punctuation = /[\?|,|\.|!]/g;


//following will turn any text with diacritics and tone marks into clean-vowel romanisation
function asciilitize(text){
	let words = text.trim().replace(punctuation,"").split(" ");
	let outwords = [];
	for (let ww of words){

		let w = ww.trim();

		if (w=="")
			continue;

		let T = "D";
		for (let Tt of tonesLetters){
			
			if(deAccentRegexpes[Tt].test(w)){
				T = Tt;
				break;
			}
		}

		w = w.replace(vowelNormalise,"a");

		w = w.replace(/aa/g,"a");
		
		outwords.push(T+w);
	}

	

	return outwords.join(" ");
}




var tonesPattern = "([P|D|R|F|T|J|H|L])";


//following will turn clean-vowel into script text
function toScript(text){
	text = text.replace(".","-");

	text = text.replace(/tts/g,"x.")
				.replace(/tt/g,"t.")
				.replace(/kk/g,"k.")
				.replace(/gg/g,"g.")
				.replace(/ny/g,"nj")
				.replace(/nts/g,"X")
				.replace(/nt/g,"N")
				.replace(/ts/g,"x")
				.replace(/rn/g,"n.")
				.replace(/ṇ/g,"n.")
				.replace(/rsh/g,"s.")
				.replace(/sh/g,"S")
				.replace(/ṣh/g,"s.")
				.replace(/rzh/g,"z.")
				.replace(/zh/g,"Z")
				.replace(/ẓh/g,"z.")
				.replace(/f/g,"h");


	

	text = text.replace(vowelNormalise,"a")
				.replace(/ ?([P|D|R|F|T|J|H|L])a/g,"$1'")
				.replace(/ ?([P|D|R|F|T|J|H|L])/g,"$1")
				.replace(/a/g,"");

	

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
				.replace(/n(t|c|ċ)/g,"ⁿ$1")
				.replace(/mm/g,"mː")
				.replace(/nny/g,"ɲː")
				.replace(/nn/g,"nː")
				.replace(/ny/g,"ɲ")
				.replace(/rnn/g,"ɳː")
				.replace(/rn/g,"ɳ")
				.replace(/ṇṇ/g,"ɳː")
				.replace(/ṇ/g,"ɳ")
				.replace(/rr/g,"rː")
				.replace(/rs/g,"ʂ")
				.replace(/ṣh/g,"ʂ")
				.replace(/trj/g,"ɖʐ")
				.replace(/rz/g,"ʐ")
				.replace(/ẓh/g,"ʐ")
				
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

	V = ""

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
	return word.replace(vowelNormalise,"a")
				.replace(/aa/g,"a");
}


function tonify(word,tone){

		word = word.replace(vowelNormalise,"a");

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
			if(pitches.length == 1)
				pitches.splice(1,0,pitches[0]);
			else
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
	let N = tonification.consonants.length;
	let romanisations = tonification.pitches.map(function(p,i) {
										let c = tonification.consonants[i];
										if(["w","y"].includes(c))
											return "a";
										if((i==N-1)){
											if ("r" == c)
												return "u";
										}
										if(["sh","ch"].includes(c)){
											return p.replace(matchMH,"i").replace(matchL,"e");
										}
										if(["ṣh","ẓh"].includes(c)){
											return p.replace(matchM,"e").replace(matchL,"o").replace(matchH,"e");
										}

										return p.replace(matchM,"e").replace(matchL,"o").replace(matchH,"a");
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

function getInflectionToneVerb(pgender,vmood){
	return "F";
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