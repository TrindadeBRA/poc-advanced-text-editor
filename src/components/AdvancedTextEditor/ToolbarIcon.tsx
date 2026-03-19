interface ToolbarIconProps {
  src: string
  alt?: string
}

export default function ToolbarIcon({ src, alt = '' }: ToolbarIconProps) {
  return <img src={src} alt={alt} width={20} height={20} style={{ display: 'block' }} />
}
