import { Metadata } from "next"

import Hero from "@modules/home/components/hero"

export const metadata: Metadata = {
  title: "Props Menu - Premium Film & TV Replica Props",
  description:
    "Shop authentic replica props from your favorite films and TV shows. High-quality 3D printed collectibles and memorabilia for fans and collectors.",
}

export default async function Home() {
  return <Hero />

}
