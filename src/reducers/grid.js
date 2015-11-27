import {detectFlow} from "../api";

const levelCap = 10;
let initialState = localStorage.getItem("saved-state") ? JSON.parse(localStorage.getItem("saved-state")) : {
	...game,
	levels: levelCap,
	gameIdx: 0,
	updated: 0,
	scores: [],
	scale: 1.0,
	startTime: new Date().getTime()
};

if(!initialState.scale) { initialState.scale = 1.0; }
if(!initialState.startTime) { initialState.startTime = new Date().getTime(); }
if(!initialState.grid) { initialState = {...initialState, ...game}; }
export default function(state = initialState, action) {
	let gridPiece;
	switch(action.type) {
		case "ROTATE_GRID_PIECE":
			gridPiece = {...state.grid[action.index], rotation: action.degs};
			return {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}};
		case "RELEASE_GRID_PIECE":
			gridPiece = {...state.grid[action.index], rotation: action.degs};
			let newState = {...state, grid: {...state.grid, ...{[action.index]: gridPiece}}, updated: new Date().getTime()};
			let {grid, finished, scores} = detectFlow(newState.grid, state.numFlows, state.entryPoints, state.exits);
			newState.grid = grid;
			newState.finished = finished;
			newState.scores = scores;
			return newState;
		case "SOLVE":
			return {
				...state,
				finished: true
			};

		case "NEXT_GAME":
			return {
				grid: null,
				gameIdx: state.gameIdx + 1,
				updated: 0, finished: false,
				levels: levelCap,
				scale: state.scale,
				startTime: new Date().getTime()
			};

		case "RESET":
			return {
				grid: null,
				gameIdx: 0,
				updated: 0,
				finished: false,
				levels: levelCap,
				scale: state.scale,
				startTime: new Date().getTime()
			};

		default:
			return state;
	}
}
