import React, { useEffect, useState } from "react";
import type { dataDisplayTableType } from "../../types/element_types";

const DataDisplayTable = ({ headings, data }: dataDisplayTableType) => {
  const [dataEmpty, setDataEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (
      headings !== undefined &&
      headings.length > 0 &&
      data !== undefined &&
      data.length > 0
    ) {
      setDataEmpty(true);
    }
  }, []);

  return (
    <>
      <table className="table bg-dark mt-5">
        <thead className="table-dark">
          <tr>
            {headings.map((heading) => {
              return <td>{heading}</td>;
            })}
          </tr>
        </thead>
        <tbody className="table-dark">
          {data.map((currentData) => {
            return (
              <tr>
                {Object.values(currentData).map((field) => {
                  return <td>{field}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DataDisplayTable;
