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
		tubes.push({from: fr, to: to});
	}

	return tubes;
};


const makeGrid = (w, h) => {
	let grid = {};
	for(let x = 0, i = 0; x < w; x++) {
		for(let y = 0; y < h; y++, i++) {
			grid[i] = {x: x, y: y, rotation: 0, tubes: randomTubes()};
		}
	}
	return grid;
};

const absRotation = (degs) => 6 - ((degs < 0 ? 360 + degs : degs) / 60);
const absConnector = (absRot) => absRot > 5 ? absRot - 6 : absRot;
const connectsAt = (num) => absConnector(num + 3);

const neighboursFor = (p, grid) =>
	[[-1, -1 + (p.x % 2)], [0, -1], [1, -1 + (p.x % 2)], [1, (p.x % 2)], [0, 1], [-1, (p.x % 2)]]
		.map((ar, i) => [ar[0] + p.x, ar[1] + p.y, i])
		.map((d) => [
			d[2],
			Object.keys(grid).filter((k) => grid[k].x === d[0] && grid[k].y === d[1])[0] || null,
			connectsAt(d[2])
		]).filter((k) => k[1] !== null);

const findTube = (p, idx) =>
	p.tubes.filter((t) => (t.from === idx || t.to === idx))[0];

const getConnections = (p, grid) =>
	neighboursFor(p, grid)
		.map((n) => [absConnector(n[0] + absRotation(p.rotation)), n[1], absConnector(n[2] + absRotation(grid[n[1]].rotation))])
		.map((n) => [{tube: findTube(p, n[0])}, {tube: findTube(grid[n[1]], n[2]), key: n[1]}])
		.filter((c) => c[0].tube && c[1].tube);

let initialState = {
	width: 4,
	height: 4,
	grid: makeGrid(4, 4)
};

export default function(state = initialState, action) {
	let gridPiece = {...state.grid[action.index], rotation: action.degs};
	switch(action.type) {
		case "ROTATE_GRID_PIECE":
			return {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}};
		case "RELEASE_GRID_PIECE":
			let newState = {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}};
			console.log(getConnections(gridPiece, newState.grid));
			return newState;
		default:
			return state;
	}
}