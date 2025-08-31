import React, { useEffect, useState } from "react";
import type { dataDisplayTableType } from "../../types/element_types";
import type { CryptoSummaryTableType } from "../../types/model_types";

const DataDisplayTable = ({
  tableHeading,
  headings,
  data,
  onRowSelect,
  clickableRow,
}: dataDisplayTableType) => {
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
      {tableHeading && (
        <div className="row w-full justify-content-center">
          <h2 className="heading_font">{tableHeading}</h2>
        </div>
      )}
      <table
        className={`table ${clickableRow ? "table-hover" : ""} bg-dark mt-1`}
      >
        <thead className="table-dark">
          <tr>
            {headings.map((heading) => {
              return <td>{heading}</td>;
            })}
          </tr>
        </thead>
        <tbody className="table-dark">
          {data.length > 0 ? (
            data.map((currentData) => {
              return (
                <tr role={clickableRow ? "button" : undefined}
                  onClick={() => {
                    onRowSelect((currentData as CryptoSummaryTableType).symbol);
                  }}
                >
                  {Object.values(currentData).map((field) => {
                    return <td>{field}</td>;
                  })}
                </tr>
              );
            })
          ) : (
            <tr className="text-center">
              <td colSpan={headings.length}>NO DATA</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default DataDisplayTable;
