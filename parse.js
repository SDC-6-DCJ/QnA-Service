/* eslint-disable no-param-reassign */
module.exports = {
  int: (input) => {
    if (input === null || undefined) return null;
    input = input.replace(/\D/g, '');
    return +input;
  },
  string: (input) => (input ? input.toString() : 'null'),
  bool: (input) => {
    if (input === '') return false;
    if (input === '0') return false;
    if (input === '1') return true;
    return !!input;
  },
};
