const randomTubes = () => {
	let amount = Math.floor(Math.random() * 3) + 1;
	let taken = [];
	let tubes = [];
	for(let i = 0; i < amount; i++) {
		let from, to;
		while (taken.indexOf(from = Math.floor(Math.random() * 6)) > -1) { }
		taken.push(from);
		while (taken.indexOf(to = Math.floor(Math.random() * 6)) > -1) { }
		taken.push(to);
		tubes.push({from: from, to: to});
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


let initialState = {
	width: 4,
	height: 4,
	grid: makeGrid(4, 4)
};

export default function(state = initialState, action) {
	switch(action.type) {
		case "ROTATE_GRID_PIECE":
			return {...state, grid: {...state.grid, ...{[action.index]: {...state.grid[action.index], rotation: action.degs}}}};
		default:
			return state;
	}
}