import { Box } from '@mui/material';
import styles from './Preview.module.css'
export const Preview = () => {
  return (
    <Box className={styles["header-container"]}>
      <Box className={styles["poster"]}>
        <h1 className={styles["header-text"]}>Bid It To <a href="#" id="style-2" data-replace="Win"><span>Win</span></a> It</h1>
        <p className={styles["header-description"]}>Looking to buy or sell items easily and securely? Look no further than our online auction app! With a user-friendly interface and advanced security measures, you can bid, buy, and sell with confidence. Join our community of savvy buyers and sellers today and turn your unwanted items into cash or find your next great deal.</p>
      </Box>
      <article className={styles['card']}>
        <Box className={styles["temporary_text"]}>
          <p className={styles["temporary_text-inside"]}>
            Is it possible that you have been feeling a bit overlooked recently?
          </p>
        </Box>
        <Box className={styles["card_content"]}>
          <span className={styles["card_title"]}></span>
          <span className={styles["card_subtitle"]}></span>
          <p className={styles["card_description"]}>
            You have our undivided attention here!
          </p>
        </Box>
      </article>
    </Box>
  );
};
