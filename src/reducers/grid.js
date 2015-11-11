const getNeighbourDims = (p, outlet) =>
	[[-1, -1 + (p.x % 2)], [0, -1], [1, -1 + (p.x % 2)], [1, (p.x % 2)], [0, 1], [-1, (p.x % 2)]]
	.map((ar) => [ar[0] + p.x, ar[1] + p.y])[outlet];


const getGridPieceAt = (d, grid) =>
	Object.keys(grid).filter((k) => grid[k].x === d[0] && grid[k].y === d[1])[0] || null;

// Convert rotated index of given edge back to real index
const absConnector = (absRot) => absRot > 5 ? absRot - 6 : absRot;

// Returns the corresponding edge of a neighbour to given edge index
const connectsAt = (num) => absConnector(num + 3);


const makeTube = (entryPoint, p, grid) => {
	let available = [0, 1, 2, 3, 4, 5]
		.filter((idx) => idx !== entryPoint)
		.filter((idx) => p.tubes.filter((t) => t.from === idx || t.to === idx).length === 0);

	let connectors = available
		.filter((idx) => getGridPieceAt(getNeighbourDims(p, idx), grid));

	let exits = available
		.filter((idx) => !getGridPieceAt(getNeighbourDims(p, idx), grid));

	if(connectors.length === 0 && exits.length === 0) { return false; }
	return {
		from: entryPoint,
		to: connectors.length ?
			connectors[Math.floor(Math.random() * connectors.length)] :
			exits[Math.floor(Math.random() * exits.length)],
		hasFlow: 0
	};
};

const addTubes = (grid, start) => {
	let entryPoint = 1;
	let length = 0;
	let current = "" + start;
	let newTube, last;
	while(current) {
		length++;
		newTube = makeTube(entryPoint, grid[current], grid);
		if(newTube) {
			grid[current].tubes.push(newTube);
			entryPoint = connectsAt(newTube.to);
			last = current;
			current = getGridPieceAt(getNeighbourDims(grid[current], newTube.to), grid);
		} else {
			throw new Error("complete failure");
		}
	}

	return [last, newTube.to, length];
};


const makeGrid = (w, h, numFlows = 1) => {
	let grid = {};
	for(let x = 0, i = 0; x < w; x++) {
		for(let y = 0; y < h; y++, i++) {
			grid[i] = {x: x, y: y, rotation: 360, tubes: []};
		}
	}

	for(let i = 0; i < numFlows; i++) {
		console.log(i, addTubes(grid, i * h));
	}
	return grid;
};

// Convert rotation to current index of top left edge
const absRotation = (degs) => 6 - ((degs < 0 ? 360 + degs : degs) / 60);

const normConn = (abscon) => abscon < 0 ? 6 + abscon : abscon;


// Find the tube of gridpiece p at a given edge index idx
const findTube = (p, idx) =>
	p.tubes
		.map((t, i) => [i, t])
		.filter((t) => (t[1].from === idx || t[1].to === idx))[0];

const detectFlow = (grid, numFlows, h) => {
	for(let k in grid) {
		grid[k].tubes = grid[k].tubes.map((t) => {return {from: t.from, to: t.to, hasFlow: 0}; });
	}

	for(let flowIdx = 1; flowIdx <= numFlows; flowIdx++) {
		let current = "" + ((flowIdx-1) * h);
		let entryPoint = 1;
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

const H = 3;
const W = 3;
const F = 2;

let initialState = {
	width: W,
	height: H,
	numFlows: F,
	grid: detectFlow(makeGrid(W, H, F), F, H),
	updated: 0
};

export default function(state = initialState, action) {
	let gridPiece = {...state.grid[action.index], rotation: action.degs};
	switch(action.type) {
		case "ROTATE_GRID_PIECE":
			return {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}};
		case "RELEASE_GRID_PIECE":
			let newState = {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}, updated: new Date().getTime()};
			newState.grid = detectFlow(newState.grid, state.numFlows, state.height);
			return newState;
		default:
			return state;
	}
}