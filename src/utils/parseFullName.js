const parseFullName = (fullName) => {
  if (!fullName) {
    return null;
  }

  const fullNameArray = fullName.split(' ').filter((namePart) => !!namePart.trim());

  const [
    firstName,
    ...restNameArray
  ] = fullNameArray;

  let lastName;
  let middleNames;

  if (restNameArray.length) {
    let middleNamesArrayReversed;
    // f%$# splice!
    [lastName, ...middleNamesArrayReversed] = restNameArray.reverse();

    if (middleNamesArrayReversed.length) {
      middleNames = middleNamesArrayReversed.reverse().join(' ');
    }
  }

  return {
    firstName,
    middleNames,
    lastName,
  };
};

export default parseFullName;
