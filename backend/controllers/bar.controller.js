import mockData from "../models/info.model.js";
import { getAllUniqueValues, generateData } from "../services/bar.services.js";

export const getAllUniqueCategoryValues = async (req, res) => {
  try {
    const { category } = req.query;
    const data = await getAllUniqueValues(category);
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.status(e.response.status || 500).json({
      success: false,
      msg: e.message || "Internal Server Error",
    });
  }
};

export const getFilteredData = async (req, res) => {
  const { category, allValues } = req.body;
  //console.log(category, allValues);

  try {
    const uniqueValues = await getAllUniqueValues(category);
    // console.log(uniqueValues);
    const data = await generateData(uniqueValues, category, allValues);
    console.log(data);
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(err.response?.status || 500).json({
      sucess: false,
      msg: err.message || "Internal Server Error",
    });
  }
};
