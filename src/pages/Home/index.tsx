import styles from "./style.module.scss";

import pdfIcon from "../../assets/icons/pdf.svg";
import Login from "../../components/Login";

const Home = () => {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.apresentationAside}>
        <img src={pdfIcon} alt="Ícone do PDF" loading={"lazy"} />
        <h1>Gerador de PDF</h1>
      </section>
      <Login />
    </main>
  );
};

export default Home;
