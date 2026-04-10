let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addIncome() {
  addTransaction("entrada");
}

function addExpense() {
  addTransaction("saida");
}

function addTransaction(type) {
  const desc = document.getElementById("desc").value = "";
  const value = Number(document.getElementById("value").value = "");

  if (!desc || !value) return;

  transactions.push({ desc, value, type });

  saveData();
  update();
  if (transactions.length === 0) {
  list.innerHTML = "<p>Nenhuma transação ainda</p>";
  balanceEl.textContent = 0;
  return;
}
}

function update() {
  const list = document.getElementById("list");
  const balanceEl = document.getElementById("balance");
  

  list.innerHTML = "";
  let balance = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");

    if (t.type === "entrada") {
      li.textContent = `${t.desc}: +R$${t.value}`;
      balance += t.value;
    } else {
      li.textContent = `${t.desc}: -R$${t.value}`;
      balance -= t.value;
    }

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
      transactions.splice(index, 1);
      saveData();
      update();
    };

    li.appendChild(btn);
    if (t.type === "entrada") {
  li.style.borderLeft = "5px solid #00e676";
} else {
  li.style.borderLeft = "5px solid #ff5252";
}
    list.appendChild(li);
  });

  balanceEl.textContent = balance.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
});

  if (balance >= 0) {
  balanceEl.style.color = "#00e676";
} else {
  balanceEl.style.color = "#ff5252";
}
}

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
update();

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
showToast("Transação adicionada 💰");
toast.style.background = "#d50000";