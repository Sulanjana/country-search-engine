import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

const HomePage = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const result = await response.json();
      if (result.length > 5) {
        setData(result.slice(0, 5));
      } else {
        setData(result);
      }
    } catch (error) {
      throw new Error("Fetching Data Failed");
    }
  };

  const handleSearch = debounce((value) => {
    setName(value);
  }, 1000);

  useEffect(() => {
    if (name) {
      fetchData();
    }
    //eslint-disable-next-line
  }, [name]);
  return (
    <div className="container-home-page">
      <h1 className="title-home-page">Country</h1>
      <input
        className="input"
        placeholder="Type any country name"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {name && data && data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <Link to={`/detail?name=${item.name.common}`} key={index}>
              <li className="fetch-not-empty">{item.name.common}</li>
            </Link>
          ))}
        </ul>
      ) : name && data ? (
        <ul>
          <li className="fetch-empty">{data.message}</li>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HomePage;
