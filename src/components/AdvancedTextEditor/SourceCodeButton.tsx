interface SourceCodeButtonProps {
  isActive: boolean
  onClick: () => void
}

export default function SourceCodeButton({ isActive, onClick }: SourceCodeButtonProps) {
  return (
    <button
      className={`toolbar-button${isActive ? ' is-active' : ''}`}
      onClick={onClick}
    >
      &lt;/&gt;
    </button>
  )
}
