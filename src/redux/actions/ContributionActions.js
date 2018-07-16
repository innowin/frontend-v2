import types from "./actionTypes";

export const createSkillAction = data => ({
    type: types.CREATE_SKILL,
    data
});

export const createProductAction = data => ({
    type: types.CREATE_PRODUCT,
    data
})