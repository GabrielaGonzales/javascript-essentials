// Exercises 1 and 2

function interpreter(input) {
  var valueType = typeof input;

  if (valueType === 'bigint') {
    console.log("BigInt:", input);
  } else if (valueType === 'number') {
    if (numberCases(input)) return;

    if (input % 1 === 0) {
      console.log(input >= 0 ? "positive integer:" : "negative integer:", input);
    } else {
      console.log(input > 0 ? "positive decimal:" : "negative decimal:", input);
    }
  } else if (valueType === 'string') {
    let isNumber = parseInt(input);
    if (!isNaN(isNumber)) {
      console.log("Number extracted from the string:", isNumber);
    } else {
      console.log("Not a number, just string:", input);
    }
  } else if (valueType === 'boolean') {
    console.log(typeof input, input);
  } else {
    console.log('Not supported type:', input);
  }
}

function numberCases(input) {
  if (Number.isNaN(input)) {
    console.log("NaN:", input);
    return true;
  } else if (input === Infinity || input === -Infinity) {
    console.log("Infinity:", input);
    return true;
  }
  return false;
}

interpreter(42n);
interpreter(1);
interpreter(NaN);
interpreter(10/0);
interpreter(0/0);
interpreter(-5.1);
interpreter('holaa');
interpreter('12dfsd');
interpreter(true);
interpreter([]);


