import {
  fetchLiveMatches,
  fetchUpcomingMatches,
  fetchrecentMatches,
  fetchseriesList,
} from "../../Api/api";
import {
  UPCOMING_MATCH,
  RECENT_MATCH,
  LOADING,
  SERIES_LIST,
  LIVE_MATCH,
} from "../actionTypes";

//Upcoming Match
export const getUpcomingMatchData = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await fetchUpcomingMatches();
    dispatch({ type: UPCOMING_MATCH, payload: response?.data?.data });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    // console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};

// Live Match List
export const getLiveMatchList = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await fetchLiveMatches();
    dispatch({ type: LIVE_MATCH, payload: response?.data?.data });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    // console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};

// Recent Match List
export const getRecentMatchList = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await fetchrecentMatches();
    dispatch({ type: RECENT_MATCH, payload: response?.data?.data });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    // console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};

// Series List
export const getFetchSeriesList = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await fetchseriesList();
    dispatch({ type: SERIES_LIST, payload: response?.data?.data });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    // console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};
