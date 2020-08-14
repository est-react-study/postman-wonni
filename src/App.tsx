import React from "react";

import styles from "./css/scss.module.scss";

const App: React.FC = () => {
  return (
    <div>
      <div>postman wonni!!</div>
      <div className={`${styles.icon} ${styles.icon_red}`} />
      <div className={`${styles.icon} ${styles.icon_orange}`} />
      <div className={`${styles.icon} ${styles.icon_yellow}`} />
      <div className={`${styles.icon} ${styles.icon_green}`} />
      <div className={`${styles.icon} ${styles.icon_blue}`} />
      <div className={`${styles.icon} ${styles.icon_indigo}`} />
      <div className={`${styles.icon} ${styles.icon_violet}`} />
    </div>
  );
};

export default App;
