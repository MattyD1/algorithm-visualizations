import React, { Component } from 'react'
import Node from './Node/Node'
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra'

import './PathfindingVisualizer.css'

interface Props {}

interface Nodes {
    row: number
    col: number
    isStart: boolean
    isFinish: boolean
    isWall: boolean
}

interface State {
    grid: Array<Array<Nodes>>
    mouseIsPressed: boolean
}

const START_NODE_ROW = 10
const START_NODE_COL = 15
const END_NODE_ROW = 10
const END_NODE_COL = 35

export default class PathfindingVisualizer extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            grid: [],
            mouseIsPressed: false,
        }
    }

    componentDidMount() {
        const grid = getInitialGrid()
        this.setState({ grid })
    }

    handleMouseDown(row: number, col: number) {
        const newGrid = getNewGridWithWallToggle(this.state.grid, row, col)
        this.setState({ grid: newGrid, mouseIsPressed: true })
    }

    handleMouseEnter(row: number, col: number) {
        if (!this.state.mouseIsPressed) return
        const newGrid = getNewGridWithWallToggle(this.state.grid, row, col)
        this.setState({ grid: newGrid })
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false })
    }

    animateDijkstra(visitedNodesInOrder: any, nodesInShortestPathOrder: any) {
        console.log('animate')
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder)
                }, 10 * i)
                return
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                console.log('changeClass')
                document
                    .getElementById(`node-${node.row}-${node.col}`)
                    ?.classList.add('node-visited')
            }, 10 * i)
        }
    }

    animateShortestPath(nodesInShortestPathOrder: any) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i]
                document
                    .getElementById(`node-${node.row}-${node.col}`)
                    ?.classList.add('node-shortest-path')
            }, 50 * i)
        }
    }

    visualizeDijkstra() {
        const { grid } = this.state
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const endNode = grid[END_NODE_ROW][END_NODE_COL]
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode)
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
    }

    render() {
        const { grid, mouseIsPressed } = this.state
        return (
            <>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <div className='grid'>
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className='row'>
                            {row.map((node, nodeIndex) => {
                                const { row, col, isStart, isFinish, isWall } =
                                    node
                                return (
                                    <Node
                                        key={nodeIndex}
                                        col={col}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseDown={(
                                            row: number,
                                            col: number
                                        ) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(
                                            row: number,
                                            col: number
                                        ) => this.handleMouseEnter(row, col)}
                                        onMouseUp={() => this.handleMouseUp()}
                                        row={row}
                                    />
                                )
                            })}
                        </div>
                    ))}
                </div>
            </>
        )
    }
}

const getInitialGrid = () => {
    const grid = []
    for (let row = 0; row < 20; row++) {
        const currentRow = []
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row))
        }
        grid.push(currentRow)
    }
    return grid
}

const createNode = (col: number, row: number) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === END_NODE_ROW && col === END_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    }
}

const getNewGridWithWallToggle = (
    grid: Array<Array<Nodes>>,
    row: number,
    col: number
) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
        ...node,
        isWall: !node.isWall,
    }
    newGrid[row][col] = newNode
    return newGrid
}
