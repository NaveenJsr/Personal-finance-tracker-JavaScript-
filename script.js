document.addEventListener('DOMContentLoaded', function () {
  const transactionForm = document.getElementById('transaction-form');
  const transactionTable = document.getElementById('transaction-table');
  const balanceElement = document.getElementById('balance');
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const typeSelect = document.getElementById('type');

  let transactions = [];

  transactionForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description === '' || isNaN(amount)) {
      showError('Please enter a valid description and amount.');
      return;
    }

    const transaction = { description, amount, type };
    transactions.push(transaction);

    updateTransactionTable();
    updateBalance();

    descriptionInput.value = '';
    amountInput.value = '';
    typeSelect.value = 'income';
    descriptionInput.focus();
  });

  function showError(message) {
    const errorElement = document.createElement('p');
    errorElement.className = 'error';
    errorElement.textContent = message;
    transactionForm.prepend(errorElement);
  }

  function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateTransactionTable();
    updateBalance();
  }

  function updateTransactionTable() {
    transactionTable.innerHTML = `
      <tr>
        <th>Description</th>
        <th>Amount</th>
        <th>Type</th>
        <th>Action</th>
      </tr>
    `;

    transactions.forEach(function (transaction, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${transaction.description}</td>
        <td>${transaction.amount}</td>
        <td>${transaction.type}</td>
        <td>
          <button onclick="deleteTransaction(${index})">Delete</button>
        </td>
      `;
      transactionTable.appendChild(row);
    });
  }

  function updateBalance() {
    let balance = 0;
    transactions.forEach(function (transaction) {
      if (transaction.type === 'income') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    });
    balanceElement.textContent = balance.toFixed(2);
    if (balance >= 0) {
      balanceElement.style.color = 'green';
    } else {
      balanceElement.style.color = 'red';
    }
  }
});
