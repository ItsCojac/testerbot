const opportunitiesTable = document.getElementById('opportunities');

async function getOpportunities() {
  const response = await fetch('/arbitrage');
  if (!response.ok) {
    throw new Error('Unable to fetch opportunities');
  }
  const opportunities = await response.json();
  return opportunities;
}

async function executeArbitrage(token, dex1, dex2, amount) {
  const apiKey = localStorage.getItem('apiKey');
  const privateKey = localStorage.getItem('privateKey');
  const response = await fetch('/arbitrage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    },
    body: JSON.stringify({
      token,
      dex1,
      dex2,
      amount,
      privateKey,
    }),
  });
  if (!response.ok) {
    throw new Error('Unable to execute arbitrage trade');
  }
  alert('Arbitrage trade executed successfully');
}

async function renderOpportunities() {
  const opportunities = await getOpportunities();
  opportunitiesTable.innerHTML = '';
  opportunities.forEach((opportunity) => {
    const row = document.createElement('tr');
    const tokenCell = document.createElement('td');
    tokenCell.textContent = opportunity.token;
    row.appendChild(tokenCell);
    const dex1Cell = document.createElement('td');
    dex1Cell.textContent = opportunity.dex1;
    row.appendChild(dex1Cell);
    const dex2Cell = document.createElement('td');
    dex2Cell.textContent = opportunity.dex2;
    row.appendChild(dex2Cell);
    const profitCell = document.createElement('td');
    profitCell.textContent = opportunity.profit;
    row.appendChild(profitCell);
    const executeCell = document.createElement('td');
    const executeButton = document.createElement('button');
    executeButton.classList.add('btn', 'btn-primary');
    executeButton.textContent = 'Execute';
    executeButton.addEventListener('click', async () => {
      const amount = prompt('Enter amount to trade');
      if (amount === null) {
        return;
      }
      try {
        await executearbitrage(opportunity.token, opportunity.dex1, opportunity.dex2, amount);
        renderOpportunities();
      } catch (err) {
        alert(err.message);
      }
    });
    executeCell.appendChild(executeButton);
    row.appendChild(executeCell);
    opportunitiesTable.appendChild(row);
  });
}

async function main() {
  const apiKey = localStorage.getItem('apiKey');
  const privateKey = localStorage.getItem('privateKey');
  if (!apiKey || !privateKey) {
    window.location.href = '/login.html';
    return;
  }
  renderOpportunities();
}

main();

