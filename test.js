function isTwitterUrl(url) {
  const pattern = /^https:\/\/twitter\.com\.*/
  return pattern.test(url)
}

// Test the function
console.log(isTwitterUrl('https://twitter.com/username')) // Should return true
console.log(isTwitterUrl('https://example.com'))
