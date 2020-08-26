import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  //column: array
  //sortColumn: object
  //onSort: function

  const renderSortIcon = column => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  const raiseSort = path => {
    const temp = { ...sortColumn };
    //if click on the same , shld flip order
    if (temp.path === path) {
      //doing this because its NOT T/F so cannnot use '!'
      temp.order = temp.order === "asc" ? "desc" : "asc";
      // setSortColumn({ path, order: "asc" });
    } else {
      temp.path = path;
      temp.order = "asc";
    }
    return onSort(temp);
  };
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            className="clickable"
            key={column.path || column.path}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
