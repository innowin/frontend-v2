/*global __*/
export const yearValidate = (year, final) => {
    if (final) {
        if (year > 1000 && year < 3000) {
            return false;
        }
    } else {// In handleChange
        if (year > 0 && year < 3000) {
            return false;
        }
    }
    return __('This number is not a correct year');
};
