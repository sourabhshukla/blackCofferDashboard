import mockData from "../models/info.model.js";
import getColors from "./colors.service.js";

export async function getAllUniqueValues(category) {
  return await mockData.find().select(category).distinct(category);
}

export async function getCount(category, categoryValue) {
  return await mockData.count({ [category]: categoryValue });
}

export async function generateData(category) {
  const uniqueValues = await getAllUniqueValues(category);
  const colors = getColors(uniqueValues.length);
  return await Promise.all(
    uniqueValues.slice(0, 20).map(async (item, idx) => {
      return {
        id: item,
        lable: item,
        value: await getCount(category, item),
        color: colors[idx],
      };
    })
  );
}
