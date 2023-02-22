const EffectiveRate = ({ ...props }) => {
  const { effectiveRate, placeholder } = props;
  return (
    <>
      <h4>Effective Rate:</h4>
      <p data-testid="effective_rate">{!isNaN(effectiveRate) ? effectiveRate.toFixed(2) + "%" : placeholder}</p>
    </>
  );
};

export default EffectiveRate;
