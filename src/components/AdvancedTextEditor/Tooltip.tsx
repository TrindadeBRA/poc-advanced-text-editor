import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipProps {
  title: string
  children: React.ReactElement
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export default function Tooltip({ title, children, side = 'top' }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={4}
            style={{
              zIndex: 50,
              background: '#101828',
              color: '#fff',
              fontSize: 12,
              borderRadius: 6,
              padding: '4px 8px',
              pointerEvents: 'none',
            }}
          >
            {title}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
