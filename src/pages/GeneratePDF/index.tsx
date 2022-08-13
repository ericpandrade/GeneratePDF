/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./style.module.scss";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";

import { Card, message } from "antd";

import logoPC from "../../assets/logoPC.png";
import Form from "../../components/Form";

const GeneratePDF = () => {
  const stateLogin = localStorage.getItem("@Context/StateLogin");
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/");
  };

  const checkIfUserIsLoggedIn = () => {
    if (!stateLogin) {
      message.warn("Você precisa estar logado para acessar essa página!", 2);
      goToLoginPage();
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <main className={styles.mainContainer}>
      <Header />

      <section className={styles.formContainer}>
        <Card
          title={
            <div className={styles.cardTitleContaier}>
              <img src={logoPC} alt="Símbolo da Polícia Civil do CE" />
              <h1>RECOGNIÇÃO VISUOGRÁFICA DE LOCAL DE CRIME</h1>
            </div>
          }
          bordered={true}
          className={styles.cardContainer}
        >
          <Form />
        </Card>
      </section>
    </main>
  );
};

export default GeneratePDF;
