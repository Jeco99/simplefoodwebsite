"use client";

import React, { useState, useEffect } from "react";
import { foodData } from "./foodData";
import { Card } from "../../component/card/card";
import SearchBar from "../../component/searchBar/searchBar";
import { CardDatatype } from "../../component/dataInterface";
import styles from "./food.module.css";
import Toggle from "../../component/toggle/toggle";
import Link from "next/link";

const Home = () => {
  const [filteredData, setFilteredData] = useState<CardDatatype[]>(foodData);
  const [sortList, setSortList] = useState("ascending");
  const [isDarkMode, setDarkMode] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
 
  useEffect(() => {
    setIsFirstLoad(false);

    const storedDataString = localStorage.getItem("newData");
    if (storedDataString) {
      const storedData = JSON.parse(storedDataString);
       const mergedData = [...filteredData, storedData];
      setFilteredData(mergedData);
    }
  }, []);


  const handleSearch = (query: string) => {
    const filtered = foodData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return sortList === "ascending"
        ? a.rating - b.rating
        : b.rating - a.rating;
    });
    setFilteredData(sortedData);
    setSortList(sortList === "ascending" ? "descending" : "ascending");
  };

  const handleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (

    <div className={isDarkMode ? styles.darkMode : styles.lightMode}>
      <div className={styles.buttonContainer}>
      <SearchBar onSearch={handleSearch}/>
      <button onClick={handleSort} className={styles.sortButton}>
        {sortList === "ascending" ? "Descending" : "Ascending"}
      </button>
      <Toggle        
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
      />
      <button className={styles.add_DataBtn}><Link href="/addFoodData">Add Data</Link></button>
      <button className={styles.add_DataBtn}><Link href="/movie">Show Movie</Link></button>
      </div>
      <div className={styles.cardContainer}>
      {filteredData.map((data, index) => (
        <div key={index} className={isFirstLoad ? styles.animateSlideIn : '' }>
          <Card {...data}/>
        </div>
      ))}
      </div>
    
       
    </div>
  );
};

export default Home;
