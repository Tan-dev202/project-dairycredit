# DairyCredit: Alternative Credit Scoring Platform for Dairy Farmers

# Author: Enock Tangus

<ins>**Project Overview**

DairyCredit is a web application that helps assess credit scores for dairy farmers based on their financial data. It addresses credit risk assessment challenge due to the lack of farmer credit history and collateral. By developing an alternative credit scoring system lenders will assess the credit score of dairy farmers using non-traditional data points.

<ins>**Features or MVPs**

- Record monthly milk sales
- Record monthly input costs
- Record livestock/farm asset value
- Record current liabilities
- View credit score grading

<ins>**Credit Score Calculation**

- Cost to Sales Ratio: 
  >(Monthly Costs / Monthly Sales) * 100
- Liabilities to Assets Ratio: 
  >(Current Liabilities / Farm Asset Value) * 100
- Average Ratio: 
  >(Cost-to-Sales Ratio + Liabilities-to-Assets Ratio) / 2
- Credit Score Grading:
  + Average Ratio < 49: High Score (100 - Average Ratio)
  + Average Ratio 50-69: Medium Score (100 - Average Ratio)
  + Average Ratio 70+: >Low Score (100 - Average Ratio)

<ins>**Functionalities**

- [x] Add new farmer records
- [x] Search farmers by name or location
- [x] Toggle dark/light mode
- [x] Real-time credit score calculation
- [x] View best performers
- [x] Access basic financial literacy content

[GitHub Pages](https://tan-dev202.github.io/project-dairycredit/)