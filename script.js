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

const getFromRegister = (customerCash) => {
  const currencyType = cid
    .find((el) => el[value] <= customerCash - price && el[amount]);

  let amountTaken = 0;
  while (currencyType[value] <= customerCash - price && currencyType[amount]) {
    customerCash -= currencyType[value];
    currencyType[amount] -= currencyType[value];
    amountTaken += currencyType[value];
  }
  if (customerCash)
    return `${currencyType[str]}: \$${amountTaken}\n${getFromRegister(customerCash)}`;
  return `${currencyType[str]}: \$${amountTaken}`;
};

const clickPurchaseButton = () => {
  const customerCash = Number(cash.value);

  if (customerCash >= price) {
    if (customerCash === price)
      changeDue.innerText = "No change due - customer paid with exact cash";
    else if (hasEnoughCash(customerCash - price)) {
      changeDue.innerText = `Status: ${getFromRegister(customerCash)}`;
    } else changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  } else alert("Customer does not have enough money to purchase the item");
  cash.value = "";
};

cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") clickPurchaseButton();
});

purchaseBtn.addEventListener("click", clickPurchaseButton);
