const YearSelect = ({ ...props }) => {
  const { onChange } = props;
  return (
    <>
      <h2>Tax Year</h2>
      <label htmlFor="years">Select a Year</label>
      <select
        className="left_spacing"
        name="years"
        id="years"
        onChange={(e) => onChange(e)}
      >
        <option value="2020">2020</option>
        <option value="2021">2021</option>
      </select>
    </>
  );
};

export default YearSelect;
