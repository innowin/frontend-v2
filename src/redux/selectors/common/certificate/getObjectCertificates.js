import {createSelector} from "reselect";



// this function filters the certificates by 'certificate_parent' field.

const getCertByParentId = (state, parentId) => {
    const certificates = state.common.certificate.list
    return Object.values(certificates).filter(cert => cert.certificate_parent === +parentId)
}

/**
 this function makes a copy of selector.
 we using this trick to prevent from recomputing when passing props to a selector.
 (according to documentation)
 **/
const makeCertSelectorByParentId = () => createSelector(getCertByParentId, list => list || {})

export default makeCertSelectorByParentId