import { DropDownData } from "../components/DropDown";

export type CardIssuers =
  | "amex"
  | "dinersclub"
  | "discover"
  | "jcb"
  | "mastercard"
  | "troy"
  | "unionpay"
  | "visa";

export function getMonths(): DropDownData[] {
  const monthsData = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return { label: month, value: month };
  });
  const placeholder = { label: "Month", value: "" };
  return [placeholder, ...monthsData];
}

export function getYears(): DropDownData[] {
  const currentYear = new Date().getFullYear();
  const yearsData = Array.from({ length: 12 }, (_, i) => {
    const year = (currentYear + i).toString();
    return { label: year, value: year.slice(2) };
  });
  const placeholder = { label: "Year", value: "" };
  return [placeholder, ...yearsData];
}

export function filterNonDigits(text: string): string {
  return text.replace(/\D/g, "");
}

export function getCardIssuer(cardNumber: string): CardIssuers {
  const rawString = cardNumber.replace(/\s/g, "");

  // amex starts w/ 34, 37
  if (rawString.match(/^3[47]/)) return "amex";

  // dinersclub starts w/ 30, 36, 38, 39
  if (rawString.match(/^3(?:0|6|8|9)/)) return "dinersclub";

  // jcb statrs w/ 3528–3589
  if (rawString.match(/^35(?:2[89]|[3-8][0-9])/)) return "jcb";

  // mastercard statrs w/ 2221–2720, 51–55
  if (rawString.match(/^(222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720|5[1-5])/))
    return "mastercard";

  // discover statrs w/ 6011, 644-649, 65
  if (rawString.match(/^(6011|65|64[4-9])/)) return "discover";

  // troy statrs w/ 9792
  if (rawString.match(/^9792/)) return "troy";

  // unionpay statrs w/ 62
  if (rawString.match(/^62/)) return "unionpay";

  // visa statrs w/ 4
  if (rawString.match(/^4/)) return "visa";

  return "visa"; // Fallback to visa
}

function getCardPattern(issuer: CardIssuers): number[] {
  if (issuer === "amex") {
    return [4, 6, 5]; // 17 l
  }
  if (issuer === "dinersclub") {
    return [4, 6, 4]; // 16 l
  }
  return [4, 4, 4, 4];
}

function _applyFormattingPattern(
  inputString: string,
  pattern: number[],
  maxTotalLength: number
): string {
  let formattedString = "";
  let digitIndex = 0;

  for (let i = 0; i < pattern.length; i++) {
    const chunkLength = pattern[i];
    const start = digitIndex;
    const end = start + chunkLength;
    const chunk = inputString.substring(start, end);

    if (chunk.length > 0) {
      formattedString += chunk;
      digitIndex += chunk.length;
    }

    const isLastChunk = i === pattern.length - 1;

    if (!isLastChunk && digitIndex < maxTotalLength) {
      formattedString += " ";
    }

    if (digitIndex >= inputString.length || digitIndex >= maxTotalLength) {
      break;
    }
  }

  return formattedString.trim();
}

export function formatTextInput(cardNumber: string): string {
  const rawString = filterNonDigits(cardNumber);
  const issuer = getCardIssuer(rawString);
  const pattern = getCardPattern(issuer);
  const maxDigits = pattern.reduce((sum, length) => sum + length, 0);

  return _applyFormattingPattern(rawString, pattern, maxDigits);
}

export function formatCardDisplay(cardNumber: string): string {
  const rawDigits = filterNonDigits(cardNumber);
  const issuer = getCardIssuer(rawDigits);
  const pattern = getCardPattern(issuer);
  const maxDigits = pattern.reduce((sum, length) => sum + length, 0);
  const maskedDigits = rawDigits.padEnd(maxDigits, "#").substring(0, maxDigits);

  return _applyFormattingPattern(maskedDigits, pattern, maxDigits);
}
