import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <section className={styles.container}>
      <div className={styles.spinner}>
        <div className="relative">
          <span className={styles.spinnerText}>B</span>
          <img src="/tornado.gif" />
        </div>
      </div>
    </section>
  );
};

export default Spinner;
