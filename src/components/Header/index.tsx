import styles from "./style.module.scss";

import { useUserNameContext } from "../../context/usernameContext";

import { useNavigate } from "react-router-dom";
import { message } from "antd";

import pdfIcon from "../../assets/icons/pdf.svg";

const Header = () => {
  const { handleDataUsername } = useUserNameContext();
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("@Context/DataUsername");
    localStorage.setItem("@Context/StateLogin", "false");

    message.success("Você saiu da sua conta com sucesso!", 2);

    goToLoginPage();
  };

  return (
    <section className={styles.sectionHeader}>
      <img src={pdfIcon} alt="Logo da Vanguarda Tech" loading={"lazy"} />
      <div className={styles.containerInformations}>
        <h1>Bem vindo, {handleDataUsername}!</h1>
        <button onClick={logout}>SAIR</button>
      </div>
    </section>
  );
};

export default Header;
