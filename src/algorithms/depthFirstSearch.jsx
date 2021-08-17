export function DFS(grid, startNode, endNode) {
    const unvisitedNodes = getAllNodes(grid)
    const visitedNodesInOrder = []
    startNode.isVisited = true
    return utilDFS(grid, startNode, visitedNodesInOrder, endNode)
}

function utilDFS(grid, currentNode, visitedNodesInOrder, endNode) {
    currentNode.isVisited = true
    visitedNodesInOrder.push(currentNode)
    console.log(currentNode)
    const neighbors = getUnvisitedNeighbors(currentNode, grid)
    if (currentNode === endNode) return visitedNodesInOrder

    for (const neighbor of neighbors) {
        if (currentNode.isWall) continue
        return utilDFS(grid, neighbor, visitedNodesInOrder, endNode)
    }
    return visitedNodesInOrder
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = []
    const { col, row } = node
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    return neighbors.filter((neighbor) => !neighbor.isVisited)
}

function getAllNodes(grid) {
    const nodes = []
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node)
        }
    }
    return nodes
}
