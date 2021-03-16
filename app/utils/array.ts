export const groupBy = (array: any[], key: string) => {
  return array.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}
