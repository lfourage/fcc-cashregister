const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const str = 0;
const amount = 1;
const value = 2;

let price = 1.87;
let cid = [
  ["PENNY", 1.01, 0.01],
  ["NICKEL", 2.05, 0.05],
  ["DIME", 3.1, 0.1],
  ["QUARTER", 4.25, 0.25],
  ["ONE", 90, 1],
  ["FIVE", 55, 5],
  ["TEN", 20, 10],
  ["TWENTY", 60, 20],
  ["ONE HUNDRED", 100, 100],
];
cid.reverse();

const hasEnoughCash = (difference) => {
  let sumOfAmounts = 0;

  for (let i = 0; i < cid.length - 1; i++) {
    sumOfAmounts += cid[i][amount] + cid[i + 1][amount];
  }

  return difference <= sumOfAmounts;
};

const isRegisterEmpty = () => !(cid.some((el) => el[amount]));

const getFromRegister = (changeToPay) => {
  const currencyType = cid
    .find((el) => el[value] <= changeToPay && el[amount]);

  let amountTaken = 0;

  while (currencyType[value] <= changeToPay && currencyType[amount]) {
    changeToPay = parseFloat((changeToPay - currencyType[value]).toFixed(2));
    currencyType[amount] = parseFloat((currencyType[amount] - currencyType[value]).toFixed(2));
    amountTaken = parseFloat((amountTaken +currencyType[value]).toFixed(2));
  }
  if (changeToPay)
    return `${currencyType[str]}: \$${amountTaken}\n${getFromRegister(changeToPay)}`;
  return `${currencyType[str]}: \$${amountTaken}`;
};

const clickPurchaseButton = () => {
  const customerCash = parseFloat(cash.value);

  if (customerCash >= price) {
    const changeToPay = parseFloat((customerCash - price).toFixed(2));
    if (customerCash === price)
      changeDue.innerText = "No change due - customer paid with exact cash";
    else if (hasEnoughCash(changeToPay)) {
      const taken = getFromRegister(changeToPay);
      const status = isRegisterEmpty() ? "CLOSED" : "OPEN";

      changeDue.innerText = `Status: ${status}\n${taken}`;
    } else changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  } else alert("Customer does not have enough money to purchase the item");
  cash.value = "";
};

cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") clickPurchaseButton();
});

purchaseBtn.addEventListener("click", clickPurchaseButton);
