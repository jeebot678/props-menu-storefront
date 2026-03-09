"use client"

type GmodWindowChromeProps = {
  tabName?: string
  children: React.ReactNode
}

const GmodWindowChrome = ({ 
  tabName = "Spawnlist",
  children 
}: GmodWindowChromeProps) => {
  return (
    <div className="gmod-window" data-testid="gmod-window">
      {/* Top bar: tab + window controls */}
      <div className="gmod-topbar">
        <div className="gmod-tab">
          <span className="gmod-tab-label">{tabName}</span>
        </div>
        <div className="gmod-controls">
          <span className="gmod-ctrl" aria-hidden="true">─</span>
          <span className="gmod-ctrl" aria-hidden="true">□</span>
          <span className="gmod-ctrl gmod-ctrl-close" aria-hidden="true">✕</span>
        </div>
      </div>

      {/* Inner content panel — inset from outer frame */}
      <div className="gmod-inner">
        {children}
      </div>
    </div>
  )
}

export default GmodWindowChrome
