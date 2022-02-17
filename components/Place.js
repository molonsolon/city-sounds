import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Place.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

const API_KEY = "u1Jom8qikw4A3dUo3uPxgm3fnRGb0tzy";

export default function Place({ place, address, website, id }) {
  const [description, setDescription] = useState("");

  const getDetails = async () => {
    try {
      console.log(id);
      const res = await fetch(
        `https://api.tomtom.com/search/2/poiDetails.json?key=${API_KEY}&id=${id}`
      );
      const details = await res.json();
      if (details.result.description) {
        setDescription(details.result.description);
      }
      console.log(details);
    } catch (e) {
      console.error(e);
    }
  };

  const clickHandler = () => {
    if (description === "") {
      getDetails();
    } else {
      setDescription("");
    }
  };

  return (
    <motion.li
      className={styles.article}
      whileHover={{
        scale: 1.05,
        transition: {
          ease: "easeInOut",
          stiffness: 500,
        },
      }}
    >
      <h3 className={styles.title}>{place}</h3>
      <p>{address}</p>
      {website && (
        <a href={`https://${website}`} target="_blank" rel="noreferrer">
          Website
        </a>
      )}
      <button onClick={clickHandler}>details</button>
      {/* <figure className="photosContainer">
        {photo && (
          <Image
            className={styles.photos}
            src={photo.url}
            alt="Photo of specified local business"
            height="100%"
            width="100%"
          />
        )}
      </figure> */}
      {description && <p>{description}</p>}
    </motion.li>
  );
}

// Place.propTypes = {
//   place: PropTypes.shape({
//     type: PropTypes.string.isRequired
//   }).isRequired
// }
