const randomTubes = () => {
	let amount = Math.floor(Math.random() * 3) + 1;
	let taken = [];
	let tubes = [];
	for(let i = 0; i < amount; i++) {
		let fr, to;
		while (taken.indexOf(fr = Math.floor(Math.random() * 6)) > -1) { }
		taken.push(fr);
		while (taken.indexOf(to = Math.floor(Math.random() * 6)) > -1) { }
		taken.push(to);
		tubes.push({from: fr, to: to, hasFlow: 0});
	}

	return tubes;
};


const makeGrid = (w, h) => {
	let grid = {};
	for(let x = 0, i = 0; x < w; x++) {
		for(let y = 0; y < h; y++, i++) {
			grid[i] = {x: x, y: y, rotation: 360, tubes: randomTubes()};
		}
	}
	return grid;
};

// Convert rotation to current index of top left edge
const absRotation = (degs) => 6 - ((degs < 0 ? 360 + degs : degs) / 60);

// Convert rotated index of given edge back to real index
const absConnector = (absRot) => absRot > 5 ? absRot - 6 : absRot;

const normConn = (abscon) => abscon < 0 ? 6 + abscon : abscon;

// Returns the corresponding edge of a neighbour to given edge index
const connectsAt = (num) => absConnector(num + 3);

// Find the tube of gridpiece p at a given edge index idx
const findTube = (p, idx) =>
	p.tubes
		.map((t, i) => [i, t])
		.filter((t) => (t[1].from === idx || t[1].to === idx))[0];

const getNeighbourDims = (p, outlet) =>
	[[-1, -1 + (p.x % 2)], [0, -1], [1, -1 + (p.x % 2)], [1, (p.x % 2)], [0, 1], [-1, (p.x % 2)]]
	.map((ar) => [ar[0] + p.x, ar[1] + p.y])[outlet];

const getGridPieceAt = (d, grid) =>
	Object.keys(grid).filter((k) => grid[k].x === d[0] && grid[k].y === d[1])[0] || null;


const detectFlow = (grid, numFlows) => {
	for(let k in grid) {
		grid[k].tubes = grid[k].tubes.map((t) => {return {from: t.from, to: t.to, hasFlow: 0}; });
	}

	for(let flowIdx = 1; flowIdx <= numFlows; flowIdx++) {
		let current = "" + (flowIdx - 1);
		let entryPoint = 0;
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

let initialState = {
	width: 10,
	height: 10,
	numFlows: 3,
	grid: detectFlow(makeGrid(10, 10), 3),
	updated: 0
};

export default function(state = initialState, action) {
	let gridPiece = {...state.grid[action.index], rotation: action.degs};
	switch(action.type) {
		case "ROTATE_GRID_PIECE":
			return {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}};
		case "RELEASE_GRID_PIECE":
			let newState = {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}, updated: new Date().getTime()};
			newState.grid = detectFlow(newState.grid, state.numFlows);
			return newState;
		default:
			return state;
	}
}