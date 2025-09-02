import Image from 'next/image'

import InspetorPNG from './raw/inspetor.png'

export function Inspetor() {
  return (
    <Image
      src={InspetorPNG}
      alt="Inspetor preview image"
      fill
      className="object-contain"
      quality={100}
      priority
    />
  )
}
