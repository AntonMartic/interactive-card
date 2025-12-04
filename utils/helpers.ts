import { DropDownData } from "../components/DropDown";

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
