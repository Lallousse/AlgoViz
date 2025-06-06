/**
 * Dijkstra's Algorithm for Shortest Paths
 */

function generateDijkstraSteps(graph, startNodeId) {
    // Check if start node exists
    if (!startNodeId || !graph.getNode(startNodeId)) {
        return {
            steps: [],
            error: 'Start node is required for Dijkstra\'s algorithm.'
        };
    }
    
    const steps = [];
    const nodes = graph.nodes;
    const edges = graph.edges;
    
    // Create a copy of nodes and edges for visualization
    const nodesCopy = nodes.map(node => ({ ...node }));
    const edgesCopy = edges.map(edge => ({ ...edge }));
    
    // Initialize distances and predecessors
    const distances = {};
    const predecessors = {};
    const visited = new Set();
    
    // Initialize all distances to Infinity except the start node
    nodes.forEach(node => {
        distances[node.id] = node.id === startNodeId ? 0 : Infinity;
        predecessors[node.id] = null;
    });
    
    // Table data
    const headers = ["Sequence", ...nodes.map(node => node.name)];
    const rows = [];
    
    // Add initial step
    steps.push({
        type: 'node-highlight',
        elementId: startNodeId,
        color: 'accent',
        text: `Starting Dijkstra's algorithm from node ${graph.getNode(startNodeId).name}.`,
        nodesSnapshot: nodesCopy.map(node => ({
            ...node,
            color: node.id === startNodeId ? 'accent' : null,
            label: distances[node.id]
        })),
        edgesSnapshot: edgesCopy,
        tableData: {
            headers,
            rows: [...rows]
        }
    });
    
    // Track the sequence of visited nodes
    let sequence = graph.getNode(startNodeId).name;
    
    // Main algorithm loop
    while (visited.size < nodes.length) {
        // Find the unvisited node with the smallest distance
        let minDistance = Infinity;
        let minNode = null;
        
        nodes.forEach(node => {
            if (!visited.has(node.id) && distances[node.id] < minDistance) {
                minDistance = distances[node.id];
                minNode = node;
            }
        });
        
        // If no reachable node is found, break
        if (!minNode || minDistance === Infinity) {
            steps.push({
                type: 'text-update',
                text: 'No more nodes can be reached.',
                nodesSnapshot: nodesCopy.map(node => ({
                    ...node,
                    color: visited.has(node.id) ? 'accent' : null,
                    label: distances[node.id]
                })),
                edgesSnapshot: edgesCopy,
                tableData: { headers, rows: [...rows] }
            });
            break;
        }
        
        // Mark the node as visited
        visited.add(minNode.id);
        
        // Update the sequence
        if (minNode.id !== startNodeId) {
            sequence += minNode.name;
        }
        
        // Create row for the current state
        const row = [sequence];
        nodes.forEach(node => {
            if (visited.has(node.id)) {
                row.push("x");
            } else {
                const dist = distances[node.id];
                const pred = predecessors[node.id];
                const predName = pred ? graph.getNode(pred).name : "-";
                row.push(dist === Infinity ? "∞(-)" : `${dist}(${predName})`);
            }
        });
        
        rows.push(row);
        
        // Add a step to highlight the current node
        steps.push({
            type: 'node-highlight',
            elementId: minNode.id,
            color: 'accent',
            text: `Visiting node ${minNode.name} with distance ${distances[minNode.id]}.`,
            nodesSnapshot: nodesCopy.map(node => ({
                ...node,
                color: visited.has(node.id) ? 'accent' : null,
                label: distances[node.id]
            })),
            edgesSnapshot: edgesCopy.map(edge => {
                // Highlight edges in the shortest path tree
                if (edge.from === predecessors[minNode.id] && edge.to === minNode.id) {
                    return { ...edge, color: 'accent' };
                } else if (!edge.isDirected && edge.to === predecessors[minNode.id] && edge.from === minNode.id) {
                    return { ...edge, color: 'accent' };
                }
                return { ...edge };
            }),
            tableData: { headers, rows: [...rows] }
        });
        
        // Explore neighbors
        const neighbors = graph.getNeighbors(minNode.id);
        
        for (const neighbor of neighbors) {
            const neighborNode = graph.getNode(neighbor.nodeId);
            
            if (visited.has(neighborNode.id)) continue;
            
            const edge = graph.getEdge(neighbor.edgeId);
            
            // Add a step to highlight the edge being considered
            steps.push({
                type: 'edge-highlight',
                elementId: edge.id,
                color: 'secondary',
                text: `Considering edge from ${minNode.name} to ${neighborNode.name} with weight ${edge.weight}.`,
                nodesSnapshot: nodesCopy.map(node => ({
                    ...node,
                    color: visited.has(node.id) ? 'accent' : null,
                    label: distances[node.id]
                })),
                edgesSnapshot: edgesCopy.map(e => {
                    if (e.id === edge.id) {
                        return { ...e, color: 'secondary' };
                    } else if (
                        (e.from === predecessors[e.to] && visited.has(e.to)) ||
                        (!e.isDirected && e.to === predecessors[e.from] && visited.has(e.from))
                    ) {
                        return { ...e, color: 'accent' };
                    }
                    return { ...e };
                }),
                tableData: { headers, rows: [...rows] }
            });
            
            // Calculate new distance
            const newDistance = distances[minNode.id] + edge.weight;
            
            // If we found a shorter path
            if (newDistance < distances[neighborNode.id]) {
                distances[neighborNode.id] = newDistance;
                predecessors[neighborNode.id] = minNode.id;
                
                // Add a step to update the distance
                steps.push({
                    type: 'node-update',
                    elementId: neighborNode.id,
                    color: 'primary',
                    data: { label: newDistance },
                    text: `Updated distance to node ${neighborNode.name}: ${newDistance} via ${minNode.name}.`,
                    nodesSnapshot: nodesCopy.map(node => ({
                        ...node,
                        color: node.id === neighborNode.id ? 'primary' : visited.has(node.id) ? 'accent' : null,
                        label: node.id === neighborNode.id ? newDistance : distances[node.id]
                    })),
                    edgesSnapshot: edgesCopy.map(e => {
                        if (e.id === edge.id) {
                            return { ...e, color: 'primary' };
                        } else if (
                            (e.from === predecessors[e.to] && visited.has(e.to)) ||
                            (!e.isDirected && e.to === predecessors[e.from] && visited.has(e.from))
                        ) {
                            return { ...e, color: 'accent' };
                        }
                        return { ...e };
                    }),
                    tableData: { headers, rows: [...rows] }
                });
            } else {
                // Add a step to show that the current path is better
                steps.push({
                    type: 'text-update',
                    text: `Current path to ${neighborNode.name} (distance ${distances[neighborNode.id]}) is better than the new path via ${minNode.name} (distance ${newDistance}).`,
                    nodesSnapshot: nodesCopy.map(node => ({
                        ...node,
                        color: visited.has(node.id) ? 'accent' : null,
                        label: distances[node.id]
                    })),
                    edgesSnapshot: edgesCopy.map(e => {
                        if (
                            (e.from === predecessors[e.to] && visited.has(e.to)) ||
                            (!e.isDirected && e.to === predecessors[e.from] && visited.has(e.from))
                        ) {
                            return { ...e, color: 'accent' };
                        }
                        return { ...e };
                    }),
                    tableData: { headers, rows: [...rows] }
                });
            }
        }
    }
    
    // Highlight the shortest paths in the final step
    const shortestPathEdges = new Set();
    
    nodes.forEach(node => {
        if (node.id !== startNodeId && predecessors[node.id] !== null) {
            let current = node.id;
            while (current !== startNodeId) {
                const prev = predecessors[current];
                
                // Find the edge between prev and current
                const edge = edges.find(e => 
                    (e.from === prev && e.to === current) || 
                    (!e.isDirected && e.from === current && e.to === prev)
                );
                
                if (edge) {
                    shortestPathEdges.add(edge.id);
                }
                
                current = prev;
            }
        }
    });
    
    // Add final step
    steps.push({
        type: 'final',
        text: `Dijkstra's algorithm completed. Shortest paths from ${graph.getNode(startNodeId).name} to all reachable nodes have been found.`,
        nodesSnapshot: nodesCopy.map(node => ({
            ...node,
            color: visited.has(node.id) ? 'accent' : null,
            label: distances[node.id]
        })),
        edgesSnapshot: edgesCopy.map(edge => ({
            ...edge,
            color: shortestPathEdges.has(edge.id) ? 'accent' : null
        })),
        tableData: { headers, rows: [...rows] }
    });
    
    return { steps };
} 