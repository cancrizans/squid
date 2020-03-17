stops_labial = "p b".split(" ")

stops_prelabial = stops_labial


stops = stops_labial + "t d tt dd k g kp gb '".split(" ")
nasals = "m N nm".split(" ")
clicks = "= !".split(" ")

consonants_onset = stops+nasals+clicks

vowels_pure = "a aa e o oo u uu i ii".split(" ")
vowels_syllabic = "n nn z zz".split(" ")
vowels_pure_diphthongs = "ai ui ua au".split(" ")
vowels_syllabic_diphthongs = "zn".split(" ")

vowels_diphthongs = vowels_pure_diphthongs + vowels_syllabic_diphthongs


word_boundaries = "^ $".split(" ")

#consonants_coda = "p b t d tt dd k g kp gb"

import numpy as np

def generate_syllable():
	onset1 = np.random.choice(consonants_onset)

	onset2 = ""
	if(onset1 in (stops+clicks)):
		onset2 = "N" if (np.random.randint(0,100)<20) else ""

	nucleus = np.random.choice(np.random.choice([vowels_pure,vowels_syllabic,vowels_pure_diphthongs,vowels_syllabic_diphthongs],p=[.7,.09,.2,.01]) )

	#coda2 = random.choice(consonants)

	#if(coda2 == "N"):
	#	coda1 = ""
	#else:
	
	coda1 = "N" if (np.random.randint(0,100)<20) else ""

	syllable = onset1+onset2+nucleus+coda1

	return syllable

import re


pat_Nn = re.compile("Nn")
pat_nN = re.compile("nN")
pat_stopornasalN = re.compile("("+"|".join(stops+nasals)+")N")
pat_clickN = re.compile("("+"|".join(clicks)+")N")

pat_Nnasal = re.compile("N("+"|".join(nasals)+")")
pat_Nclick = re.compile("N("+"|".join(clicks)+")")
pat_Nlabial = re.compile("N("+"|".join(stops_prelabial)+")")
pat_Nstop = re.compile("N("+"|".join(stops)+")")

pat_N = re.compile("N")

def cleanN(text):
	text = pat_Nnasal.sub(r"\1",text)
	text = pat_Nn.sub("ln",text)
	text = pat_nN.sub("n",text)
	text = pat_stopornasalN.sub(r"\1l",text)
	text = pat_clickN.sub(r"\1n",text)
	text = pat_Nclick.sub(r"l\1",text)
	text = pat_Nlabial.sub(r"m\1",text)
	text = pat_Nstop.sub(r"n\1",text)
	text = pat_N.sub("n",text)
	return text


def generate_word(nSyllables = 2):
	sylls = []
	for i in range(nSyllables):
		sylls.append(generate_syllable())

	if(sylls[0] =="'"):
		sylls[0] = ""

	raw = "".join(sylls)
	

	return cleanN(raw)

for i in range(200):
	print(generate_word())

