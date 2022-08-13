import { RadioChangeEvent } from "antd";

// Params -> Event + SetStateAction do you want to save the state.

export const handleRadioValue = (
  event: RadioChangeEvent,
  setHandleRadioValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setHandleRadioValue(event.target.value);
};

export const handleDateValue = (
  event: moment.Moment | null,
  setHandleDateValue: React.Dispatch<React.SetStateAction<string>>
) => {
  event && setHandleDateValue(event.format("DD/MM/YYYY"));
};

export const handleChangeSelect = (
  value: string,
  setHandleValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setHandleValue(value);
};
