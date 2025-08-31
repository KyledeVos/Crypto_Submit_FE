import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLatestDataSingle } from "../models/crypto_model";
import { CustomToastAlert } from "../components/elements/toast_custom";
import {latestDataValidateResponse} from "../validators/response_validators"
import type { latestDataType } from "../types/model_types";
import DataDisplayTable from "../components/elements/dataDisplayTable";

const LatestData: React.FC = () => {
  const urlParams = useParams();
  const symbol = urlParams.symbol;
  console.log("l", symbol);
  const [latestData, setLatestData] = useState<latestDataType| undefined>(undefined);
  const [errorToastMessage, setErrorToastMessage] = useState<string | undefined>(undefined);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<boolean>(false)

  // handle window resizing
  useEffect(() => {
    const checkForResize = () => {setMobileView(window.innerWidth < 768)}
    window.addEventListener('resize', checkForResize)

    return(()=>{
      window.removeEventListener('resize', checkForResize)
    })
  }, [])

  useEffect(() => {
    
    const fetchData = async () => {
      setLoadingData(true)
      if (symbol !== undefined) {
        const dataResult = await getLatestDataSingle(symbol);
        console.log("DATARESULT", dataResult);

        if(dataResult.message !== "success" || dataResult.data === undefined){
          setErrorToastMessage("Failed to get latest data")
          setShowToast(true)
        }else{
          const validatedData = latestDataValidateResponse(dataResult.data)
          if(validatedData === undefined){
            setErrorToastMessage("Failed to get latest data")
            setShowToast(true)
          }else{
            // success for data
            setLatestData(validatedData)
          }
        }
      }
      setLoadingData(false)

    };
    fetchData();
  }, []);

  useEffect(()=> {
    console.log("LATEST", latestData)
  }, [latestData])


  const LatestDataColumns = [
    "Name",
    "Symbol",
    "Rank",
    "Current Price",
    "Market Cap",
    "Market Cap Dominance",
    "Volume 24H"
  ];``
  return (
    <>
      <div className="container-fluid">
        <div className="row w-full justify-content-center">
          {latestData &&
          <h2 className="heading_font">Latest Data for {latestData.currencyName}</h2>
          }
          {latestData !== undefined && !mobileView && (
          <div className="table-responsive h-25 mh-25 col-12 col-xl-10">
            {<table className="table">
              <thead className="table-dark  align-middle">
                <tr>
                  {LatestDataColumns.map((heading) => {
                    return <th>{heading}</th>;
                  })}
                </tr>
              </thead>
              <tbody className="table-dark">
                  <tr className="text-center">
                    <td>{latestData.currencyName}</td>
                    <td>{latestData.currencySymbol}</td>
                    <td>{latestData.rank}</td>
                    <td>{latestData.currentPrice}</td>
                    <td>{latestData.marketCap}</td>
                    <td>{latestData.marketCapDominance}</td>
                    <td>{latestData.volume24h}</td>
                  </tr>
              </tbody>
            </table>}
          </div>
          )}
          {latestData !== undefined && mobileView &&(
          <div className="table-responsive h-25 mh-25">
            {<table className="table table-bordered ">
              <tbody className="table-dark">
                <tr>
                  <td>Name</td>
                  <td>{latestData.currencyName}</td>
                </tr>
                <tr>
                  <td>Symbol</td>
                  <td>{latestData.currencySymbol}</td>
                </tr>
                <tr>
                  <td>Rank</td>
                  <td>{latestData.rank}</td>
                </tr>
                <tr>
                  <td>Current Price</td>
                  <td>{latestData.currentPrice}</td>
                </tr>
                <tr>
                  <td>Market Cap</td>
                  <td>{latestData.marketCap}</td>
                </tr>
                <tr>
                  <td>Market Cap Dominance</td>
                  <td>{latestData.marketCapDominance}</td>
                </tr>
                <tr>
                  <td>Volume 24H</td>
                  <td>{latestData.volume24h}</td>
                </tr>
              </tbody>
            </table>}
          </div>
          )}
          {latestData === undefined && !loadingData &&
            <div className="row justify-content-center mt-2">
            <h2>No Data could be retrieved</h2>
          </div>
          }
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
        </div>
      </div>
    </>
  );
};

export default LatestData;
