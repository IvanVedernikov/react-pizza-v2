import React from "react";
import styles from "./NotFoundBlock.module.css";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😟</span>
        <br />
        Ничего не найдено
      </h1>
      <div className="description">
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </div>
    </div>
  );
};

export default NotFoundBlock;
