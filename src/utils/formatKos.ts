const millionFormatter = new Intl.NumberFormat("nb-NO", {
  maximumFractionDigits: 2,
});

export function formatKos(amount: number): string {
  const roundedAmount = Math.floor(amount);

  if (roundedAmount < 1_000_000) {
    return roundedAmount.toString();
  }

  const millions = roundedAmount / 1_000_000;
  const unit = millions === 1 ? "million" : "millioner";

  return `${millionFormatter.format(millions)} ${unit}`;
}
