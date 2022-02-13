import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Place from "../components/Place";

const API_KEY = "u1Jom8qikw4A3dUo3uPxgm3fnRGb0tzy";

export default function Home() {
  const [search, setSearch] = useState("");
  const [placeList, setPlaceList] = useState([]);

  const getPlaces = async (search) => {
    try {
      const res = await fetch(
        `https://api.tomtom.com/search/2/geocode/${search}.json?key=${API_KEY}`
      );
      const geocode = await res.json();
      console.log(geocode.results[0]);
      const res2 = await fetch(
        `https://api.tomtom.com/search/2/categorySearch/"music".json?key=${API_KEY}&lat=${geocode.results[0].position.lat}&lon=${geocode.results[0].position.lon}&limit=50&categorySet=7318003,9361059,7318002`
      );
      const places = await res2.json();
      setPlaceList(places.results);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    console.log("User clicked submit");
    getPlaces(search);
  };

  // useEffect(() => {
  //   getPlaces();
  // },[]);

  return (
    <div className={styles.container}>
      <Head>
        <title>City Sounds</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>City Sounds</h1>

        <p className={styles.description}>
          Find and support your local music stores and venues
        </p>

        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchBar}
            />
          </label>

          <button type="submit">submit</button>
        </form>
        <ul className={styles.places}>
          {placeList &&
            placeList.map((place) => {

              return <Place key={place.id} place={place.poi.name} address={place.address.freeformAddress} website={place.poi.url} id={place.id}/>;
            })}
        </ul>

        <footer className={styles.footer}></footer>
      </main>
    </div>
  );
}
