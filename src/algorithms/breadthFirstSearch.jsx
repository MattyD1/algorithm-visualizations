export function BFS(grid, startNode, endNode) {
    const unvisitedNodes = getAllNodes(grid)
    const visitedNodesInOrder = []
    const queueInOrder = [startNode]

    var queue = []
    console.log(unvisitedNodes)
    console.log(startNode)

    startNode.isVisited = true
    queue.push(startNode)
    console.log(queue)

    while (queue.length > 0) {
        sortNodesByDistance(unvisitedNodes)
        const currentNode = queue.shift()
        if (currentNode.isWall) continue
        visitedNodesInOrder.push(currentNode)
        const neighbors = getUnvisitedNeighbors(currentNode, grid)
        if (currentNode === endNode) return visitedNodesInOrder
        for (const neighbor of neighbors) {
            neighbor.isVisited = true
            queue.push(neighbor)
            queueInOrder.push(neighbor)
            neighbor.distance = currentNode.distance + 1
            neighbor.previousNode = currentNode
        }
    }
    return visitedNodesInOrder
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
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
