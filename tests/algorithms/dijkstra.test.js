const Graph = require('../../src/algorithms/graph');
const dijkstra = require('../../src/algorithms/dijkstra');

test('finds shortest path in graph', () => {
  const graph = new Graph();
  graph.addNode('A');
  graph.addNode('B');
  graph.addNode('C');
  graph.addNode('D');
  graph.addEdge('A', 'B', 1);
  graph.addEdge('B', 'C', 2);
  graph.addEdge('C', 'D', 1);
  graph.addEdge('A', 'D', 10);
  expect(dijkstra(graph, 'A', 'D')).toEqual(['A', 'B', 'C', 'D']);
});

test('returns empty path if no path found', () => {
  const graph = new Graph();
  graph.addNode('A');
  graph.addNode('B');
  graph.addEdge('A', 'B', 1);
  expect(dijkstra(graph, 'B', 'A')).toEqual([]);
});
