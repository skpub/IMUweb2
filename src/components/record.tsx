import styles from "./record.module.css"

export default function Record({
  relation,
}: {
  relation: Map<string, string>
}) {
  return (
    <table className={styles.container}>
      {Array.from(relation).map(([key, value]) => (
        <tbody key={key}>
          <tr className={styles.entry}>
            <th className={styles.entry}>{key}</th>
            <td className={styles.entry}>{value}</td>
          </tr>
        </tbody>
      ))}
    </table>
  )
}
