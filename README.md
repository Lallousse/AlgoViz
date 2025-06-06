# AlgoViz

AlgoViz is an interactive web application for visualizing graph algorithms. It provides a platform for users to create, manipulate, and observe the step-by-step execution of common graph algorithms on custom-drawn or loaded graphs.

## Features

- **Intuitive Graph Drawing Interface**: Add/edit/delete nodes and weighted/gitdirected edges
- **Algorithm Visualization**: Step-by-step visualization of:
  - Prim's Algorithm (Minimum Spanning Tree)
  - Kruskal's Algorithm (Minimum Spanning Tree)
  - Dijkstra's Algorithm (Shortest Paths)
  - Bellman-Ford Algorithm (Shortest Paths with negative edge weights)
- **Interactive Controls**: Start, Pause/Resume, and Next Step functionalities
- **Visual Feedback**: Nodes and edges change color to reflect their state during algorithm execution
- **Detailed Explanations**: Text explanations for each step of the algorithm
- **Data Display**: Draggable panel shows comprehensive step-by-step data for each algorithm
- **File Operations**: Save/load graph designs and algorithm steps
- **Responsive Design**: Adapts to various screen sizes

## Usage

1. **Draw a Graph**:

   - Use the "Add Node" tool to create nodes
   - Use the "Add Edge" tool to connect nodes
   - Use the "Select / Move" tool to select, move, or edit nodes and edges

2. **Run an Algorithm**:

   - Select an algorithm from the dropdown
   - For Prim's, Dijkstra's, or Bellman-Ford, select a start node
   - Click "Start" to begin the visualization
   - Use "Pause" and "Next" buttons to control the playback

3. **Save/Load**:
   - "Save Design" to save your graph as a JSON file
   - "Load Design" to load a previously saved graph
   - Algorithm steps are also saved as text files when available

## Implementation

AlgoViz is built using vanilla HTML, CSS, and JavaScript without any external libraries or frameworks. The application uses:

- SVG for graph rendering
- Pointer events for touch and mouse interactions
- CSS variables for theming
- Responsive design with media queries

## Getting Started

Simply open `index.html` in a modern web browser to start using AlgoViz. No server or installation required.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support This Free Project

Thank you for checking out AlgoViz! I've created this interactive graph algorithm visualization tool and made it freely available to help users learn and understand graph algorithms for educational, research, or professional purposes. Since this is offered for free, your support would be immensely appreciated to help me maintain and improve it. If you find this tool valuable, please consider donating to support my work:

- **Western Union/OMT**: Contact me on Discord at Lallousse#2052 with your donation intent, and I'll provide my personal information for sending money via Western Union or OMT. This ensures a secure and direct way to support me—thank you!

Your support helps cover my time, hosting costs, and future enhancements—thank you!
