import SectionTitle from "./common/sectionTitle";
import InfoManageField from "./common/infoManageField";
const Section = ({
  srcIcon,
  textOfTitle,
  generalSum,
  generalAmount,
  infoData,
  btnDelete,
  btnRent,
}) => {
  return (
    <>
      <div className="rent-user-wrapper">
        <SectionTitle
          src={srcIcon}
          textOfTitle={textOfTitle}
          generalSum={generalSum}
          generalAmount={generalAmount}
          infoData={infoData}
        />
        <div className="rent-user-fields">
          {infoData.map((elem, i) => (
            <InfoManageField
              key={i}
              id={elem._id}
              infoData={elem}
              btnDelete={btnDelete}
              btnRent={btnRent}
            />
          ))}
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
};
export default Section;
