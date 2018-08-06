import types from "./actionTypes";

export const createSkillAction = data => ({
    type: types.CREATE_SKILL,
    payload: {
        data
    }
});

export const createProductAction = data => ({
    type: types.CREATE_PRODUCT,
    payload: {
        data
    }
})