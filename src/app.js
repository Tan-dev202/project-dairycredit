document.addEventListener("DOMContentLoaded", () => {
  function calculateCreditScore(
    monthlySales,
    monthlyCosts,
    farmAssetValue,
    currentLiabilities
  ) {
    const costToSalesRatio = (monthlyCosts / monthlySales) * 100;
    const liabilitiesToAssetsRatio =
      (currentLiabilities / farmAssetValue) * 100;
    const averageRatio = (costToSalesRatio + liabilitiesToAssetsRatio) / 2;
    let creditScore = 100 - averageRatio;
    let scoreClass;

    if (averageRatio < 49) {
      scoreClass = "credit-score-high";
    } else if (averageRatio >= 50 && averageRatio < 70) {
      scoreClass = "credit-score-medium";
    } else {
      scoreClass = "credit-score-low";
    }

    return { creditScore: creditScore.toFixed(2), scoreClass, averageRatio };
  }

  function displayTopPerformers(farmers) {
    const farmersWithScores = farmers.map((farmer) => {
      const scoreInfo = calculateCreditScore(
        farmer.monthlySales,
        farmer.monthlyCosts,
        farmer.farmAssetValue,
        farmer.currentLiabilities
      );

      return {
        ...farmer,
        creditScore: parseFloat(scoreInfo.creditScore),
        scoreClass: scoreInfo.scoreClass,
      };
    });

    const topPerformers = farmersWithScores
      .sort((a, b) => b.creditScore - a.creditScore)
      .slice(0, 3);

    const topPerformersList = document.getElementById("top-performers-list");
    topPerformersList.innerHTML = "";

    topPerformers.forEach((farmer, index) => {
      const performerDiv = document.createElement("div");
      performerDiv.innerHTML = `
            <strong>${index + 1}. ${farmer.name}</strong>
            <p>Location: ${farmer.location}</p>
            <p>Credit Score: <span class="${farmer.scoreClass}">${farmer.creditScore}</span></p>
            <p>Monthly Sales: Ksh. ${farmer.monthlySales.toLocaleString()}</p>
        `;
      topPerformersList.appendChild(performerDiv);
    });
  }

  function renderFarmers(farmers) {
    const tbody = document.getElementById("farmers-tbody");
    tbody.innerHTML = "";

    farmers.forEach((farmer) => {
      const { creditScore, scoreClass } = calculateCreditScore(
        farmer.monthlySales,
        farmer.monthlyCosts,
        farmer.farmAssetValue,
        farmer.currentLiabilities
      );

      const row = document.createElement("tr");
      row.dataset.id = farmer.id;
      row.innerHTML = `
            <td>${farmer.name}</td>
            <td>${farmer.location}</td>
            <td>${farmer.monthlySales}</td>
            <td>${farmer.monthlyCosts}</td>
            <td>${((farmer.monthlyCosts / farmer.monthlySales) * 100).toFixed(2)}%</td>
            <td>${((farmer.currentLiabilities / farmer.farmAssetValue) * 100).toFixed(2)}%</td>
            <td>${(((farmer.monthlyCosts / farmer.monthlySales) * 100 + (farmer.currentLiabilities / farmer.farmAssetValue) * 100) /2).toFixed(2)}%</td>
            <td class="${scoreClass}">${creditScore}</td>
            <td hidden>${farmer.farmAssetValue}</td>
            <td hidden>${farmer.currentLiabilities}</td>
            <td>
                <button class="delete-btn btn btn-sm btn-danger rounded">Delete</button>
            </td>
        `;

      tbody.appendChild(row);
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", deleteFarmer);
    });

    displayTopPerformers(farmers);
  }

  function cancelEdit() {
    document.getElementById("farmer-form").reset();
    document.getElementById("farmer-id").value = "";
    document.getElementById("submit-btn").textContent = "Add Farmer";
    document.getElementById("cancel-edit-btn").classList.add("hidden");
  }

  document.getElementById("cancel-edit-btn").addEventListener("click", cancelEdit);

  function searchFarmers(event) {
    const searchTerm = event.target.value.toLowerCase();
    fetch("https://my-json-server.typicode.com/Tan-dev202/project-dairycredit/farmers", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((farmers) => {
        const filteredFarmers = farmers.filter((farmer) =>
            farmer.name.toLowerCase().includes(searchTerm) ||
            farmer.location.toLowerCase().includes(searchTerm)
        );
        renderFarmers(filteredFarmers);
      })
      .catch((error) => console.error("Error searching farmers:", error));
  }
  
  document.querySelector(".search-input").addEventListener("input", searchFarmers);

  async function fetchFarmers() {
    try {
      const response = await fetch("https://my-json-server.typicode.com/Tan-dev202/project-dairycredit/farmers", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const farmers = await response.json();
      renderFarmers(farmers);
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
  }

  async function deleteFarmer(event) {
    const row = event.target.closest("tr");
    const farmerId = row.dataset.id;

    try {
      await fetch(`https://my-json-server.typicode.com/Tan-dev202/project-dairycredit/farmers/${farmerId}`, {
        method: "DELETE",
      });
      fetchFarmers();
    } catch (error) {
      console.error("Error deleting farmer:", error);
    }
  }

  async function addOrUpdateFarmer(event) {
    event.preventDefault();

    const farmerId = document.getElementById("farmer-id").value;
    const newFarmer = {
      name: document.getElementById("name").value.trim(),
      location: document.getElementById("location").value.trim(),
      monthlySales: Number(document.getElementById("monthly-sales").value),
      monthlyCosts: Number(document.getElementById("monthly-costs").value),
      farmAssetValue: Number(document.getElementById("asset-value").value),
      currentLiabilities: Number(document.getElementById("current-liabilities").value),
    };

    try {
      let response;
      if (farmerId) {
        response = await fetch(`https://my-json-server.typicode.com/Tan-dev202/project-dairycredit/farmers/${farmerId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFarmer),
        });
      } else {
        response = await fetch("https://my-json-server.typicode.com/Tan-dev202/project-dairycredit/farmers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFarmer),
        });
      }

      await response.json();
      fetchFarmers();

      event.target.reset();
      document.getElementById("farmer-id").value = "";
      document.getElementById("submit-btn").textContent = "Add Farmer";
      document.getElementById("cancel-edit-btn").classList.add("hidden");
    } catch (error) {
      console.error("Error adding/updating farmer:", error);
    }
  }

  document.getElementById("farmer-form").addEventListener("submit", addOrUpdateFarmer);

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }

  document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);

  fetchFarmers();
});
