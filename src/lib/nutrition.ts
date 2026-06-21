export function computeNutrition(data: { alcol: number; zuccheroResiduo: number }) {
  const alcoholG = data.alcol * 0.789;
  const sugarG = data.zuccheroResiduo / 10;
  const carbsG = sugarG;
  const energyKcal = alcoholG * 7 + carbsG * 4;
  const energyKJ = energyKcal * 4.184;
  return {
    energyKcal: Math.round(energyKcal * 10) / 10,
    energyKJ: Math.round(energyKJ * 10) / 10,
    carbsG: Math.round(carbsG * 10) / 10,
    sugarG: Math.round(sugarG * 10) / 10,
  };
}
