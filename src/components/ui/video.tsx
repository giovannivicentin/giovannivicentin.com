import Image from 'next/image'

export function Video({ path, photo }: { path: string; photo: string }) {
  return (
    <video
      width="1920"
      height="1080"
      controls
      preload="none"
      className="aspect-video w-full rounded-md border dark:border-neutral-700"
    >
      <source src={path} type="video/mp4" />
      <Image
        src={photo}
        alt="Fallback image when video cannot be played"
        width="640"
        height="480"
      />
      <p>Your browser does not support the video tag.</p>
    </video>
  )
}
