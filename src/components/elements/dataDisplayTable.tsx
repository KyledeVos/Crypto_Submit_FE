import React, { useEffect, useState } from "react";
import type { dataDisplayTableType } from "../../types/element_types";
import type { CryptoSummaryType } from "../../types/model_types";

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

  console.log("DATA", data)

  return (
    <>
      {tableHeading && (
        <div className="row w-full justify-content-center">
          <h2 className="heading_font">{tableHeading}</h2>
        </div>
      )}
      <div className="table-responsive h-25 mh-25 col-12 col-xl-10 mx-auto justify-content-center">
        <table className={`table table-bordered ${clickableRow ? "table-hover" : ""} bg-dark mt-1 `}
        >
        <thead className="table-dark">
          <tr>
            {headings.map((heading) => {
              return <th>{heading}</th>;
            })}
          </tr>
        </thead>
        <tbody className="table-dark">
          {data.length > 0 ? (
            data.map((currentData) => {
              return (
                <tr role={clickableRow ? "button" : undefined}
                  onClick={() => {
                   onRowSelect && onRowSelect((currentData as CryptoSummaryType).Symbol);
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
      </div>

    </>
  );
};

export default DataDisplayTable;
