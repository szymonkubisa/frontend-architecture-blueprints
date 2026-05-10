import styles from './DashboardStats.module.css'

interface Stat {
  label: string
  value: string | number
  change: number
}

interface Props {
  stats: Stat[]
}

export default function DashboardStats({ stats }: Props) {
  return (
    <div className={styles.grid}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.card}>
          <span className={styles.label}>{stat.label}</span>
          <span className={styles.value}>{stat.value}</span>
          <span className={`${styles.change} ${stat.change >= 0 ? styles.positive : styles.negative}`}>
            {stat.change >= 0 ? '+' : ''}{stat.change}%
          </span>
        </div>
      ))}
    </div>
  )
}
