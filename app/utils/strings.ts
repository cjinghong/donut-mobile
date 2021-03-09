/// Truncates a string in the middle. Eg. "hello world" to "he...ld"
export const truncateStringMiddle = (str: string, numberOfStartingDigits: number, numberOfEndingDigits: number): string => {
  const endStartIndex = str.length - numberOfEndingDigits
  if (numberOfStartingDigits < str.length && endStartIndex > numberOfStartingDigits) {
    return `${str.substring(0, numberOfStartingDigits)}...${str.substring(str.length, endStartIndex)}`
  }
  return str
}
