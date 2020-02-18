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

N = 300


lengths_pop = [2,3,4,5]
lengths_weights = [0.05,0.30,0.5,0.15]

import random

lengths = random.choices(population = lengths_pop,weights = lengths_weights,k=N)

words = []

for i in range(N):
	l = lengths[i]
	w = ""
	last_class = -2
	for j in range(l):
		if (j==0) and (random.randrange(0,10)<1):
			cons = ""
		else:
			allowed = set_initial if j==0 else set_mediofinal;

			while True:
				c = random.choices(population = range(len(allowed.classes)), weights = allowed.weights, k=1)[0]
				if (c!=last_class):
					break
			last_class = c

			cons = random.choice(allowed.classes[c])

		w += cons + "a"

	words.append(w)

print(words)