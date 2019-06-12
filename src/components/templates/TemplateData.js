import React, { useEffect, useState } from "react";

let createData = (name, template) => {
  counter += 1;
  return { id: counter, name, template };
};
const rowsx = [
  createData("Ice cream sandwich", 237, 9.0),
  createData("Ice Coffie", 287, 8.0),
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 3.7),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0)
];
const TemplateData = props => {
  const [rows, setRows] = useState(0);

  useEffect(setRows(rowsx), []);
  return rows;
};

export default TemplateData;
