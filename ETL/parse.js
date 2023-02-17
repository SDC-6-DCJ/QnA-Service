module.exports = {
  int: (input) => {
    if (input === null || undefined) return null;
    return +input.replace(/\D/g, '');
  },
  string: (input) => {
    const str = input ? input.toString() : 'null';
    return str;
    // if (str[0] === '"') return str;
    // return `"${str}"`;
  },
  bool: (input) => {
    if (input === '') return false;
    return !!input;
  },
};
