import SectionTitle from "./common/sectionTitle";
import Button from "./common/button";
import { Formik, Form, Field } from "formik";
import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
const validateName = (value) => {
  let error;
  if (!value) {
    error = "Should be filled";
  }
  return error;
};
const validateTypeList = (value) => {
  let error;
  if (!value) {
    error = "Should be filled";
  } else if (
    !Array.from(document.querySelectorAll("#types option")).some(
      (el) => el.value === value
    )
  ) {
    error = "Invalid statement, should be choosen from the list";
  }
  return error;
};
const validatePrice = (value) => {
  let error;
  if (value === "") {
    error = "Should be filled";
  } else if (
    !/^[0-9]+(\.[0-9]{1,2})?$/i.test(value) ||
    /^[A-Za-z]$/i.test(value)
  ) {
    error = "Invalid statement";
  }
  return error;
};
const NewRentForm = () => {
  const [form, setForm] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (isSubmitting) {
      createNote();
      setIsSubmitting(!isSubmitting);
      setTimeout(() => location.reload(true), 200);
    }
  });
  const createNote = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          bikeType: "",
          price: "",
          isRented: "false",
        }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setForm(values);
          setIsSubmitting(!isSubmitting);
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          values,
          handleSubmit,
          handleBlur,
          handleChange,
        }) => (
          <Form onSubmit={handleSubmit} className="form-content">
            <fieldset>
              <legend>
                <SectionTitle
                  src={"/img/rich.svg"}
                  textOfTitle={"Create new rent"}
                />
              </legend>
              <div className="inputs-wrapper">
                <div
                  className={errors.name && touched.name ? "row error" : "row"}
                >
                  <label>Bike name</label>
                  <Field
                    name="name"
                    type="text"
                    maxLength="30"
                    validate={validateName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ex. Cannondale S6"
                    className="content-input"
                  />
                  {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                  )}
                </div>
                <div
                  className={
                    errors.bikeType && touched.bikeType ? "row error" : "row"
                  }
                >
                  <label htmlFor="typeList">Bike type</label>
                  <Field
                    name="bikeType"
                    list="types"
                    id="typeList"
                    validate={validateTypeList}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Custom"
                    className="content-input"
                  />
                  {errors.bikeType && touched.bikeType && (
                    <div className="input-feedback">{errors.bikeType}</div>
                  )}
                  <datalist id="types">
                    <option value="Custom" />
                    <option value="Mountain" />
                    <option value="Stunt" />
                    <option value="Racing" />
                    <option value="Kids" />
                  </datalist>
                </div>
                <div
                  className={
                    errors.price && touched.price ? "row error" : "row"
                  }
                >
                  <label>Rent Price</label>
                  <Field
                    name="price"
                    type="number"
                    validate={validatePrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="99.00"
                    className="content-input price-input"
                  />
                  {errors.price && touched.price && (
                    <div className="input-feedback">{errors.price}</div>
                  )}
                </div>
                <div className="btn-wrapper">
                  <Button
                    value={"Submit rent"}
                    type={"submit"}
                    disabledSetting={
                      isSubmitting ||
                      Object.values(values).includes("") ||
                      errors.name ||
                      errors.bikeType ||
                      errors.price
                    }
                    bgColor={"#23ba99"}
                  />
                </div>
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
      <style jsx>
        {`
          .inputs-wrapper {
            display: flex;
            height: 151px;
            padding: 0 37px 0 37px;
            background-color: #e9eaee;
            border: 2px solid #d6d7d9;
            border-radius: 3px;
            display: flex;
            justify-content: space-between;
          }
          .row {
            display: flex;
            flex-direction: column;
            padding: 0;
            display: flex;
            flex-direction: column;
            padding-top: 23px;
          }
          .btn-wrapper {
            margin-top: 18px;
            padding-top: 34px;
          }
          .input-feedback {
            color: #f4313f;
            margin-top: 10px;
            font-size: 15px;
          }
          label {
            font-size: 18px;
            padding-bottom: 6px;
            word-spacing: 2px;
          }
        `}
      </style>
      <style jsx global>
        {`
          .form-content input::-webkit-outer-spin-button,
          .form-content input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          .form-content input[type="number"] {
            -moz-appearance: textfield;
          }
          .form-content .content-input {
            width: 342px;
            height: 56px;
            border-radius: 5px;
            border: 2px solid #d6d7d9;
            font-family: "Roboto", sans-serif;
            outline: none;
            padding: 0 12px 0 12px;
            font-size: 20px;
          }
          .form-content .price-input {
            width: 158px;
          }
          .error .content-input {
            border-color: #f4313f;
          }
          .form-content fieldset {
            border: none;
            padding: 0;
            margin: 0;
          }
          .form-content .content-input:-webkit-autofill,
          .form-content .content-input:-webkit-autofill:hover,
          .form-content .content-input:-webkit-autofill:focus {
            border: 1px solid #d6d7d9;
            -webkit-text-fill-color: #505050;
            transition: background-color 5000s ease-in-out 0s;
          }
          ::-webkit-input-placeholder {
            font-size: 20px;
          }
          ::-moz-placeholder {
            font-size: 20px;
          }
          :-moz-placeholder {
            font-size: 20px;
          }
          :-ms-input-placeholder {
            font-size: 20px;
          }
        `}
      </style>
    </>
  );
};
export default NewRentForm;
