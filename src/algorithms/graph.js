class Graph {
    constructor() {
      this.nodes = new Set();
      this.edges = new Map();
    }
  
    addNode(node) {
      this.nodes.add(node);
      this.edges.set(node, new Map());
    }
  
    addEdge(node1, node2, weight) {
      this.edges.get(node1).set(node2, weight);
      this.edges.get(node2).set(node1, weight);
    }
  
    getNodes() {
      return Array.from(this.nodes);
    }
  
    getEdges(node) {
      return this.edges.get(node);
    }
  
    getWeight(node1, node2) {
      return this.edges.get(node1).get(node2);
    }
  }
  
  module.exports = Graph;
  