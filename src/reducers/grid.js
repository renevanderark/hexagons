import {detectFlow} from "../api";

const games = JSON.parse(document.getElementById("6x6-6").innerHTML);

let initialState = localStorage.getItem("saved-state") ? JSON.parse(localStorage.getItem("saved-state")) : {
	...games[0],
	levels: games.length,
	gameIdx: 0,
	updated: 0,
	scores: [],
	scale: 1.0,
	startTime: new Date().getTime()
};

if(!initialState.scale) { initialState.scale = 1.0; }
if(!initialState.startTime) { initialState.startTime = new Date().getTime(); }

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
			return {
				...games[state.gameIdx + 1],
				gameIdx: state.gameIdx + 1,
				updated: 0, finished: false,
				levels: games.length,
				scale: state.scale,
				startTime: new Date().getTime()
			};
		case "RESET":
			return {
				...games[0],
				gameIdx: 0,
				updated: 0,
				finished: false,
				levels: games.length,
				scale: state.scale,
				startTime: new Date().getTime()
			};
		default:
			return state;
	}
}
