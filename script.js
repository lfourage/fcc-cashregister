const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const currency = 0;
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

const hasEnoughCash = (difference) => {
    console.log(cid.reduce((prev, curr) => prev[amount] + curr[amount], 0));
    return difference <= cid.reduce((prev, curr) => prev[amount] + curr[amount], 0);
};

const getFromRegister = (customerCash) => {
  const currencyType = cid
    .reverse()
    .find((el) => el[value] >= customerCash && el[amount] > 0);

  return "test";
};

const clickPurchaseButton = () => {
  const customerCash = Number(cash.value);

  if (customerCash >= price) {
    if (customerCash === price)
      changeDue.innerText = "No change due - customer paid with exact cash";
    else if (hasEnoughCash(customerCash - price)){
      changeDue.innerText = `Status: ${getFromRegister(customerCash)}`;
    } else changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  } else alert("Customer does not have enough money to purchase the item");
  cash.value = "";
};

cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") clickPurchaseButton();
});

purchaseBtn.addEventListener("click", clickPurchaseButton);
