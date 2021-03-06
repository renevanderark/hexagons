import {detectFlow} from "../api";

const levelCap = parseInt(localStorage.getItem("level-cap") || 100);
let initialState = localStorage.getItem("saved-state") ? JSON.parse(localStorage.getItem("saved-state")) : {
	...game,
	levels: levelCap,
	updated: 0,
	scores: [],
	scale: 1.0,
	levelPack: null,
	startTime: new Date().getTime()
};

if(!initialState.scale) { initialState.scale = 1.0; }

initialState = {...initialState, levelPack: location.href.replace(/^.*\/(.+)\..+\.html/, "$1") };
initialState.startTime = new Date().getTime();
initialState.gameIdx = parseInt(location.href.replace(/^.*\/.+\.(.+)\.html/, "$1"));
initialState = {...initialState, ...game};
initialState.levels = levelCap;

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
				updated: 0, finished: false, levelPack: state.levelPack,
				levels: levelCap,
				scale: state.scale,
				startTime: new Date().getTime()
			};

		case "RESET":
			return {
				grid: null,
				gameIdx: 0,
				updated: 0, finished: false, levelPack: null,
				levels: levelCap,
				scale: state.scale,
				startTime: new Date().getTime()
			};

		default:
			return state;
	}
}
