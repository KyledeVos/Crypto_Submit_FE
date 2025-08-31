import React, { useEffect, useState, useRef } from "react";
import { getHomePageData, getAllLatestTableData } from "../models/crypto_model";
import type {
  CryptoSummaryType,
  CryptoSummaryModelResponseType,
  latestDataType
} from "../types/model_types";
import { CustomToastAlert } from "../components/elements/toast_custom";
import DataDisplayTable from "../components/elements/dataDisplayTable";
import { useNavigate } from "react-router-dom";
import {formatSummaryData} from "../utilities/util_data_format"
import {allLatestDataValidateResponse} from "../validators/response_validators"

const HomePage: React.FC = () => {
  // define Data Summary Column Names
  const summaryDataColumns = [
    "Name",
    "Coin ID",
    "Symbol",
    "Rank",
    "Is Currently Active",
  ];

  const allDataColumns = [
    "Name",
    "Symbol",
    "Rank",
    "Current Price",
    "Market Cap",
    "Market Cap Dominance",
    "Volume 24H"
  ]

  const nav = useNavigate();

  // data tracking
  const [summaryData, setSummaryData] = useState<
    CryptoSummaryType[] | undefined
  >(undefined);
  const [fullData, setFullData] = useState<latestDataType [] | undefined>([])
  const [errorToastMessage, setErrorToastMessage] = useState<
    string | undefined
  >(undefined);
  const [showToast, setShowToast] = useState<boolean>(false);
  const selectedRow = useRef<string>("");
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [allDataLoading, setAllDataLoading] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<boolean>(false)

  // handle window resizing
  useEffect(() => {
    const checkForResize = () => {setMobileView(window.innerWidth < 768)}
    window.addEventListener('resize', checkForResize)

    return(()=>{
      window.removeEventListener('resize', checkForResize)
    })
  }, [])

  // Data Retrieval on mount
  useEffect(() => {
    const dataFetch = async () => {
      setLoadingData(true);
      const data: CryptoSummaryModelResponseType = await getHomePageData();
      const formattedData = formatSummaryData(data.data)
      setLoadingData(false);
      if (
        !data ||
        data === undefined ||
        data.message !== "success" ||
        data.data === undefined
      ) {
        setSummaryData([]);
        setErrorToastMessage(
          data.message.trim() !== ""
            ? data.message
            : "Data could not be retrieved at this time. Please try again"
        );
        setShowToast(true);
      } else {
        setSummaryData(formattedData);
        setAllDataLoading(true)
      }
    };
    dataFetch();
  }, []);

  // get current table data for all crypto currencies
  useEffect(() => {
    const currentDataFetch = async() => {
      const result = await getAllLatestTableData()
      setAllDataLoading(false)
      if(!result || result === undefined || result.data === undefined){
        setFullData([]);
        setErrorToastMessage(
          "Full Data could not be retrieved at this time. Please try again"
        );
      }
      const validatedResult = allLatestDataValidateResponse(result.data)
      if(validatedResult === undefined){
        setFullData([]);
        setErrorToastMessage(
          "Full Data could not be retrieved at this time. Please try again"
        );
        setShowToast(true);
      }else{
      
      setFullData(validatedResult)
      console.log("ALL RESULT", result)
      } 
    }
    currentDataFetch();
  }, [])
  
  // handler for row selection in data table
  const selectRow = (symbol: string) => {
    selectedRow.current = symbol;
    nav(`/latestData/${selectedRow.current}`);
  };

  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="justify-content-center">
          {summaryData !== undefined && summaryData.length > 0 && (
            <div className="h-25 mh-25 justify-content-center">
              <DataDisplayTable
                tableHeading="Currencies"
                headings={summaryDataColumns}
                data={summaryData}
                onRowSelect={selectRow}
                clickableRow={true}
              />
            </div>
          )
          }
          {summaryData?.length === 0 &&
                      <>
          <div><h2>No Data</h2></div>
          </>
          }
          {fullData !== undefined && fullData.length !== 0 && !mobileView &&
            <>
            <div className="row w-full justify-content-center">
              <h2 className="heading_font">Currencies Data</h2>
              <div className="table-responsive h-25 mh-25 col-12 col-xl-10">
                {<table className="table table-bordered">
                  <thead className="table-dark  align-middle">
                    <tr>
                      {allDataColumns.map((heading) => {
                        return <th>{heading}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody className="table-dark">
                    {fullData.map((currentItem :any)=>{
                      return(
                        <tr className="text-center">
                        <td>{currentItem.currency_name}</td>
                        <td>{currentItem.currency_symbol}</td>
                        <td>{currentItem.rank}</td>
                        <td>{currentItem.current_price}</td>
                        <td>{currentItem.market_cap}</td>
                        <td>{currentItem.market_cap_dominance}</td>
                        <td>{currentItem.volume_24h}</td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>}
              </div>
            </div>

            </>
          }
          {fullData !== undefined && fullData.length !== 0 && mobileView &&(
            <>
              <h2 className="heading_font">Currencies Data</h2>
              <div className="table-responsive h-25 mh-25 col-12 col-xl-10">
                {<table className="table table-bordered">
                  <tbody className="table-dark">
                    {fullData.map((currentItem :any)=>{
                      return(
                        <>
                         <tr>
                          <td>Name</td>
                          <td>{currentItem.currency_name}</td>
                        </tr>
                        <tr>
                          <td>Symbol</td>
                          <td>{currentItem.currency_symbol}</td>
                        </tr>
                        <tr>
                          <td>Rank</td>
                          <td>{currentItem.rank}</td>
                        </tr>
                        <tr>
                          <td>Current Price</td>
                          <td>{currentItem.current_price}</td>
                        </tr>
                        <tr>
                          <td>Market Cap</td>
                          <td>{currentItem.market_cap}</td>
                        </tr>
                        <tr>
                          <td>Market Cap Dominance</td>
                          <td>{currentItem.market_cap_dominance}</td>
                        </tr>
                        <tr>
                          <td>Volume 24H</td>
                          <td>{currentItem.volume_24h}</td>
                        </tr>
                        <tr className="table-warning"><td></td><td></td></tr>
                        </>

                      )
                    })}
                  </tbody>
                </table>}
              </div>
            </>
          )}
          {loadingData && (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border border-0" role="status">
                <img
                  src="../../public/Logo.svg"
                  className="mh-100 h-100 mt-1"
                />
                
              </div>
              <h3 className="ms-2">Fetching Data</h3>
            </div>
          )}
          {allDataLoading == true && (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border border-0" role="status">
                <img
                  src="../../public/Logo.svg"
                  className="mh-100 h-100 mt-1"
                />
              </div>
              <h3 className="ms-2">Fetching Current Data</h3>
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
