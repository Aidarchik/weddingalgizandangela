import { useState } from "react";
import "./guest-form.css";

export default function GuestForm() {
  const [name, setName] = useState("");
  const [load, setLoad] = useState(false);
  const [validate, setValidate] = useState(true);
  const [visible, setVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const onChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const onSendDataHendler = async (event) => {
    event.preventDefault();
    setVisible(true);
    setLoad(true);
    if (name !== "" && question !== "") {
      try {
        await fetch("/api/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            question,
          }),
        });
        setValidate(true);
      } catch (error) {
        console.log("Error:", error.message);
      }
    } else setValidate(false);
    setLoad(false);
  };
  return (
    <div className="guest_form mx-auto section_width relative z-10">
      <div className="section_title">Анкета гостя</div>
      <label>
        Просьба дать свой ответ до <span className="number">01.07.2024</span>
      </label>
      <form action="#" method="post" className="guest_form__body">
        <div className="guest_form__title">Ваши Имя и Фамилия</div>
        <div className="guest_form__item">
          <input
            type="text"
            name="name"
            id="formName"
            placeholder="Иван Иванов/Мария Ивановна"
            className={`guest_form__input ${!validate && "validate"}`}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="guest_form__title">Ваше присутствие:</div>
        <div className={`guest_form__item ${!validate && "validate"}`}>
          <div className="options">
            <div className="options__item ">
              <input
                type="radio"
                id="formYesQuestion"
                name="question"
                value="yes"
                className="options__input"
                checked={question === "yes" ? true : false}
                onChange={onChangeQuestion}
              />
              <label htmlFor="formYesQuestion" className="options__label">
                Да, с удовольствием!
              </label>
            </div>
          </div>
          <div className="options">
            <div className="options__item">
              <input
                type="radio"
                id="formNoQuestion"
                name="question"
                value="no"
                className="options__input"
                checked={question === "no" ? true : false}
                onChange={onChangeQuestion}
              />
              <label htmlFor="formNoQuestion" className="options__label">
                К сожалению, не смогу
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={onSendDataHendler}
          className="guest_form__button"
          disabled={load}
        >
          {load
            ? "Отправка..."
            : validate && visible
            ? "Отправлено"
            : "Отправить"}
        </button>
        <div
          className={`info-block ${!visible && "info-block__visible"} ${
            !validate && "info-block__validate"
          }`}
        >
          {`${validate ? "Спасибо за ваш ответ" : "Заполните все поля"}`}
        </div>
      </form>
    </div>
  );
}
