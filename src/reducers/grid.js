const getNeighbourDims = (p, outlet) =>
	[[-1, -1 + (p.x % 2)], [0, -1], [1, -1 + (p.x % 2)], [1, (p.x % 2)], [0, 1], [-1, (p.x % 2)]]
	.map((ar) => [ar[0] + p.x, ar[1] + p.y])[outlet];


const getGridPieceAt = (d, grid) =>
	Object.keys(grid).filter((k) => grid[k].x === d[0] && grid[k].y === d[1])[0] || null;

// Convert rotated index of given edge back to real index
const absConnector = (absRot) => absRot > 5 ? absRot - 6 : absRot;

// Returns the corresponding edge of a neighbour to given edge index
const connectsAt = (num) => absConnector(num + 3);

const availableEdges = (entryPoint, p) =>
	[0, 1, 2, 3, 4, 5]
		.filter((idx) => idx !== entryPoint)
		.filter((idx) => p.tubes.filter((t) => t.from === idx || t.to === idx).length === 0);

const connectingEdges = (edges, p, grid) =>
	edges.filter((idx) => getGridPieceAt(getNeighbourDims(p, idx), grid));

const exitingEdges = (edges, p, grid) =>
	edges.filter((idx) => !getGridPieceAt(getNeighbourDims(p, idx), grid));

const makeTube = (entryPoint, p, grid, gridBorders) => {
	let available = availableEdges(entryPoint, p);

	let connectors = connectingEdges(available, p, grid);
	let exits = exitingEdges(available, p, grid)
		.filter((idx) => gridBorders[p.key].indexOf(idx) > -1);

	if(connectors.length === 0 && exits.length === 0) { return false; }

	let to = connectors.length ?
		connectors[Math.floor(Math.random() * connectors.length)] :
		exits[Math.floor(Math.random() * exits.length)];

	// using an exit, so drop the exit point from available grid borders
	if(connectors.length === 0) {
		gridBorders[p.key].splice(gridBorders[p.key].indexOf(to), 1);
	}

	return {
		from: entryPoint,
		to: to,
		hasFlow: 0
	};
};

const addTubes = (grid, gridBorders) => {
	// Take an entry point from the remaining available gridBorders
	let current = Object.keys(gridBorders)[Math.floor(Math.random() * Object.keys(gridBorders).length)];
	let entryPoint = gridBorders[current][Math.floor(Math.random() * gridBorders[current].length)];
	let start = [current, entryPoint];
	gridBorders[current].splice(gridBorders[current].indexOf(entryPoint), 1);

	let length = 0;
	let newTube, last;
	while(current) {
		length++;
		newTube = makeTube(entryPoint, grid[current], grid, gridBorders);
		if(newTube) {
			grid[current].tubes.push(newTube);
			entryPoint = connectsAt(newTube.to);
			last = current;
			current = getGridPieceAt(getNeighbourDims(grid[current], newTube.to), grid);
		} else {
			throw new Error("complete failure");
		}
	}

	return {
		entryPoint: start,
		exit: [last, newTube.to],
		length: length
	};
};


// Convert rotation to current index of top left edge
const absRotation = (degs) => 6 - ((degs < 0 ? 360 + degs : degs) / 60);

const normConn = (abscon) => abscon < 0 ? 6 + abscon : abscon;


// Find the tube of gridpiece p at a given edge index idx
const findTube = (p, idx) =>
	p.tubes
		.map((t, i) => [i, t])
		.filter((t) => (t[1].from === idx || t[1].to === idx))[0];

const detectFlow = (grid, numFlows, entryPoints, exits) => {
	for(let k in grid) {
		grid[k].tubes = grid[k].tubes.map((t) => {return {from: t.from, to: t.to, hasFlow: 0}; });
	}

	for(let flowIdx = 1; flowIdx <= numFlows; flowIdx++) {
		console.log(entryPoints[flowIdx - 1]);
		let current = entryPoints[flowIdx - 1][0];
		let entryPoint = entryPoints[flowIdx - 1][1];
		while(current) {
			let abscon = absConnector(entryPoint + absRotation(grid[current].rotation));
			let itsTube = findTube(grid[current], abscon);

			if(itsTube) {
				grid[current].tubes[itsTube[0]].hasFlow = flowIdx;
				let outlet = abscon === itsTube[1].from ? itsTube[1].to : itsTube[1].from;
				outlet = normConn(outlet - absRotation(grid[current].rotation));
				entryPoint = connectsAt(outlet);
				current = getGridPieceAt(getNeighbourDims(grid[current], outlet), grid);
			} else {
				current = null;
			}
		}
	}
	return grid;
};

const makeGrid = (w, h, numFlows = 1) => {
	let grid = {};
	for(let x = 0, i = 0; x < w; x++) {
		for(let y = 0; y < h; y++, i++) {
			grid[i] = {x: x, y: y, rotation: 360, tubes: [], key: "" + i};
		}
	}

	let gridBorders = Object.keys(grid)
			.map((k) => exitingEdges([0, 1, 2, 3, 4, 5], grid[k], grid).map((edge) => [k, edge]))
			.reduce((a, b) => a.concat(b))
			.reduce((o, v) => {
				o[v[0]] = o[v[0]] || [];
				o[v[0]].push(v[1]);
				return o;
			}, {});

	let entryPoints = [];
	let exits = [];
	for(let i = 0; i < numFlows; i++) {
		let {entryPoint, exit, length} = addTubes(grid, gridBorders);
		entryPoints.push(entryPoint);
		exits.push(exit);
		console.log(length);
	}
	return {grid: detectFlow(grid, numFlows, entryPoints, exits), entryPoints: entryPoints, exits: exits};
};

const H = 1;
const W = 2;
const F = 2;

let initialState = {
	width: W,
	height: H,
	numFlows: F,
	...makeGrid(W, H, F),
	updated: 0
};

export default function(state = initialState, action) {
	let gridPiece = {...state.grid[action.index], rotation: action.degs};
	switch(action.type) {
		case "ROTATE_GRID_PIECE":
			return {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}};
		case "RELEASE_GRID_PIECE":
			let newState = {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}, updated: new Date().getTime()};
			newState.grid = detectFlow(newState.grid, state.numFlows, state.entryPoints, state.exits);
			return newState;
		default:
			return state;
	}
}