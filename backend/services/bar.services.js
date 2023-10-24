import mockData from "../models/info.model.js";
import getColors from "./colors.service.js";

const getAllUniqueValues = async (category) => {
  try {
    return await mockData.find().select(category).distinct(category);
  } catch (e) {
    throw new Error(e.message || "Internal Server Error");
  }
};

const generateData = async (uniqueValues, currCategory, allValues) => {
  const colors = getColors(5);
  return await Promise.all(
    uniqueValues
      .slice(0, Math.min(70, uniqueValues.length))
      .map(async (item) => {
        const arr = Object.assign(
          {},
          ...(await Promise.all(
            allValues
              .filter((val) => val !== currCategory)
              .map(async (currValue, i) => {
                return {
                  [currValue]: await getCount(currCategory, item, currValue),
                  [currValue + "Color"]: colors[i],
                };
              })
          ))
        );

        return {
          [currCategory]: item,
          ...arr,
        };
      })
  );
};

const getCount = async (category, categoryValue, property) => {
  const data = await mockData
    .find({ [category]: categoryValue })
    .distinct(property);
  return data.length;
};

export { getAllUniqueValues, generateData };
