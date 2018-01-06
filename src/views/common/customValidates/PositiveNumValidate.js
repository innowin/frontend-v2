/*global __*/
export const positiveNumberValidate = (num, final) => {
    if (final === true) {
        if (num > 0) {
            return false
        }
        return __('Staff count must be positive')
    }
    return false
};
