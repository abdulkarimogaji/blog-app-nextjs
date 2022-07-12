export function dateToMonthDay(respDate: string) {
  const date = new Date(new Date(Date.parse(respDate)))
  return date.toDateString()
}