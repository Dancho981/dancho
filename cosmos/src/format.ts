// Number + scale formatting helpers (German locale).

const nf = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 })
const nf2 = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 })

export const fmtInt = (n: number) => nf.format(n)

/** Compact, readable form of a possibly enormous ratio, e.g. "1,3 Mio." */
export function fmtRatio(n: number): string {
  if (n < 10) return nf2.format(n)
  if (n < 1_000) return nf.format(Math.round(n))
  if (n < 1_000_000) return `${nf2.format(n / 1_000)} Tsd.`
  if (n < 1_000_000_000) return `${nf2.format(n / 1_000_000)} Mio.`
  if (n < 1e12) return `${nf2.format(n / 1e9)} Mrd.`
  if (n < 1e15) return `${nf2.format(n / 1e12)} Bio.`
  // Fall back to scientific-ish notation for the truly absurd.
  const exp = Math.floor(Math.log10(n))
  return `10^${exp}`
}

/** Human-friendly distance/size label derived from metres. */
export function fmtMeters(m: number): string {
  if (m < 1_000) return `${nf2.format(m)} m`
  if (m < 1.5e11) return `${fmtInt(m / 1000)} km`
  const ly = m / 9.461e15
  if (ly < 0.001) {
    const au = m / 1.496e11
    return `${nf2.format(au)} AE`
  }
  if (ly < 1) return `${nf2.format(ly * 1000)} Tausendstel Lj`
  return `${fmtRatio(ly)} Lichtjahre`
}

/** Order of magnitude in metres, e.g. 9 for ~10^9. */
export const magnitude = (m: number) => Math.floor(Math.log10(m))
