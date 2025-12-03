import { DropDownData } from "../components/DropDown";

export const cardBackgroundImages = [
  require("../assets/cards/1.jpeg"),
  require("../assets/cards/2.jpeg"),
  require("../assets/cards/3.jpeg"),
  require("../assets/cards/4.jpeg"),
  require("../assets/cards/5.jpeg"),
  require("../assets/cards/6.jpeg"),
  require("../assets/cards/7.jpeg"),
  require("../assets/cards/8.jpeg"),
  require("../assets/cards/9.jpeg"),
  require("../assets/cards/10.jpeg"),
  require("../assets/cards/11.jpeg"),
  require("../assets/cards/12.jpeg"),
  require("../assets/cards/13.jpeg"),
  require("../assets/cards/14.jpeg"),
  require("../assets/cards/15.jpeg"),
  require("../assets/cards/16.jpeg"),
  require("../assets/cards/17.jpeg"),
  require("../assets/cards/18.jpeg"),
  require("../assets/cards/19.jpeg"),
  require("../assets/cards/20.jpeg"),
  require("../assets/cards/21.jpeg"),
  require("../assets/cards/22.jpeg"),
  require("../assets/cards/23.jpeg"),
  require("../assets/cards/24.jpeg"),
  require("../assets/cards/25.jpeg"),
];

export function getMonths(): DropDownData[] {
  const monthsData = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return { label: month, value: month };
  });
  const placeholder = { label: "Month", value: "" };
  return [placeholder, ...monthsData];
}

export function getYears() {
  const currentYear = new Date().getFullYear();
  const yearsData = Array.from({ length: 12 }, (_, i) => {
    const year = (currentYear + i).toString();
    return { label: year, value: year };
  });
  const placeholder = { label: "Year", value: "" };
  return [placeholder, ...yearsData];
}
