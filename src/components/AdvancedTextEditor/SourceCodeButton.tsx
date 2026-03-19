import ToolbarIcon from './ToolbarIcon'
import iconSource from '../../header-icons/icon-source.svg'

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
      <ToolbarIcon src={iconSource} alt="Código fonte" />
    </button>
  )
}
