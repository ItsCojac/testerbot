const Graph = require('../../src/algorithms/graph');

test('adds nodes to graph', () => {
  const graph = new Graph();
  graph.addNode('A');
  graph.addNode('B');
  expect(graph.getNodes()).toEqual(['A', 'B']);
});

test('adds edges to graph', () => {
  const graph = new Graph();
  graph.addNode('A');
  graph.addNode('B');
  graph.addEdge('A', 'B', 10);
  expect(graph.getEdges('A')).toEqual(new Map([['B', 10]]));
  expect(graph.getEdges('B')).toEqual(new Map([['A', 10]]));
});

test('gets weight of edge', () => {
  const graph = new Graph();
  graph.addNode('A');
  graph.addNode('B');
  graph.addEdge('A', 'B', 10);
  expect(graph.getWeight('A', 'B')).toBe(10);
});
