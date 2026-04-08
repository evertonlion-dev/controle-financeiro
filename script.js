let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addIncome() {
  addTransaction("entrada");
}

function addExpense() {
  addTransaction("saida");
}

function addTransaction(type) {
  const desc = document.getElementById("desc").value;
  const value = Number(document.getElementById("value").value);

  if (!desc || !value) return;

  transactions.push({ desc, value, type });

  saveData();
  update();
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
    list.appendChild(li);
  });

  balanceEl.textContent = balance;
}

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

update();