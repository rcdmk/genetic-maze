# Genetic Algorithm for Solving Mazes

This is a simplified implementation of a genetic algorithm to find solutions for a maze, based on Darwin's natural selecition theory.

## Algorithm

A random population is generated and processed, then its fitness is computed as how close they get to the goal. The fittest survive, producing a new generation that inherits part of their genes.

A mutation factor is also introduced to add some variation to the generation and it is essential for evolution to properly adjust it. If no mutation is set the population evolves only in a certain way, based on its ancestors and can get stuck in certain paths, not being able to reach the goal. If a too high mutation is set the variation will be so high that the convergence of the population will be severely reduced, leading to very few individuals to reach the goal.
