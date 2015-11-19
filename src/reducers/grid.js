import {detectFlow} from "../api";
import games from "../games";

let initialState = {
	...games[0],
	gameIdx: 0,
	updated: 0
};

export default function(state = initialState, action) {
	let gridPiece = {...state.grid[action.index], rotation: action.degs};
	switch(action.type) {
		case "ROTATE_GRID_PIECE":
			return {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}};
		case "RELEASE_GRID_PIECE":
			let newState = {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}, updated: new Date().getTime()};
			let {grid, finished} = detectFlow(newState.grid, state.numFlows, state.entryPoints, state.exits);
			newState.grid = grid;
			newState.finished = finished;
			return newState;
		case "NEXT_GAME":
			return {...games[state.gameIdx + 1], gameIdx: state.gameIdx + 1, updated: 0, finished: false};
		default:
			return state;
	}
}