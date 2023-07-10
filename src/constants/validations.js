export function isEmail(value) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return true;
  }
  return false;
}

export function isName(value) {
  if (/^[A-Za-z\s]*$/.test(value)) {
    return true;
  }
  return false;
}

export function isContact(value) {
  if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(value)) {
    return true;
  }
  return false;
}
