import mockData from "../models/info.model.js";

export async function generateData(x, y, startYear, endYear) {
  // console.log(x, categoryValue, y, startYear, endYear);
  const uniqueVaues = await getAllUniqueVaulues(x);
  return await Promise.all(
    uniqueVaues.slice(0, 40).map(async (item) => {
      return {
        x: item,
        y: await getAverageY(x, item, y, startYear, endYear),
      };
    })
  );
}

async function getAverageY(x, categoryValue, y, startYear, endYear) {
  //   const data = await mockData
  //     .find({
  //       $and: [
  //         {
  //           $or: [
  //             { start_year: null },
  //             { end_year: null },
  //             {
  //               $and: [
  //                 { start_year: { $ne: null } },
  //                 { end_year: { $ne: null } },
  //                 { start_year: { $gte: startYear } },
  //                 { end_year: { $lte: endYear } },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           [x]: categoryValue,
  //         },
  //         {
  //           [y]: { $ne: null },
  //         },
  //       ],
  //     })
  //     .select(y);
  let data = await mockData.find({ [x]: categoryValue });
  data = data.filter(
    (item) =>
      (item.start_year === null || item.start_year >= startYear) &&
      (item.end_year === null || item.end_year <= endYear)
  );
  let sum = data.reduce((acc, curr) => acc + curr[y], 0);
  if (data.length === 0) {
    return 0;
  }
  return (sum / data.length).toFixed(2);
}

async function getAllUniqueVaulues(category) {
  return await mockData.find().distinct(category);
}
