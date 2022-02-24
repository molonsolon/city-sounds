import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Place from "../components/Place";
import SearchIcon from "../public/searchGlass.svg";
const API_KEY = "u1Jom8qikw4A3dUo3uPxgm3fnRGb0tzy";
import { AnimatePresence, motion } from "framer-motion";
import EighthNotes from "../public/eight-notes.svg";
import QuarterNoteUp from "../public/quarter-note-up.svg";
import QuarterNoteDown from "../public/quarter-note-down.svg";
import FlowerRight from "../public/sunflower-right.svg";
import FlowerLeft from "../public/sunflower-left.svg";

export default function Home() {
  const [search, setSearch] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const [page, setPage] = useState(0);

  // i  need to build a page function that will slide the places container
  // to the left, resulting in the first column sliding off screen to the left.
  // this will need to be triggered with buttons places on
  // the bottom of each column for navigating forwards and backwards
  // through the pages. I will need to have a current page state in order to
  // properly control these pages (next and previous only present when applicable)
  //
  // NEW IDEA FOR PAGES
  // store sets of 10-20 results into different pages using an array method on the
  // tomtom api response. Then store them using state. After that, I can display
  // each group of responses as pages using a paginate function that moves between each
  // page array.

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

  return (
    <div className={styles.container}>
      <Head>
        <title>City Sounds</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00ffbb" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#5dfdcb" />
      </Head>
      <main className={styles.main}>
        <section className={styles.header}>
          <h1 className={styles.title}>City Sounds</h1>
          <p className={styles.description}>
            Find and support your local music stores and venues
          </p>
          <div className={styles.musicNotes}>
            <motion.div
              className={styles.quarterNoteDown}
              animate={{
                rotate: 360,
                transition: {
                  duration: 8,
                  repeatType: "loop",
                  repeat: Infinity,
                  ease: "linear",
                  stiffness: 500,
                },
                rotateZ: 360,
              }}
            >
              <Image
                src={QuarterNoteDown}
                alt="A quarter note in musical notation with flag facing down"
              />
            </motion.div>
            <motion.div
              className={styles.quarterNoteUp}
              animate={{
                rotate: 360,
                transition: {
                  duration: 12,
                  repeatType: "loop",
                  repeat: Infinity,
                  ease: "linear",
                  stiffness: 500,
                },
              }}
            >
              <Image
                src={QuarterNoteUp}
                alt="A quarter note in musical notation with flag facing down"
              />
            </motion.div>
            <motion.div
              className={styles.eigthNotes}
              animate={{
                translateX: 10,
                translateY: -10,
                transition: {
                  duration: 2,
                  repeatType: "reverse",
                  repeat: Infinity,
                  ease: [0, -0.06, 0.97, 0.74],
                  stiffness: 0,
                },
              }}
            >
              <Image
                src={EighthNotes}
                alt="A pair of barred eighth notes in musical notation"
              />
            </motion.div>
          </div>
          <div className={styles.flowerContainer}>
            <div className={styles.flowerRight}>
              <Image
                src={FlowerRight}
                alt="A styled sunflower with city buildings sitting on top of it"
              />
            </div>
            <div className={styles.flowerLeft}>
              <Image
                src={FlowerLeft}
                alt="A styled sunflower with city buildings sitting on top of it"
              />
            </div>
          </div>
        </section>

        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchBar}
            placeholder="Enter your city, state, and country"
          />

          <button type="submit">
            <Image
              src={SearchIcon}
              alt="A rectangular magnifying glass that serves as a search button"
              height="30px"
              width="30px"
            />
          </button>
        </form>
        <motion.ul className={styles.places} animate={{ x: `${page}vw` }}>
          {placeList &&
            placeList.map((place) => {
              return (
                <Place
                  key={place.id}
                  place={place.poi.name}
                  address={place.address.freeformAddress}
                  website={place.poi.url}
                  id={place.id}
                />
              );
            })}
        </motion.ul>
        <motion.div className={styles.pageButtons}>
          {page < 0 && (
            <motion.button
              onClick={() => {
                setPage(page + 90);
                console.log(page);
              }}
            >
              Previous
            </motion.button>
          )}
          {page > -270 && (
            <motion.button
              onClick={() => {
                setPage(page - 90);
                console.log(page);
              }}
            >
              Next
            </motion.button>
          )}
        </motion.div>

        <footer className={styles.footer}></footer>
      </main>
    </div>
  );
}
