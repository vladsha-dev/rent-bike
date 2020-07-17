import Button from "./button";
const InfoManageField = ({ infoData, id, btnRent, btnDelete }) => {
  return (
    <>
      <div className="info-manage-field-wrapper">
        <div className="info-field">
          <span className="info-field-item">{infoData.name}</span> /{" "}
          <span className="info-field-item">{infoData.bikeType}</span> /{" "}
          <span className="info-field-item">${infoData.price}</span>
        </div>
        <div className="btn-wrapper">
          {btnRent ? (
            <div className="btn-rent">
              <Button
                value={"Rent"}
                bgColor={"#3750c7"}
                id={id}
                btnRent={btnRent}
              />
            </div>
          ) : null}
          {btnRent === false ? (
            <Button
              value={"Cancel rent"}
              bgColor={"#f2323f"}
              id={id}
              btnRent={btnRent}
            />
          ) : btnDelete ? (
            <Button
              value={"Delete"}
              bgColor={"#f2323f"}
              id={id}
              btnDelete={btnDelete}
            />
          ) : null}
        </div>
      </div>

      <style jsx>{`
        .info-manage-field-wrapper {
          height: 100px;
          border: 2px solid #d6d7d9;
          border-radius: 3px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          padding: 0 40px 0 35px;
          margin-bottom: 30px;
        }
        .info-field {
          font-size: 26px;
          letter-spacing: 0.5px;
        }
        .btn-rent {
          display: inline-block;
          margin-right: 25px;
        }
      `}</style>
    </>
  );
};
export default InfoManageField;
