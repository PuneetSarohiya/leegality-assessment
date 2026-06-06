import styles from "../../styles/Checkbox.module.css";

function Checkbox({ label, checked, onChange }) {
  return (
    <label className={styles.wrapper}>
      <input type="checkbox" checked={checked} onChange={onChange} />

      <span className={styles.checkmark} />

      <span>{label}</span>
    </label>
  );
}

export default Checkbox;
