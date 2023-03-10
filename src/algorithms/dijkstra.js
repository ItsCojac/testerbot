function dijkstra(graph, startNode, endNode) {
    const distances = new Map();
    const previousNodes = new Map();
    const visitedNodes = new Set();
  
    graph.getNodes().forEach(node => {
      distances.set(node, Infinity);
      previousNodes.set(node, null);
    });
  
    distances.set(startNode, 0);
  
    while (!visitedNodes.has(endNode)) {
      const currentNode = getClosestNode(distances, visitedNodes);
      const currentDistance = distances.get(currentNode);
  
      graph.getEdges(currentNode).forEach((weight, neighborNode) => {
        const distance = currentDistance + weight;
  
        if (distance < distances.get(neighborNode)) {
          distances.set(neighborNode, distance);
          previousNodes.set(neighborNode, currentNode);
        }
      });
  
      visitedNodes.add(currentNode);
    }
  
    return buildPath(endNode, previousNodes);
  }
  
  function getClosestNode(distances, visitedNodes) {
    return Array.from(distances.entries())
      .filter(([node, distance]) => !visitedNodes.has(node))
      .reduce((min, [node, distance]) => distance < distances.get(min) ? node : min, Array.from(distances.keys())[0]);
  }
  
  function buildPath(endNode, previousNodes) {
    const path = [endNode];
    let previousNode = previousNodes.get(endNode);
  
    while (previousNode) {
      path.unshift(previousNode);
      previousNode = previousNodes.get(previousNode);
    }
  
    return path;
  }
  
  module.exports = dijkstra;
  