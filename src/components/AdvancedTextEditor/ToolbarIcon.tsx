interface ToolbarIconProps {
  src: string
  alt?: string
}

export default function ToolbarIcon({ src, alt = '' }: ToolbarIconProps) {
  return <img src={src} alt={alt} width={24} height={24} style={{ display: 'block' }} />
}
