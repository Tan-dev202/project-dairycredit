# DairyCredit: Alternative Credit Scoring Platform for Dairy Farmers

## Project Overview
DairyCredit is a web application that helps assess credit scores for dairy farmers based on their financial data. It addresses credit risk assessment challenge due to the lack of farmer credit history and collateral. By developing an alternative credit scoring system lenders will assess the credit score of dairy farmers using non-traditional data points.

## Features
- Record monthly milk sales
- Record monthly input costs
- Record current liabilities
- View credit score grading

## Credit Score Calculation
- Cost to Sales Ratio: (Monthly Costs / Monthly Sales) * 100
- Liabilities to Assets Ratio: (Current Liabilities / Farm Asset Value) * 100
- Average Ratio: (Cost-to-Sales Ratio + Liabilities-to-Assets Ratio) / 2
- Credit Score Grading:
  * Average Ratio < 30: High Score (100 - Average Ratio)
  * Average Ratio 50-69: Medium Score (100 - Average Ratio)
  * Average Ratio 70+: Low Score (100 - Average Ratio)

## Functionalities
- [ ] Add new farmer records
- [ ] Search farmers by name or location
- [ ] Toggle dark/light mode
- [ ] Real-time credit score calculation
- [ ] View best performers
- [ ] Access basic financial literacy content