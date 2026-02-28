import { useCursorStore } from '@/lib/store'

export const useCursorHover = () => {
    const { setCursorVariant } = useCursorStore()
    return {
        onMouseEnter: () => setCursorVariant('targeting'),
        onMouseLeave: () => setCursorVariant('default'),
    }
}
