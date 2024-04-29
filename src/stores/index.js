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
    const {source, sourceHandle, target, targetHandle} = connection
    const edge = {
        id: `${source}-${target}`,
        source: source,
        target: target,   
        animated: sourceHandle==="animation"?true:false, 
    }
    store.edges = addEdge(edge, store.edges)
}

export const setNodes = (nodes) => {
    store.nodes.push(nodes)
}

export const setEdges = (edges) => {
    store.edges = edges
}

