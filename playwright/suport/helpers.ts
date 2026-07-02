export function generateOrderCode(): string {
  const prefix = 'VLO-'
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomSuffix = ''

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomSuffix += characters.charAt(randomIndex)
  }

  return `${prefix}${randomSuffix}`
}
