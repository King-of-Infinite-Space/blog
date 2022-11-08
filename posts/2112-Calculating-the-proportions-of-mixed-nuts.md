---
title: Calculating the proportions of mixed nuts
number: 191
url: https://github.com/King-of-Infinite-Space/thoughts/discussions/191
createdAt: 2021-12-28T16:05:08Z
lastEditedAt: 2022-10-30T04:44:08Z
updatedAt: 2022-10-30T04:44:08Z
author: King-of-Infinite-Space
category: 博文
labels:
  - 数理小径
  - EN
countZH: 0
countEN: 600
filename: 2112-Calculating-the-proportions-of-mixed-nuts
---

I had a can of mixed nuts -- cashews, almonds, pistachios, pecans -- in the order written on the package, which also seems to be the order of their proportions. As a rough guess, 50% cashews, 40% almonds, 8% pistachios and 2% pecans. Considering their unit prices, this is not surprising. The problem is their proportions are not listed anywhere on the package. Such information is crucial for customers to determine its value. (I tried another product, which also does not list them. But at least the contents are visible, since part of its plastic package is transparent.)

I assume such products are not required to list the proportions. However, what is required is nutrition facts. They may contain enough information to uncover what have been concealed. All we need is a set of linear equations.

The following table lists the nutrition facts of the mixed nuts and of each of its components (data from USDA). I omitted fat and sodium because the mixed nuts contain oil and salt. Unit is mg, per 1oz≈28g nuts.

|               | Mixed | Cashew | Almond | Pistachio | Pecan |
|---------------|-------|--------|--------|-----------|-------|
| Total carb    | 7000  | 9300   | 6000   | 7800      | 3900  |
| Dietary Fiber | 2000  | 850    | 3100   | 2900      | 2700  |
| Sugar         | 1000  | 1400   | 1400   | 2200      | 1200  |
| Protein       | 5000  | 4300   | 6000   | 6000      | 2700  |
| Calcium       | 40    | 13     | 76     | 30        | 20    |
| Iron          | 1.3   | 1.7    | 1.1    | 1.1       | 0.8   |
| Potassium     | 180   | 160    | 200    | 290       | 120   |
| Phosphorus    | 130   | 140    | 130    | 130       | 83    |
| Magnesium     | 70    | 74     | 79     | 31        | 37    |
| Zinc          | 1.1   | 1.6    | 0.94   | 0.66      | 1.4   |
| Copper        | 0.4   | 0.63   | 0.31   | 0.37      | 0.33  |
| Manganese     | 0.6   | 0.23   | 0.63   | 0.35      | 1.1   |
| Vitamin E     | 3.1   | 0.26   | 6.8    | 0.62      | 0.37  |

The first column must be a weighted average of the other four. The four weightings (i.e. proportions) sum to 1, so there are only 3 free variable. This means we only need 3 equations to find the solution. We have more than enough (12), so we can treat this as an ordinary least squares problem. The proportions are just the regression coefficients that minimize squared error, which can be calculated through this [formula](https://en.wikipedia.org/wiki/Ordinary_least_squares#Constrained_estimation). I rescaled each row such that the first entry (y) equals 1. This makes sure that each row contributes roughly equally to the loss.

*(A quick look at the numbers suggests that the row for "Sugar" isn't right. The value for mixed nuts is lower than any of its components. Perhaps this is due to low precision (only one significant figure). I excluded it from the calculation.)*

The result is 35% cashews, 42% almonds, 6% pistachios and 17% pecans. Apart from overestimating the proportion of pecans, this looks reasonable. If 4 rows with larger loss are removed, the remaining 8 rows yield the numbers 40%, 42%, 5% and 12%, which seems even better. 

So, nutrition facts allow us to get a reasonably good estimate of the proportions of mixed nuts, but no customers are expected to do such calculation when they pick up the product from the shelf in a store. Manufacturers should be obliged to show not only the ingredients but also their quantity, as consumers have the right to be informed. And the name of the product can be more accurate too -- in this case, it should really be called "Cashews and almonds, supplemented with pistachios and pecans".

---

Data from USDA
[Nuts, cashew nuts, dry roasted, with salt added](https://fdc.nal.usda.gov/fdc-app.html#/food-details/169421/nutrients)
[Nuts, almonds, dry roasted, with salt added](https://fdc.nal.usda.gov/fdc-app.html#/food-details/168596/nutrients)
[Nuts, pistachio nuts, dry roasted, with salt added](https://fdc.nal.usda.gov/fdc-app.html#/food-details/169426/nutrients)
[Nuts, pecans, dry roasted, with salt added](https://fdc.nal.usda.gov/fdc-app.html#/food-details/169424/nutrients)
<img src='https://count.lnfinite.space/post/42.svg?plus=1' width='0' height='0' />