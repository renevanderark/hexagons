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
// @param absRot = output of absRotation + actual edge index OR output of connectsAt
const absConnector = (absRot) => absRot > 5 ? absRot - 6 : absRot;

const normConn = (abscon) => abscon < 0 ? 6 + abscon : abscon;

// Returns the corresponding edge of a neighbour to given edge index
const connectsAt = (num) => absConnector(num + 3);

// Detect the neighbours for gridpiece p
const neighboursFor = (p, grid) =>
	[[-1, -1 + (p.x % 2)], [0, -1], [1, -1 + (p.x % 2)], [1, (p.x % 2)], [0, 1], [-1, (p.x % 2)]]
		.map((ar, i) => [ar[0] + p.x, ar[1] + p.y, i])
		.map((d) => [
			d[2],
			Object.keys(grid).filter((k) => grid[k].x === d[0] && grid[k].y === d[1])[0] || null,
			connectsAt(d[2])
		]).filter((k) => k[1] !== null);

// Find the tube of gridpiece p at a given edge index idx
const findTube = (p, idx) =>
	p.tubes
		.map((t, i) => [i, t])
		.filter((t) => (t[1].from === idx || t[1].to === idx))[0];

// Get the connecting tubes for gridpiece p from the neighbours of gridpiece p
const getConnections = (p, grid) =>
	neighboursFor(p, grid)
		.map((n) => [absConnector(n[0] + absRotation(p.rotation)), n[1], absConnector(n[2] + absRotation(grid[n[1]].rotation))])
		.map((n) => [{tube: findTube(p, n[0])}, {tube: findTube(grid[n[1]], n[2]), key: n[1]}])
		.filter((c) => c[0].tube && c[1].tube);

const getNeighbourDims = (p, outlet) =>
	[[-1, -1 + (p.x % 2)], [0, -1], [1, -1 + (p.x % 2)], [1, (p.x % 2)], [0, 1], [-1, (p.x % 2)]]
	.map((ar) => [ar[0] + p.x, ar[1] + p.y])[outlet];

const getGridPieceAt = (d, grid) =>
	Object.keys(grid).filter((k) => grid[k].x === d[0] && grid[k].y === d[1])[0] || null;


//const findConnectingTube = (p, entryPoint, grid) =>
//	getConnections(p, grid).filter((c) => c[1].tube.from === tub )

const detectFlow = (grid) => {
	for(let k in grid) {
		grid[k].tubes = grid[k].tubes.map((t) => {return {from: t.from, to: t.to, hasFlow: 0}; });
	}

	let current = "0";
	let abscon = absConnector(absRotation(grid[current].rotation));
	let itsTube = findTube(grid[current], abscon);
	if(itsTube) {
		grid[current].tubes[itsTube[0]].hasFlow = 1;
		let outlet = normConn(absConnector((abscon === itsTube[1].from ? itsTube[1].to : itsTube[1].from) - abscon));
		let entryPoint = connectsAt(outlet);
		let connectingNeighbour = getGridPieceAt(getNeighbourDims(grid[current], outlet), grid);

		console.log("outlet: " + outlet, "entryPoint: " + entryPoint);
		console.log("neighbour at outlet: " + connectingNeighbour, grid[connectingNeighbour]);
		if(connectingNeighbour) {
			console.log(absConnector(absRotation(grid[connectingNeighbour].rotation)));
			console.log(absConnector(entryPoint + absConnector(absRotation(grid[connectingNeighbour].rotation))));
			let neighbourTube = findTube(grid[connectingNeighbour], absConnector(entryPoint + absConnector(absRotation(grid[connectingNeighbour].rotation))));
			console.log(neighbourTube);
			if(neighbourTube) {
				grid[connectingNeighbour].tubes[neighbourTube[0]].hasFlow = 1;
			}
		}
	}
	return grid;
};

let initialState = {
	width: 4,
	height: 4,
	grid: detectFlow(makeGrid(4, 4))
};

export default function(state = initialState, action) {
	let gridPiece = {...state.grid[action.index], rotation: action.degs};
	switch(action.type) {
		case "ROTATE_GRID_PIECE":
			return {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}};
		case "RELEASE_GRID_PIECE":
			let newState = {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}};
			newState.grid = detectFlow(newState.grid);
			return newState;
		default:
			return state;
	}
}