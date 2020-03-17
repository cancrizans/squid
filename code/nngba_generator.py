consonants = "p b t d tt dd k g kp gb m N nm ' = !".split(" ")

vowels = "a aa e o oo u uu i ii n nn z zz ai ui ua au zn".split(" ")

import random

def generate_syllable():
	onset1 = random.choice(consonants)
	if(onset1 == "'"):
		onset1 = ""
	if(onset1 == "N"):
		onset2 = ""
	else:
		onset2 = "N" if (random.randint(0,100)<20) else ""

	nucleus = random.choice(vowels)

	coda2 = random.choice(consonants)

	if(coda2 == "N"):
		coda1 = ""
	else:
		coda1 = "N" if (random.randint(0,100)<20) else ""

	syllable = onset1+onset2+nucleus+coda1+coda2

	return syllable


for i in range(200):
	print(generate_syllable())

