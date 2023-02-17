module.exports = {
  int: (input) => {
    if (input === null || undefined) return null;
    return +input.replace(/\D/g, '');
  },
  string: (input) => (input ? input.toString() : 'null'),
  bool: (input) => {
    if (input === '') return false;
    return !!input;
  },
};