import random
from copy import deepcopy
from math import ceil
import numpy as np


class Genome:
    genome = []
    fitness = 0
    distance_map = []

    def __init__(self, number_of_cities, starting_city, distance_map):
        self.distance_map = deepcopy(distance_map)
        self.starting_city = starting_city
        self.number_of_cities = number_of_cities
        self.random_result()
        self.calculate_fitness()

    def random_result(self):
        for i in range(0, self.number_of_cities):
            self.genome.append(i) if i != self.starting_city else 0
        random.shuffle(self.genome)

    def calculate_fitness(self):
        current_city = self.starting_city
        for gene in self.genome:
            self.fitness += self.distance_map[current_city][gene]
            current_city = gene
        self.fitness += self.distance_map[self.genome[self.number_of_cities - 2]][self.starting_city];


def selection(pop, rate):
    size = rate * len(pop)
    weights = []
    sum_fitness = sum(genome.fitness for genome in pop)
    for genome in pop:
        weights.append(genome.fitness / sum_fitness)
    return random.choices(pop, weights, k=int(ceil(size)))


def best_of_pop(pop):
    best_fit = min([gene.fitness for gene in pop])
    for gene in pop:
        if gene.fitness == best_fit:
            return gene


if __name__ == '__main__':
    # parameters: //Assuming route should start from 0.
    pop_size = 100
    max_iter_size = 1000
    max_stalling = 100
    selection_rate = 0.2


    def read_txt(file_name):
        distances = []
        temp = []
        f = open(file_name, "r")
        for line in f:
            tt = line.split("\n")[0].split("\t")
            for index in range(0, len(tt)):
                add = int(tt[index])
                if add == 0:
                    add = 99999
                temp.append(add)
            distances.append(temp)
        return distances


    distance_map = read_txt("29_cities.txt")
    pop = []
    for i in range(0, pop_size):
        pop.append(Genome(len(distance_map), 0, distance_map))

    print(pop[1].genome)
    print(Genome(len(distance_map), 0, distance_map).genome)

    best = best_of_pop(pop)
    print(best.fitness,best.genome)
    parents = selection(pop, selection_rate)
