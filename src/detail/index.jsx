import React, { useEffect, useState } from "react";
import "./detail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DetailPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const paramName = searchParams.get("name");
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [showCurrency, setShowCurrency] = useState(false);
  const [callingCode, setCallingCode] = useState([]);
  const [showCallingCode, setShowCallingCode] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${paramName}?fullText=true`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      throw new Error("Fetching Data Failed");
    }
  };

  const fetchCallingCode = async () => {
    const apiDetail = data[0]?.idd?.root
      .substring(1)
      .concat(data[0]?.idd?.suffixes);
    try {
      if (apiDetail) {
        const response = await fetch(
          `https://restcountries.com/v2/callingcode/${apiDetail}`
        );
        const result = await response.json();
        setCallingCode(result);
      }
    } catch (error) {
      throw new Error("Fetching Data Failed");
    }
  };

  const fetchCurrency = async () => {
    const apiDetail = data[0]?.currencies && Object.keys(data[0]?.currencies);
    try {
      if (apiDetail) {
        const response = await fetch(
          `https://restcountries.com/v2/currency/${apiDetail}`
        );
        const result = await response.json();
        setCurrency(result);
      }
    } catch (error) {
      throw new Error("Fetching Data Failed");
    }
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchCallingCode();
    fetchCurrency();
    //eslint-disable-next-line
  }, [data]);

  return (
    data &&
    data[0] &&
    callingCode &&
    currency && (
      <div className="container-detail-page">
        <Link to={"/"}>
          <button>
            <FontAwesomeIcon icon={faArrowLeft} />
            {"\u00A0\u00A0"} Back to Homepage
          </button>
        </Link>
        <div className="title-detail">
          <h1>{paramName}</h1>
          <img src={data[0]?.flags?.png} alt="" />
        </div>
        <div className="desc-detail">
          {data[0]?.altSpellings.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <div className="container-location">
          <div className="location-latlong">
            <p>LatLong</p>
            <p className="location-detail">
              {data[0]?.capitalInfo?.latlng.join(", ")}
            </p>
          </div>
          <div className="location-region">
            <p>
              Capital: <span>{data[0]?.capital}</span>
            </p>
            <p>
              Region: <span>{data[0]?.continents}</span>
            </p>
            <p>
              Subregion: <span>{data[0]?.subregion}</span>
            </p>
          </div>
        </div>
        <div className="container-location">
          <div className="location-calling-code-currency">
            <p>Calling Code</p>
            <p className="location-detail">
              {data[0]?.idd?.root.substring(1)}
              {data[0]?.idd?.suffixes}
            </p>
            <u
              onMouseOver={() => setShowCallingCode(true)}
              onMouseOut={() => setShowCallingCode(false)}
            >
              {callingCode.length} countries
            </u>{" "}
            <span>with this calling code</span>
            {showCallingCode && (
              <div
                onMouseOver={() => setShowCallingCode(true)}
                onMouseOut={() => setShowCallingCode(false)}
                className="countries"
              >
                {callingCode &&
                  callingCode.map((item, index) => (
                    <p key={index}>{item.name}</p>
                  ))}
              </div>
            )}
          </div>
          <div className="location-calling-code-currency">
            <p>Currency</p>
            <p className="location-detail">
              {data[0]?.currencies && Object.keys(data[0]?.currencies)}
            </p>
            <u
              onMouseOver={() => setShowCurrency(true)}
              onMouseOut={() => setShowCurrency(false)}
            >
              {currency.length} countries
            </u>{" "}
            <span>with this currency</span>
            {showCurrency && (
              <div
                onMouseOver={() => setShowCurrency(true)}
                onMouseOut={() => setShowCurrency(false)}
                className="countries"
              >
                {currency &&
                  currency.map((item, index) => <p key={index}>{item.name}</p>)}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DetailPage;
