import Image from 'next/image'

import CespaccPNG from './raw/cespacc.png'

export function Cespacc() {
  return (
    <Image
      src={CespaccPNG}
      alt="Cespacc preview image"
      fill
      className="object-contain"
      quality={100}
      priority
    />
  )
}
