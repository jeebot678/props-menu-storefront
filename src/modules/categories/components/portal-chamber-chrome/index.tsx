"use client"

type PortalChamberChromeProps = {
  tabName?: string
  children: React.ReactNode
}

const PortalChamberChrome = ({ 
  tabName = "PORTAL",
  children 
}: PortalChamberChromeProps) => {
  return (
    <div className="portal-chamber" data-testid="portal-chamber">
      {/* Test Chamber Information Bar */}
      <div className="portal-header">
        {/* Left: Aperture Science Logo */}
        <div className="portal-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" stroke="#A0A0A0" strokeWidth="2" fill="none"/>
            <circle cx="16" cy="16" r="11" stroke="#A0A0A0" strokeWidth="1" fill="none"/>
            <circle cx="16" cy="16" r="7" stroke="#A0A0A0" strokeWidth="1" fill="none"/>
            <path d="M 16 1 L 16 31 M 1 16 L 31 16" stroke="#A0A0A0" strokeWidth="1.5"/>
            <path d="M 5 5 L 27 27 M 27 5 L 5 27" stroke="#A0A0A0" strokeWidth="1" opacity="0.5"/>
          </svg>
        </div>

        {/* Center: Chamber Name */}
        <div className="portal-title">
          <span className="portal-title-text">{tabName}</span>
        </div>

        {/* Right: Hazard Pictograms */}
        <div className="portal-hazards">
          {/* Companion Cube */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="12" height="12" stroke="#A0A0A0" strokeWidth="1.5" fill="none"/>
            <circle cx="12" cy="12" r="3" fill="#A0A0A0"/>
            <path d="M 9 9 L 15 15 M 15 9 L 9 15" stroke="#A0A0A0" strokeWidth="1"/>
          </svg>

          {/* Turret */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 12 6 L 8 10 L 8 18 L 16 18 L 16 10 L 12 6 Z" stroke="#A0A0A0" strokeWidth="1.5" fill="none"/>
            <circle cx="12" cy="13" r="2" fill="#A0A0A0"/>
            <line x1="12" y1="6" x2="12" y2="4" stroke="#A0A0A0" strokeWidth="1.5"/>
          </svg>

          {/* Laser */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="12" x2="20" y2="12" stroke="#A0A0A0" strokeWidth="2"/>
            <circle cx="4" cy="12" r="2" fill="#A0A0A0"/>
            <circle cx="20" cy="12" r="2" fill="#A0A0A0"/>
            <line x1="8" y1="10" x2="16" y2="14" stroke="#A0A0A0" strokeWidth="0.5" opacity="0.6"/>
            <line x1="8" y1="14" x2="16" y2="10" stroke="#A0A0A0" strokeWidth="0.5" opacity="0.6"/>
          </svg>

          {/* Fizzler */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="12" height="16" stroke="#A0A0A0" strokeWidth="1.5" fill="none"/>
            <line x1="6" y1="8" x2="18" y2="8" stroke="#A0A0A0" strokeWidth="1" opacity="0.6"/>
            <line x1="6" y1="12" x2="18" y2="12" stroke="#A0A0A0" strokeWidth="1" opacity="0.6"/>
            <line x1="6" y1="16" x2="18" y2="16" stroke="#A0A0A0" strokeWidth="1" opacity="0.6"/>
          </svg>
        </div>
      </div>

      {/* Inner content area — clean white panel */}
      <div className="portal-inner">
        {children}
      </div>
    </div>
  )
}

export default PortalChamberChrome
