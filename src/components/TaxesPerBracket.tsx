const TaxesPerBracket = ({ ...props }) => {
  const { bracketsOwed } = props;

  return (
    <>
      <h4>Owed per bracket:</h4>
      <ul>
        {Array.from(bracketsOwed.keys()).map((i) => {
          return (
            <li data-testid="owed_bracket" key={"bRates" + i}>
              <div>
                For the tax bracket rate of:{" "}
                <strong>{bracketsOwed.get(i).rate}</strong>
              </div>
              <div>
                You owe the total:{" "}
                <strong>${bracketsOwed.get(i).total.toFixed(2)}</strong>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TaxesPerBracket;
