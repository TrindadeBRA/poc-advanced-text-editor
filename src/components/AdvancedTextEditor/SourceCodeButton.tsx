import ToolbarIcon from './ToolbarIcon'
import Tooltip from './Tooltip'
import iconSource from '../../header-icons/icon-source.svg'

interface SourceCodeButtonProps {
  isActive: boolean
  onClick: () => void
}

export default function SourceCodeButton({ isActive, onClick }: SourceCodeButtonProps) {
  return (
    <Tooltip title="Código fonte">
      <button
        className={`toolbar-button${isActive ? ' is-active' : ''}`}
        onClick={onClick}
      >
        <ToolbarIcon src={iconSource} alt="Código fonte" />
      </button>
    </Tooltip>
  )
}
