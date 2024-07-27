export default function currencyConverter(price: string) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "HTG",
  });

  return USDollar.format(Number(price));
}
