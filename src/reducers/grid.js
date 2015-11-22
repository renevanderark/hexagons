import {detectFlow} from "../api";
import games from "../games";

let initialState = localStorage.getItem("saved-state") ? JSON.parse(localStorage.getItem("saved-state"))  : {
	...games[0],
	levels: games.length,
	gameIdx: 0,
	updated: 0,
	scores: [],
	scale: 1.0
};

export default function(state = initialState, action) {
	let gridPiece = {...state.grid[action.index], rotation: action.degs};
	switch(action.type) {
		case "ROTATE_GRID_PIECE":
			return {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}};
		case "RELEASE_GRID_PIECE":
			let newState = {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}, updated: new Date().getTime()};
			let {grid, finished, scores} = detectFlow(newState.grid, state.numFlows, state.entryPoints, state.exits);
			newState.grid = grid;
			newState.finished = finished;
			newState.scores = scores;
			return newState;
		case "NEXT_GAME":
			return {...games[state.gameIdx + 1], gameIdx: state.gameIdx + 1, updated: 0, finished: false, levels: games.length, scale: state.scale};
		case "RESET":
			return {...games[0], gameIdx: 0, updated: 0, finished: false, levels: games.length, scale: state.scale};
		case "ZOOM_BY":
			return {...state, scale: state.scale * (action.pinchDelta < 0 ? 1.085 : 0.985)};
		default:
			return state;
	}
}