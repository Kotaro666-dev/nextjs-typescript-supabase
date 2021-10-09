export const isEmpty = (text: string) => {
  if (text.trim().length === 0) {
    return true;
  }
  return false;
};

export const validateEmail = (email: string) => {
  if (isEmpty(email)) {
    return false;
  }

  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  if (!pattern.test(email)) {
    return false;
  }
  return true;
};

export const validatePassword = (password: string) => {
  if (isEmpty(password)) {
    return false;
  }
  if (password.length < 6) {
    return false;
  }
  return true;
};
