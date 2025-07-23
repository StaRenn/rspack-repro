import React from "react";

import { Button } from "../../uiLib";

import styles from "./Page.scss";

export const Page = () => {
  return <Button className={styles.button}>Should be blue</Button>;
};
