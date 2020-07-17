const SectionTitle = ({
  src,
  textOfTitle,
  generalSum,
  generalAmount,
  infoData,
}) => {
  return (
    <>
      <div className="section-title-wrapper">
        <img className="small-icon" src={src} />
        <h2 className="title">{textOfTitle}</h2>
        {generalSum ? (
          <span className="status">
            (Total: $
            {infoData
              .map((obj) => obj.price)
              .reduce((acc, current) => acc + current, 0).toFixed(2)}
            )
          </span>
        ) : generalAmount ? (
          <span className="status">({infoData.length})</span>
        ) : null}
      </div>
      <style jsx>
        {`
          .section-title-wrapper {
            display: flex;
            align-items: center;
            margin-left: -12px;
            margin-bottom: 3px;
          }
          .title {
            font-size: 31px;
            letter-spacing: 0.75px;
            word-spacing: 0px;
          }
          .small-icon {
            width: 46px;
            height: 46px;
            margin-right: 5px;
          }
          .status {
            font-size: 31px;
            letter-spacing: 0.75px;
            font-weight: 600;
            word-spacing: 0px;
            margin-left: 9px;
            letter-spacing: -0.2px;
          }
        `}
      </style>
    </>
  );
};
export default SectionTitle;
