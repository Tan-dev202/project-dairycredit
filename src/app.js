document.addEventListener("DOMContentLoaded", async () => {
    const farmers = await fetchFarmers();
  
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
    } else if (averageRatio >= 70) {
      scoreClass = "credit-score-low";
    }

    return { creditScore: creditScore.toFixed(2), scoreClass, averageRatio };
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

      tbody.innerHTML += `
            <tr data-id="${farmer.id}">
                <td>${farmer.name}</td>
                <td>${farmer.location}</td>
                <td>$${farmer.monthlySales}</td>
                <td>$${farmer.monthlyCosts}</td>
                <td>${farmer.costToSalesRatio.toFixed(2)}%</td>
                <td>${farmer.liabilitiesToAssetsRatio.toFixed(2)}%</td>
                <td>${farmer.averageRatio.toFixed(2)}%</td>
                <td class="${scoreClass}">${creditScore}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            </tr>
        `;
    });

    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", prepareEditFarmer);
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", deleteFarmer);
    });

    displayTopPerformers(farmers);
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
      const performersGroup = document.createElement("div");
      performersGroup.innerHTML = `
        <strong>${index + 1}. ${farmer.name}</strong>
        <p>Location: ${farmer.location}</p>
        <p>Credit Score: <span class="${farmer.scoreClass}">${
        farmer.creditScore
      }</span><p>
        <p>Monthly Sales: $${farmer.monthlySales}</p>
    `;
      topPerformersList.appendChild(performersGroup);
    });
  }

  // function prepareEditFarmer(){}

  // function deleteFarmer(){}

  async function fetchFarmers() {
    return fetch("http://localhost:3000/farmers", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data);
  }

});
