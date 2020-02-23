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
	2: ["r","rr"],
	3: ["m","n","rn","ny","mm","nn","rnn","nny"],
	'3bis':["nt","nts","nch"],
	4: ["z","zh","rz","x"],
	5: ["f","s","sh","rs","ts","ch","cz","h","tts","cch","ccz"],
	6: ["b","d","g"],
	7: ["p","t","k","pp","tt","kk"]
}

NUM_CLASSES = 8

def get_consonants(i):
	return consonants[i]

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
	w = ""
	

	cclass = random.randrange(0,NUM_CLASSES)

	for j in range(l):

		allowed = get_consonants(cclass)

		c = random.choice(allowed)

		w += c + "a"


		while True:
			newclass = cclass + get_delta()

			if((0< newclass) and (newclass<NUM_CLASSES)):
				cclass = newclass
				break

	words.append(w)

print(words)