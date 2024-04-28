import { proxy } from 'valtio'
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow'

export const store = proxy({
    nodes: [],
    edges: [],
})

export const onNodesChange = (changes) => {
    store.nodes = applyNodeChanges(changes, store.nodes)
}

export const onEdgesChange = (changes) => {
    store.edges = applyEdgeChanges(changes, store.edges)
}

export const onConnect = (connection) => {
    store.edges = addEdge(connection, store.edges)
}

export const setNodes = (nodes) => {
    store.nodes.push(nodes)
}

export const setEdges = (edges) => {
    store.edges = edges
}

