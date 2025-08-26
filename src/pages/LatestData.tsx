import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLatestDataSingle } from "../models/crypto_model";
import { CustomToastAlert } from "../components/elements/toast_custom";

const LatestData: React.FC = () => {
  const urlParams = useParams();
  const symbol = urlParams.symbol;
  console.log("l", symbol);
  const [latestData, setLatestData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (symbol !== undefined) {
        const dataResult = await getLatestDataSingle(symbol);
      }
    };
    fetchData();
  }, []);

  return <>Latest</>;
};

export default LatestData;
