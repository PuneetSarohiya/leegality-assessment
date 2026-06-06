import React from "react";
import Spinner from "react-spinkit";
import styles from "../../styles/Loader.module.css";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <Spinner
        name="line-spin-fade-loader"
        color="#171e28"
        fadeIn="none"
      />
    </div>
  );
}

export default Loader;