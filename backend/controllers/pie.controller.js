import { generateData } from "../services/pie.services.js";

export const getData = async (req, res) => {
  const { category } = req.query;
  try {
    const data = await generateData(category);
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
