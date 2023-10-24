import { generateData } from "../services/line.services.js";

export const getData = async (req, res) => {
  const { X, Y, startYear, endYear } = req.body;
  try {
    const data = await generateData(X, Y, startYear, endYear);
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.status(e.response?.status || 500).json({
      success: false,
      msg: e.message || "Internal Server Error",
    });
  }
};
