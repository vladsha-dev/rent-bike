import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
const Button = ({
  disabledSetting,
  type,
  bgColor,
  value,
  id,
  btnRent,
  btnDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState();
  const [isRenting, setIsRenting] = useState();
  useEffect(() => {
    if (isDeleting) {
      deleteField();
      setIsDeleting(false);
      setTimeout(() => location.reload(true), 200);
    } else if (isRenting) {
      rentBicycle();
      setTimeout(() => location.reload(true), 200);
    } else if (isRenting === false) {
      cancelBicycle();
      setTimeout(() => location.reload(true), 200);
    }
  });
  const deleteField = async () => {
    const fieldId = id;
    try {
      const deleted = await fetch(
        `https://rent-bike.vercel.app/api/notes/${fieldId}`,
        {
          method: "Delete",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const rentBicycle = async () => {
    const fieldId = id;
    try {
      const res = await fetch(
        `https://rent-bike.vercel.app/api/notes/${fieldId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isRented: isRenting,
            dateStartRent: Date.now(),
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const cancelBicycle = async () => {
    const fieldId = id;
    try {
      const res = await fetch(
        `https://rent-bike.vercel.app/api/notes/${fieldId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isRented: false, dateStartRent: null }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    setIsDeleting(true);
  };
  const handleRent = async () => {
    setIsRenting(true);
  };
  const handleCancel = async () => {
    setIsRenting(false);
  };
  return (
    <>
      <button
        type={type}
        disabled={disabledSetting}
        className="btn-submit"
        onClick={() =>
          btnDelete
            ? handleDelete()
            : btnRent
            ? handleRent()
            : btnRent === false
            ? handleCancel()
            : null
        }
      >
        {value}
      </button>
      <style jsx>
        {`
          .btn-submit {
            height: 57px;
            width: 165px;
            border: none;
            background-color: ${bgColor};
            border-radius: 5px;
            outline: none;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
          }
          .btn-submit:disabled {
            background-color: #87b6ac;
            cursor: default;
          }
        `}
      </style>
    </>
  );
};
export default Button;
