import React, { useEffect, useState, useRef } from "react";
import { getHomePageData } from "../models/crypto_model";
import type {
  CryptoSummaryType,
  CryptoSummaryModelResponseType,
} from "../types/model_types";
import { CustomToastAlert } from "../components/elements/toast_custom";
import DataDisplayTable from "../components/elements/dataDisplayTable";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  // define Data Summary Column Names
  const summaryDataColumns = [
    "Coin ID",
    "Name",
    "Symbol",
    "Rank",
    "Is Currently Active",
  ];

  const nav = useNavigate();

  // data tracking
  const [summaryData, setSummaryData] = useState<any | undefined>(undefined);
  const [errorToastMessage, setErrorToastMessage] = useState<
    string | undefined
  >(undefined);
  const [showToast, setShowToast] = useState<boolean>(false);
  const selectedRow = useRef<string>("");

  // Data Retrieval on mount
  useEffect(() => {
    const dataFetch = async () => {
      console.log("Called axios");
      const data: CryptoSummaryModelResponseType = await getHomePageData();
      console.log("DATA IN", data);
      if (
        !data ||
        data === undefined ||
        data.message !== "success" ||
        data.data === undefined
      ) {
        setErrorToastMessage(
          "Data could not be retrieved at this time. Please try again"
        );
        setShowToast(true);
      } else {
        setSummaryData(data.data);
      }
    };
    dataFetch();
  }, []);

  const selectRow = (symbol: string) => {
    console.log("SELECTED SYMBOL", symbol);
    selectedRow.current = symbol;
    nav(`/latestData/${selectedRow.current}`);
  };

  return (
    <>
      <div className="container-fluid">
        <div>
          {summaryData ? (
            <DataDisplayTable
              headings={summaryDataColumns}
              data={summaryData}
              onRowSelect={selectRow}
            />
          ) : (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border border-0" role="status">
                <img
                  src="../../public/Logo.svg"
                  className="mh-100 h-100 mt-1"
                />
              </div>
              {/* <h3 className="ms-3">Loading Data</h3> */}
            </div>
          )}
        </div>
      </div>
      <CustomToastAlert
        toastType={"alert"}
        message={errorToastMessage !== undefined ? errorToastMessage : ""}
        showToast={showToast}
        onClose={() => {
          setShowToast(false);
        }}
      />
    </>
  );
};

export default HomePage;
