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

  // discover statrs w/ 6011, 644-649, 65
  if (rawString.match(/^(6011|[64[4-9]|65)/)) return "discover";

  // jcb statrs w/ 3528–3589
  if (rawString.match(/^35(?:2[89]|[3-8][0-9])/)) return "jcb";

  // mastercard statrs w/ 2221–2720, 51–55
  if (rawString.match(/^(222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720|5[1-5])/))
    return "mastercard";

  // troy statrs w/ 9792
  if (rawString.match(/^9792/)) return "troy";

  // unionpay statrs w/ 62
  if (rawString.match(/^62/)) return "unionpay";

  // visa statrs w/ 4
  if (rawString.match(/^4/)) return "visa";

  return "visa"; // Fallback to visa
}

export function formatTextInput(cardNumber: string): string {
  const rawString = filterNonDigits(cardNumber);
  const cardIssuer = getCardIssuer(rawString);

  let numberFormat: number[] = [4, 4, 4, 4];

  if (cardIssuer === "amex") {
    numberFormat = [4, 6, 5];
  } else if (cardIssuer === "dinersclub") {
    numberFormat = [4, 6, 4];
  }

  let formattedString = "";
  let digitIndex = 0;

  for (const chunkLength of numberFormat) {
    const start = digitIndex;
    const end = digitIndex + chunkLength;
    const chunk = rawString.substring(start, end);

    if (chunk.length > 0) {
      formattedString += chunk;
      digitIndex += chunk.length;
    }

    const isFullChunk = chunk.length === chunkLength;
    const hasMoreDigits = digitIndex < rawString.length;

    if (isFullChunk && hasMoreDigits) {
      formattedString += " ";
    }

    if (digitIndex >= rawString.length) {
      break;
    }
  }

  return formattedString.trim();
}
