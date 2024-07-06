import {
  UPCOMING_MATCH,
  LIVE_MATCH,
  MATCH_INFO,
  RECENT_MATCH,
  SERIES_LIST,
  HOME_LIST,
  PLAYER_RANKING,

  // Player Information API POST
  FETCH_PLAYER_INFO_REQUEST,
  FETCH_PLAYER_INFO_SUCCESS,
  FETCH_PLAYER_INFO_FAILURE,
} from "../actionTypes";

const INIT_STATE = {
  upcoming_match_datas: [],
  live_match_datas: [],
  match_info_data: [],
  recent_match_datas: [],
  series_list: [],
  home_list: [],
  player_ranking: null,

  data: null,
  loading: false,
  error: null,
};

const CricketReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPCOMING_MATCH:
      return { ...state, upcoming_match_datas: action.payload };
    case LIVE_MATCH:
      return { ...state, live_match_datas: action.payload };
    case MATCH_INFO:
      return { ...state, match_info_data: action.payload };
    case RECENT_MATCH:
      return { ...state, recent_match_datas: action.payload };
    case SERIES_LIST:
      return { ...state, series_list: action.payload };
    case HOME_LIST:
      return { ...state, home_list: action.payload };
    case PLAYER_RANKING:
      return { ...state, player_ranking: action.payload };

    // Player Infomation Api POST
    case FETCH_PLAYER_INFO_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PLAYER_INFO_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_PLAYER_INFO_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

export default CricketReducer;
