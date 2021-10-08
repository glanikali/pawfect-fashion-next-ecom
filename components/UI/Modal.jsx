import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ children, selector }) {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, document.getElementById("modal")) : null
}
