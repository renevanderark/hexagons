import {makeGrid, detectFlow} from "../api";

const H = 3;
const W = 3;
const F = 3;

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