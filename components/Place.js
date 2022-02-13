import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Place.module.css";
import Image from "next/image";

const API_KEY = "u1Jom8qikw4A3dUo3uPxgm3fnRGb0tzy";

export default function Place({ place, address, website, id }) {
  const [photo, setPhoto] = useState();

  const getDetails = async () => {
    try {
      console.log(id);
      const res = await fetch(
        `https://api.tomtom.com/search/2/poiDetails.json?key=${API_KEY}&id=${id}`
      );
      const details = await res.json();
      console.log(details.result.photos[0].id);
      const res2 = await fetch(
        `https://api.tomtom.com/search/2/poiPhoto?key=${API_KEY}&id=${details.result.photos[0].id}`
      );
      console.log(res2);
      setPhoto(res2);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <li className={styles.article}>
      <h3 className={styles.title}>{place}</h3>
      <p>{address}</p>
      {website && (
        <a href={`https://${website}`} target="_blank" rel="noreferrer">
          Website
        </a>
      )}
      <button onClick={getDetails}>details</button>
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
    </li>
  );
}

// Place.propTypes = {
//   place: PropTypes.shape({
//     type: PropTypes.string.isRequired
//   }).isRequired
// }
