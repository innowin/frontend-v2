import {createSelector} from "reselect";


const getNowCreatedSkillId = state => state.skill.nowCreatedId

const nowCreatedSkillIdSelector = createSelector(getNowCreatedSkillId, id => id)

export default nowCreatedSkillIdSelector