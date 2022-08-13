import { Card, Col, Row } from "antd";
import { TYPES_OF_SCHOOLING } from "../../utils/typesOfSchooling";
import styles from "./style.module.scss";

interface IProps {
  data: IInformationsFormDTO;
  componentRef: React.MutableRefObject<null>;
}

interface IInformationsFormDTO {
  victimSituation: string;

  occurrenceAddress: string;
  occurrenceNeighborhood: string;
  occurrenceCity: string;
  occurrenceDate: string;
  occurenceDayOfTheWeek: string;
  probableTime: string;

  hasCam: boolean;
  hasSuspects: boolean;
  birthDate: string;
  genre: string;
  schooling: string;

  ais?: string;
  hospital: string;

  suspectsName: string;
  suspectInformations: string;

  name: string;
  filiation: string;
  address: string;
  neighborhood: string;
  city: string;
  referenceLocation: string;
  id: number;
}

const ComponentToPrint = (props: IProps) => {
  return (
    <div style={{ display: "none" }}>
      <main className={styles.mainContainer} ref={props.componentRef}>
        <div className={styles.apresentationContaier}>
          <h1 className={styles.title}>
            RECOGNIÇÃO VISUOGRÁFICA DE LOCAL DE CRIME nº {props.data.id}/2020
          </h1>
          <div className={styles.victimSituation}>
            <span>
              ( {props.data.victimSituation === "Vitima no Local" ? "X" : ""} )
              <strong>Vítima no Local</strong>
            </span>
            <span>
              ( {props.data.victimSituation === "Vitima socorrida" ? "X" : ""} )
              <strong>Vítima Socorrida</strong>
            </span>
            <span>
              <strong>Hospital:</strong> {props.data.hospital}
            </span>
          </div>
        </div>

        <Card
          bordered
          title={
            <h1 className={styles.cardTitle}>Dados Essenciais da Ocorrência</h1>
          }
          className={styles.cardContainer}
        >
          <Row className={styles.row}>
            <Col className={styles.col} span={10}>
              <strong>Endereço: </strong>
              <span>{props.data.occurrenceAddress}</span>
            </Col>
            <Col className={styles.col} span={10}>
              <strong>Bairro: </strong>
              <span>{props.data.occurrenceNeighborhood}</span>
            </Col>
            {props.data?.ais !== undefined && (
              <Col className={styles.col} span={4}>
                <strong>AIS: </strong>
                <span>{props.data?.ais}</span>
              </Col>
            )}
          </Row>
          <Row className={styles.row}>
            <Col className={styles.col} span={10}>
              <strong>Cidade: </strong>
              <span>{props.data.occurrenceCity}</span>
            </Col>
            <Col className={styles.col} span={10}>
              <strong>Data: </strong>
              <span>{props.data.occurrenceDate}</span>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.col} span={10}>
              <strong>Dia da semana: </strong>
              <span>{props.data.occurenceDayOfTheWeek}</span>
            </Col>
            <Col className={styles.col} span={10}>
              <strong>Hora provável do crime: </strong>
              <span>{props.data.probableTime}</span>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.col} span={10}>
              <strong>Há câmeras de vigilância no local ou no entorno? </strong>
            </Col>
            <Col className={styles.col} span={5}>
              <span>
                Sim <br /> ( {props.data.hasCam ? "X" : ""} )
              </span>
            </Col>
            <Col className={styles.col} span={5}>
              <span>
                Não <br /> ( {!props.data.hasCam ? "X" : ""} )
              </span>
            </Col>
          </Row>
          <div className={styles.apresentationContaier}>
            <h1 style={{ margin: "0.75rem 0" }} className={styles.title}>
              Suspeitos
            </h1>
          </div>
          <Row className={styles.row}>
            <Col className={styles.col} span={4}>
              <strong>Há Suspeitos: </strong>
            </Col>
            <Col className={styles.col} span={3}>
              <span>
                Sim <br /> ( {props.data.hasSuspects ? "X" : ""} )
              </span>
            </Col>
            <Col className={styles.col} span={3}>
              <span>
                Não <br /> ( {!props.data.hasSuspects ? "X" : ""} )
              </span>
            </Col>
            {props.data.suspectsName && (
              <Col className={styles.col} span={10}>
                <strong>Nome(s)/Cognome(s): </strong>
                <span>{props.data.suspectsName}</span>
              </Col>
            )}
          </Row>
          {props.data.suspectInformations && (
            <Row className={styles.row}>
              <Col className={styles.col} span={23}>
                <strong>
                  Informações relevantes sobre o (s) suspeito (s):{" "}
                </strong>
                <span>{props.data.suspectInformations}</span>
              </Col>
            </Row>
          )}
          <div className={styles.apresentationContaier}>
            <h1 style={{ margin: "0.75rem 0" }} className={styles.title}>
              Dados da vítima
            </h1>
          </div>
          <Row className={styles.row}>
            <Col className={styles.col} span={10}>
              <strong>Nome: </strong>
              <span>{props.data.name}</span>
            </Col>
            <Col className={styles.col} span={10}>
              <strong>D.N: </strong>
              <span>{props.data.birthDate}</span>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.col} span={10}>
              <strong>Filiação: </strong>
              <span>{props.data.filiation}</span>
            </Col>
            <Col className={styles.col} span={3}>
              <strong>Sexo </strong>
            </Col>
            <Col className={styles.col} span={5}>
              <span>( {props.data.genre === "M" ? "X" : ""} ) Masculino</span>
            </Col>
            <Col className={styles.col} span={5}>
              <span>( {props.data.genre === "F" ? "X" : ""} ) Feminino</span>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.col} span={10}>
              <strong>Endereço: </strong>
              <span>{props.data.address}</span>
            </Col>
            <Col className={styles.col} span={10}>
              <strong>Bairro: </strong>
              <span>{props.data.neighborhood}</span>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.col} span={10}>
              <strong>Cidade: </strong>
              <span>{props.data.city}</span>
            </Col>
            <Col className={styles.col} span={10}>
              <strong>Referência: </strong>
              <span>{props.data.referenceLocation}</span>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.col} span={5}>
              <strong>Escolaridade</strong>
            </Col>
            <Col className={styles.col} span={19}>
              <div className={styles.educationContainer}>
                {TYPES_OF_SCHOOLING.map((type, index) => (
                  <div key={index} className={styles.education}>
                    ( {type === props.data.schooling ? "X" : ""} ) {type}
                  </div>
                ))}
                <div className={styles.disabledOption} />
              </div>
            </Col>
          </Row>
        </Card>
      </main>
    </div>
  );
};

export default ComponentToPrint;
