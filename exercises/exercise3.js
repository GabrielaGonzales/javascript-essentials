function detectType(token) {
  if (token === "true" || token === "false") return Boolean(token === "true");
  if (token === "NaN") return NaN;
  if (token === "Infinity" || token === "-Infinity") return Number(token);
  if (/^-?\d+n$/.test(token)) return BigInt(token.slice(0, -1));
  if (!isNaN(Number(token))) return Number(token);
  return token;
}

function interpreter(input) {
  const tokens = input.split(" ");
  const summary = {
    bigint: 0,
    "positive integer": 0,
    "negative integer": 0,
    "positive decimal": 0,
    "negative decimal": 0,
    NaN: 0,
    Infinity: 0,
    boolean: 0,
    string: 0,
  };

  for (const token of tokens) {
    const value = detectType(token);
    const valueType = typeof value;

    if (valueType === "bigint") {
      console.log("BigInt:", value);
      summary["bigint"]++;

    } else if (valueType === "number") {
      if (Number.isNaN(value)) {
        console.log("NaN:", token);
        summary["NaN"]++;
      } else if (value === Infinity || value === -Infinity) {
        console.log("Infinity:", value);
        summary["Infinity"]++;
      } else if (value % 1 === 0) {
        const label = value >= 0 ? "positive integer" : "negative integer";
        console.log(`${label}:`, value);
        summary[label]++;
      } else {
        const label = value > 0 ? "positive decimal" : "negative decimal";
        console.log(`${label}:`, value);
        summary[label]++;
      }

    } else if (valueType === "boolean") {
      console.log("boolean:", value);
      summary["boolean"]++;

    } else {
      console.log("string:", value);
      summary["string"]++;
    }
  }

  console.log("\n--- Summary ---");
  for (const [type, count] of Object.entries(summary)) {
    if (count > 0) console.log(`${type}: ${count}`);
  }
}

//interpreter("42 -3.14 true hello 100n NaN Infinity -7 false world 0.5");
interpreter("The international auction at Hall 4 opened at 0930 AM featuring a rare tech artifact with a starting bid of $1500, and within just 12 minutes, 3 aggressive bidders from 2 different countries drove the price up by 45.8% to finally close the deal at an incredible $2187.50. The automated database system immediately processed the transaction, setting the payment cleared status to true in 0.005 seconds and marking the shipping waiver to false because the item weighed over 10.5 kilograms. A secondary verification system checked if the buyer was an overseas collector, which returned a value of true, automatically triggering a 1.5% international handling fee alongside 8 standard domestic surcharges. Ultimately, after deducting the 0.25 entry tax and 6 separate bank processing costs, the auction house walked away with a clean net profit of $328.25 from that single hectic session.");
