import translate from "../v11/translate";
import organization from "../v11/organization";

export default {
  ROOT: state => ({
    ...state,
    intl: translate(state.intl),
    organization: organization(state.organization)
  }),
}