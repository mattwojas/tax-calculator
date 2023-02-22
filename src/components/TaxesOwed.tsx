const TaxesOwed = ({ ...props }) => {
  const { owed } = props;
  return (
    <>
      <h4>Taxes Owed:</h4>
      <p data-testid="taxes_owed">${Number(owed).toFixed(2)}</p>
    </>
  );
};

export default TaxesOwed;
