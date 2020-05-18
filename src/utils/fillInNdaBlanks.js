const fillInNdaBlanks = (blanks, variables) => {
  const values = {};

  if (blanks) {
    Object.keys(blanks).forEach((blank) => {
      const { variable, placeholder } = blanks[blank];

      values[blank] = placeholder || '';

      if (variable && variables[variable]) {
        values[blank] = variables[variable];
      }
    });
  }

  return values;
};

export default fillInNdaBlanks;
