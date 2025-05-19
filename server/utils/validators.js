exports.isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

exports.isValidMobile = (mobile) => {
  return /^[6-9]\d{9}$/.test(mobile);
};

