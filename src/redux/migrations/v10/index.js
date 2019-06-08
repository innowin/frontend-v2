import translate from "../v10/translate";
import organization from "../v10/organization";

export default {
  ROOT: state => ({
    ...state,
    intl: translate(state.intl),
    organization: organization(state.organization)
  }),
}