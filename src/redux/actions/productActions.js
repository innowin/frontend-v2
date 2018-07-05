import types, {REQUEST} from "./actionTypes";

export const addContributionAction = data => ({
    type: types.ADD_CONTRIBUTION + REQUEST,
    data
});
