interface ToolbarIconProps {
  src: string
  alt?: string
}

export default function ToolbarIcon({ src, alt = '' }: ToolbarIconProps) {
  return <img src={src} alt={alt} width={16} height={16} style={{ display: 'block' }} />
}
