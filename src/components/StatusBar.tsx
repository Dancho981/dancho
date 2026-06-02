// The iOS status bar: time on the left, signal/wifi/battery on the right.
// `light` flips the colors for use over the dark welcome gradient.
export function StatusBar({ light = false }: { light?: boolean }) {
  const fill = light ? '#fff' : '#1a1a2e'
  return (
    <div className={`status-bar${light ? ' status-bar--light' : ''}`}>
      <span className="status-time">9:41</span>
      <div className="status-icons">
        {/* cellular */}
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="1" fill={fill} />
          <rect x="5" y="5" width="3" height="6" rx="1" fill={fill} />
          <rect x="10" y="2.5" width="3" height="8.5" rx="1" fill={fill} />
          <rect x="15" y="0" width="3" height="11" rx="1" fill={fill} />
        </svg>
        {/* wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <path d="M8.5 2.2c2.7 0 5.2 1 7 2.8l-1.4 1.5A7.7 7.7 0 0 0 8.5 4.3 7.7 7.7 0 0 0 2.9 6.5L1.5 5C3.3 3.2 5.8 2.2 8.5 2.2Z" fill={fill} />
          <path d="M8.5 5.7c1.7 0 3.3.7 4.5 1.8l-1.5 1.5a4.3 4.3 0 0 0-6 0L4 7.5a6.4 6.4 0 0 1 4.5-1.8Z" fill={fill} />
          <path d="M8.5 9.1c.7 0 1.4.3 1.9.8L8.5 11.7 6.6 9.9c.5-.5 1.2-.8 1.9-.8Z" fill={fill} />
        </svg>
        {/* battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={fill} opacity="0.4" />
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill={fill} />
          <rect x="23" y="4" width="1.5" height="4" rx="0.75" fill={fill} opacity="0.4" />
        </svg>
      </div>
    </div>
  )
}
