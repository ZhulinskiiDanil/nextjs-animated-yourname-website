export type Episode = {
  id: number
  title: string
  description: string
  href: string
  imageURL: string | null
  progress: number
  episode: number
  saved: boolean
}