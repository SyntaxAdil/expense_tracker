function getId(id) {
  return document.getElementById(id);
}
const expenseName = getId("expense-name");
const expenseAmount = getId("expense-amount");
const expenseType = getId("expense-type");
const expenseResult = getId("expense-result");
const totalIncome = getId("total-income");
const totalExpense = getId("total-expense");
const totalBalance = getId("total-balance");

document.getElementById("expense-add-btn").addEventListener("click", () => {
  const nameVal = expenseName.value;
  const amountVal = expenseAmount.value;
  const typeVal = expenseType.value;
  console.log(typeVal === "Entry Type");
  if (!nameVal || !amountVal || typeVal === "Entry Type") {
    alert(
      "⚠️ All fields are required!\nPlease fill out all inputs before proceeding.",
    );
    return;
  }
  addToIncome(typeVal, nameVal, amountVal);
});

function addToIncome(typeVal, nameVal, amountVal) {
  const resultCard = document.createElement("div");
  const cardClasses = ["card", "w-full", "py-2", "bg-white", "border", "px-4"];
  const badgeClasses = ["badge", "text-white"];
  if (typeVal === "Income") {
    cardClasses.push("border-purple-500", "text-purple-500");
    badgeClasses.push("bg-purple-500");

    addAmount(totalIncome, amountVal);

    addAmount(totalBalance, amountVal);
  } else {
    cardClasses.push("border-secondary", "text-secondary");
    badgeClasses.push("badge-secondary");
    if (Number(amountVal) > Number(totalBalance.innerHTML)) {
      alert("Enter a valid amount to decrease!");
      return;
    }
    addAmount(totalExpense, amountVal);
    minusAmount(totalBalance, amountVal);
  }
  document.querySelector(".no-expense").classList.add("hidden");
  resultCard.classList.add(...cardClasses);
  resultCard.innerHTML = `
       <h1 class="flex items-center justify-between"> <span> ${nameVal} <strong>${amountVal}</strong> tk  </span>   <span class="${badgeClasses.join(" ")}">${typeVal}</span> <i class="fas fa-trash cursor-pointer dlt-expense"></i>  </h3>
   `;
  expenseResult.appendChild(resultCard);
  expenseName.value = "";
  expenseAmount.value = "";
  expenseType.value = "Entry Type";
}
expenseResult.addEventListener("click", (e) => {
  const dltBtn = e.target.closest(".dlt-expense");
  if (!dltBtn) return;
  expenseResult.removeChild(dltBtn.closest(".card"));
  if (expenseResult.children.length <= 1) {
    document.querySelector(".no-expense").classList.remove("hidden");
  }
});

function addAmount(target, value) {
  target.innerHTML = Number(target.innerHTML) + Number(value);
}
function minusAmount(target, value) {
  target.innerHTML = Number(target.innerHTML) - Number(value);
}
