import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";

const dummyColorsDB = [
  { id: 1, color: "red" },
  { id: 2, color: "green" },
  { id: 3, color: "blue" },
  { id: 4, color: "violet" },
  { id: 5, color: "orange" },
  { id: 6, color: "burgundy" },
  { id: 7, color: "pink" },
  { id: 8, color: "yellow" },
  { id: 9, color: "magenta" },
  { id: 10, color: "random color" },
  { id: 11, color: "another random color" },
  { id: 12, color: "last one" }
];

export default function App() {
  const [data, setData] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [5, 10, 15],
    pageSize: 5,
    page: 1
  });

  const updateData = (k, v) => setData((prev) => ({ ...prev, [k]: v }));

  // useEffect(() => {
  //   updateData("rowCount", dummyColorsDB.length);
  // }, []);
  useEffect(() => {
    updateData("loading", true);

    setTimeout(() => {
      const rows = dummyColorsDB.slice(
        (data.page - 1) * data.pageSize,
        (data.page - 1) * data.pageSize + data.pageSize
      );

      console.log(data.page, data.pageSize, "");
      console.log(rows, dummyColorsDB.length);

      // setData((d) => ({
      //   ...d,
      //   rowCount: dummyColorsDB.length,
      //   rows,
      //   loading: false
      // }));
      updateData("rowCount", dummyColorsDB.length);

      setTimeout(() => {
        updateData("rows", rows);
        updateData("loading", false);
      }, 100);
    }, 500);
  }, [data.page, data.pageSize]);

  return (
    <Box p={5}>
      <DataGrid
        density="compact"
        autoHeight
        rowHeight={50}
        //
        pagination
        paginationMode="server"
        loading={data.loading}
        rowCount={data.rowCount}
        rowsPerPageOptions={data.rowsPerPageOptions}
        page={data.page - 1}
        pageSize={data.pageSize}
        rows={data.rows}
        columns={[{ field: "color", headerName: "Color" }]}
        onPageChange={(data) => {
          updateData("page", data.page + 1);
        }}
        onPageSizeChange={(data) => {
          updateData("page", 1);
          updateData("pageSize", data.pageSize);
        }}
      />
    </Box>
  );
}
