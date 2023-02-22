const IncomeForm = ({ ...props }) => {
  const { onSubmit, onChange, formError } = props;
  return (
    <>
      <h3>Income</h3>
      <form data-testid="income_form" action="" onSubmit={onSubmit}>
        <label htmlFor="income">Enter your income:</label>
        <input
          type="number"
          data-testid="income_input"
          name="income"
          id="income"
          onChange={onChange}
        />
        <button data-testid="income_button">Calculate</button>
      </form>
      {formError && <p className="errorText">Please input an income value</p>}
    </>
  );
};

export default IncomeForm;
