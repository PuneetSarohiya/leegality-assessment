import styles from "../../styles/Radio.module.css";

function Radio({ label, checked, onChange }) {
  return (
    <label className={styles.wrapper}>
      <input type="radio" checked={checked} onChange={onChange} />

      <span className={styles.radio} />

      <span>{label}</span>
    </label>
  );
}

export default Radio;
