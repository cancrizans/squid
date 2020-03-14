# -*- coding: UTF-8 -*-
consonants_base = [
				["m","n","rn","ny"],
				["nt"],
				["b"],
				["t","d","!"],
				["s","rs","sh","z"],
				["ts","ch"],
				["x","h"],
				["l","r"],
				["k","g"],
				["w","y"]
			]

consonants_initial = [
				[""]
			]

consonants_noninitial = [
				["mm","nn","rrn","nny"],
				["kk","gg"],
				["tt","dd","!!"],
				["tts","cch"]
			]


class consSet():
	def __init__(self,classes):
		self.classes = classes	
		self.setWeights()

	def setWeights(self):
		self.weights = list(map(len,self.classes))

set_initial = consSet(consonants_base)


set_mediofinal = consSet(consonants_base + consonants_noninitial)



consonants = {
	0: [""],
	1: ["y","w"],
	2: ["r"],
	3: ["m","n",u"ṇ","ny"],
	'3bis':["nt","nts","nch"],
	4: ["z",u"ẓh","zh"],
	5: ["s","sh",u"ṣh","ts","ch","ċh","h","tts","cch",u"ċċh"],
	6: ["b","d","g"],
	7: ["p","t","k","pp","tt","kk"]
}

geminateds = ["pp","tt","kk","tts","cch","ċċh"]

NUM_CLASSES = 8

def get_consonants(i):
	return consonants[i] + (consonants['3bis'] if (i==3) else [])

def get_delta():
	return random.choices(population = 
		[-6,-5,-4,-3,-2,-1, 0,+1,+2,+3,+4,+5,+6], weights =
		[ 8, 6, 4, 2, 1, 1, 0, 1, 1, 2, 4, 6, 8], k=1
		)[0]



N = 300


lengths_pop = [2,3,4,5]
lengths_weights = [0.05,0.30,0.5,0.15]

import random

lengths = random.choices(population = lengths_pop,weights = lengths_weights,k=N)

words = []

for i in range(N):
	l = lengths[i]
	w = u""
	

	cclass = random.randrange(0,NUM_CLASSES)

	for j in range(l):

		allowed = get_consonants(cclass)


		c = random.choice(allowed)
		while((j==0) and (c in geminateds)):
			c = random.choice(allowed)


		w += c + u"a"


		if ((cclass == 3) and (c in consonants['3bis'])):
			cclass = {
				u"nt":7,
				u"nts":5,
				u"nch":5
			}[c]
		


		while True:
			newclass = cclass + get_delta()

			if((0< newclass) and (newclass<NUM_CLASSES)):
				cclass = newclass
				break

	words.append(w)

f = open("output.txt","w",encoding='utf-8')
f.write("\n".join(words))
f.close()