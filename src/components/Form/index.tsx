/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./style.module.scss";

import { useForm } from "react-hook-form";
import React, { useState, useRef, useEffect } from "react";

import { useReactToPrint } from "react-to-print";

import { Card, DatePicker, message, Radio, Select } from "antd";

import { disabledDate } from "../../utils/disabledDate";

import {
  handleChangeSelect,
  handleDateValue,
  handleRadioValue,
} from "../../utils/getInputValues";

import { DAYS_OF_THE_WEEK } from "../../utils/daysOfTheWeek";
import { TYPES_OF_SCHOOLING } from "../../utils/typesOfSchooling";

import { toast, ToastContainer } from "react-toastify";

import ComponentToPrint from "../ContainerToPrint";

import { useNavigate } from "react-router-dom";

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

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInformationsFormDTO>();

  const componentRef = useRef(null);
  const navigate = useNavigate();

  const { Option } = Select;

  const [victimSituation, setVictimSituation] = useState("");
  const [occurrenceDate, setOccurrenceDate] = useState("");
  const [occurenceDayOfTheWeek, setOccurenceDayOfTheWeek] = useState("");
  const [hasCam, setHasCam] = useState("false");
  const [hasSuspects, setHasSuspects] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [genre, setGenre] = useState("");
  const [schooling, setSchooling] = useState("");

  const goToLoginPage = () => {
    navigate("/");
  };

  const checkIfUserIsLogged = () => {
    const stateLogin = localStorage.getItem("@Context/StateLogin");

    if (stateLogin === "false") {
      message.warn("Você precisa estar logado para acessar essa página!", 2);
      goToLoginPage();
    }
  };

  useEffect(() => {
    checkIfUserIsLogged();
  }, []);

  const [handleDataForm, setHandleDataForm] = useState(
    {} as IInformationsFormDTO
  );

  const generateRandomNumber = (min: number, max: number) =>
    Math.floor(min + Math.random() * (max - min));

  const parseBool = (value: string) => (value === "true" ? true : false);

  const treatmentFields = {
    verifyIfFieldsAreEmpty: (value: string) => {
      const isVerified = !value ? true : false;

      return isVerified;
    },

    errorTreatmentFieldsEmpty: (errorMessage: string) => {
      toast.error(errorMessage, {
        theme: "light",
      });
    },
  };

  const treatmentToExportPDF = () => {
    if (treatmentFields.verifyIfFieldsAreEmpty(victimSituation)) {
      treatmentFields.errorTreatmentFieldsEmpty(
        "Selecione a situação da vítima"
      );

      return false;
    } else if (treatmentFields.verifyIfFieldsAreEmpty(occurrenceDate)) {
      treatmentFields.errorTreatmentFieldsEmpty(
        "Preencha a data da ocorrência"
      );

      return false;
    } else if (treatmentFields.verifyIfFieldsAreEmpty(occurenceDayOfTheWeek)) {
      treatmentFields.errorTreatmentFieldsEmpty(
        "Selecione qual foi o dia da semana da ocorrência"
      );

      return false;
    } else if (treatmentFields.verifyIfFieldsAreEmpty(hasCam)) {
      treatmentFields.errorTreatmentFieldsEmpty(
        "Selecione se no local existia câmeras de vigilância"
      );

      return false;
    } else if (treatmentFields.verifyIfFieldsAreEmpty(birthDate)) {
      treatmentFields.errorTreatmentFieldsEmpty(
        "Preencha a sua data de nascimento"
      );

      return false;
    } else if (treatmentFields.verifyIfFieldsAreEmpty(genre)) {
      treatmentFields.errorTreatmentFieldsEmpty("Selecione o seu gênero");

      return false;
    } else if (treatmentFields.verifyIfFieldsAreEmpty(schooling)) {
      treatmentFields.errorTreatmentFieldsEmpty("Selecione a sua escolaridade");

      return false;
    } else {
      return true;
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `RECOGNIÇÃO VISUOGRÁFICA DE LOCAL DE CRIME nº${handleDataForm.id}-2022`,
  });

  const exportToPDF = (data: IInformationsFormDTO) => {
    const continueExport = treatmentToExportPDF();

    if (continueExport) {
      const dataForm: IInformationsFormDTO = {
        ...data,
        suspectInformations:
          hasSuspects === "false" ? "" : data.suspectInformations,
        suspectsName: hasSuspects === "false" ? "" : data.suspectsName,
        victimSituation,
        occurrenceDate,
        occurenceDayOfTheWeek,
        hasCam: parseBool(hasCam),
        hasSuspects: parseBool(hasSuspects),
        birthDate,
        genre,
        schooling,
        id: generateRandomNumber(1000, 1),
      };

      setHandleDataForm(dataForm);
    }
  };

  useEffect(() => {
    if (handleDataForm.id !== undefined) {
      handlePrint();
    }
  }, [handleDataForm]);

  return (
    <section>
      <form onSubmit={handleSubmit(exportToPDF)}>
        <div className={styles.placeContainer}>
          <div className={styles.situationContainer}>
            <div className={styles.radioContainer}>
              <Radio.Group
                className={styles.radioContainer}
                onChange={(event) =>
                  handleRadioValue(event, setVictimSituation)
                }
              >
                <Radio value={"Vitima no Local"} className={styles.radio}>
                  Vítima no local
                </Radio>
                <Radio value={"Vitima socorrida"} className={styles.radio}>
                  Vítima socorrida
                </Radio>
              </Radio.Group>
            </div>
            {errors.victimSituation && (
              <span className={styles.messageError}>Campo obrigatório</span>
            )}
          </div>

          <div className={styles.hospitalContainer}>
            <span>Hospital</span>
            <input
              {...register("hospital", { required: true })}
              className={styles.input}
              placeholder="Digite o nome do Hospital"
              type="text"
            />
            {errors.hospital && (
              <span className={styles.messageErrorHospital}>
                Campo obrigatório
              </span>
            )}
          </div>
        </div>
        <Card title="Dados Essenciais de Ocorrência">
          <div className={styles.dataContainer}>
            <div className={styles.row}>
              <div className={styles.column}>
                <span>Endereço</span>
                <input
                  {...register("occurrenceAddress", { required: true })}
                  className={styles.input}
                  type="text"
                  placeholder="Digite seu endereço"
                />
                {errors.occurrenceAddress && (
                  <span className={styles.messageError}>Campo obrigatório</span>
                )}
              </div>
              <div className={styles.column}>
                <span>Bairro</span>
                <input
                  {...register("occurrenceNeighborhood", { required: true })}
                  className={styles.input}
                  type="text"
                  placeholder="Nome do seu bairro"
                />
                {errors.occurrenceNeighborhood && (
                  <span className={styles.messageError}>Campo obrigatório</span>
                )}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.column}>
                <span>Cidade</span>
                <input
                  {...register("occurrenceCity", { required: true })}
                  className={styles.input}
                  type="text"
                  placeholder="Digite sua cidade"
                />
                {errors.occurrenceCity && (
                  <span className={styles.messageError}>Campo obrigatório</span>
                )}
              </div>
              <div className={styles.column}>
                <span>AIS</span>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Área integrada de segurança pública"
                  {...register("ais")}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.columnDatePicker}>
                <span>Data</span>
                <DatePicker
                  onChange={(event) =>
                    handleDateValue(event, setOccurrenceDate)
                  }
                  disabledDate={disabledDate}
                  format={"DD/MM/YYYY"}
                  style={{ display: "flex" }}
                  placeholder="00/00/0000"
                />
              </div>
              <div className={styles.columnDayOfTheWeekAndHour}>
                <div className={styles.daysOfTheWeek}>
                  <span>Dia da Semana</span>
                  <Select
                    placeholder="Selecione"
                    onChange={(value: string) =>
                      handleChangeSelect(value, setOccurenceDayOfTheWeek)
                    }
                  >
                    {DAYS_OF_THE_WEEK.map((day, index) => {
                      return (
                        <Option key={index} value={day}>
                          {day}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <div style={{ width: "100%" }}>
                  <span>Hora Provável</span>
                  <input
                    {...register("probableTime", {
                      required: true,
                    })}
                    maxLength={5}
                    pattern={"([01][0-9]|2[0-3]):[0-5][0-9]"}
                    className={styles.input}
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="Ex: 00:00"
                  />
                  {errors.probableTime && (
                    <span className={styles.messageError}>
                      Campo obrigatório
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.column}>
                <span>Há câmeras de vigilância no local ou no entorno? </span>
                <div style={{ marginTop: "0.5rem" }}>
                  <Radio.Group
                    className={styles.radioContainer}
                    onChange={(event) => handleRadioValue(event, setHasCam)}
                  >
                    <Radio value={"true"} className={styles.radio}>
                      Sim
                    </Radio>
                    <Radio value={"false"} className={styles.radio}>
                      Não
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div>
              <h1 className={styles.title}>Suspeitos</h1>
              <div className={styles.rowSuspects}>
                <div className={styles.columnSuspects}>
                  <span>Há suspeitos?</span>
                  <div style={{ marginTop: "0.5rem" }}>
                    <Radio.Group
                      className={styles.radioContainer}
                      onChange={(event) =>
                        handleRadioValue(event, setHasSuspects)
                      }
                    >
                      <Radio value={"true"} className={styles.radio}>
                        Sim
                      </Radio>
                      <Radio value={"false"} className={styles.radio}>
                        Não
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
                {hasSuspects === "true" && (
                  <div className={styles.column}>
                    <span>Nome(s) / Cognome(s)</span>
                    <input
                      {...register("suspectsName")}
                      className={styles.input}
                      type="text"
                      placeholder="Nomes"
                    />
                  </div>
                )}
              </div>
              {hasSuspects === "true" && (
                <div className={styles.column} style={{ marginTop: "1rem" }}>
                  <span>Informações relevantes sobre o (s) suspeito (s): </span>
                  <textarea
                    {...register("suspectInformations", { required: true })}
                    className={styles.input}
                    rows={4}
                    cols={50}
                    placeholder="Digite as informações relevantes sobre o(s) suspeito(s)"
                  />
                  {errors.suspectInformations && (
                    <span className={styles.messageError}>
                      Campo obrigatório
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className={styles.victimDataContainer}>
              <h1 className={styles.title}>Dados da vítima</h1>

              <div className={styles.row}>
                <div className={styles.column}>
                  <span>Nome</span>
                  <input
                    {...register("name", { required: true })}
                    className={styles.input}
                    type="text"
                    placeholder="Nome"
                  />
                  {errors.name && (
                    <span className={styles.messageError}>
                      Campo obrigatório
                    </span>
                  )}
                </div>
                <div className={styles.column}>
                  <span>Data de Nascimento</span>
                  <DatePicker
                    onChange={(event) => handleDateValue(event, setBirthDate)}
                    disabledDate={disabledDate}
                    format={"DD/MM/YYYY"}
                    style={{ display: "flex" }}
                    placeholder="00/00/0000"
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.column}>
                  <span>Filiação</span>
                  <input
                    {...register("filiation", { required: true })}
                    className={styles.input}
                    type="text"
                    placeholder="Filiação"
                  />
                  {errors.filiation && (
                    <span className={styles.messageError}>
                      Campo obrigatório
                    </span>
                  )}
                </div>
                <div className={styles.column}>
                  <span>Sexo</span>
                  <div style={{ marginTop: "0.5rem" }}>
                    <Radio.Group
                      className={styles.radioContainer}
                      onChange={(event) => handleRadioValue(event, setGenre)}
                    >
                      <Radio value={"M"} className={styles.radio}>
                        Masculino
                      </Radio>
                      <Radio value={"F"} className={styles.radio}>
                        Feminino
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.column}>
                  <span>Endereço</span>
                  <input
                    {...register("address", { required: true })}
                    className={styles.input}
                    type="text"
                    placeholder="Digite seu endereço"
                  />
                  {errors.address && (
                    <span className={styles.messageError}>
                      Campo obrigatório
                    </span>
                  )}
                </div>
                <div className={styles.column}>
                  <span>Bairro</span>
                  <input
                    {...register("neighborhood", { required: true })}
                    className={styles.input}
                    type="text"
                    placeholder="Nome do seu bairro"
                  />
                  {errors.neighborhood && (
                    <span className={styles.messageError}>
                      Campo obrigatório
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.column}>
                  <span>Cidade</span>
                  <input
                    {...register("city", { required: true })}
                    className={styles.input}
                    type="text"
                    placeholder="Digite sua cidade"
                  />
                  {errors.city && (
                    <span className={styles.messageError}>
                      Campo obrigatório
                    </span>
                  )}
                </div>
                <div className={styles.column}>
                  <span>Ponto de Referência</span>
                  <input
                    {...register("referenceLocation", { required: true })}
                    className={styles.input}
                    type="text"
                    placeholder="Dê um ponto de referência"
                  />
                  {errors.referenceLocation && (
                    <span className={styles.messageError}>
                      Campo obrigatório
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.schoolingContainer}>
                  <span>Escolaridade</span>
                  <Select
                    placeholder="Selecione"
                    onChange={(value: string) =>
                      handleChangeSelect(value, setSchooling)
                    }
                  >
                    {TYPES_OF_SCHOOLING.map((type, index) => {
                      return (
                        <Option key={index} value={type}>
                          {type}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.submitContainer}>
            <ComponentToPrint
              data={handleDataForm}
              componentRef={componentRef}
            />

            <button className={styles.submitButton} type="submit">
              Exportar para PDF
            </button>
          </div>
        </Card>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default Form;
