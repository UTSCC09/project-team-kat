export const validateEmail = (email) => {
  if (!email) return 'Email required';
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(mailformat)) return 'Invalid email';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password required';
  if (password.length < 7) return 'Password must be at least 7 characters';
  return '';
};

export const validateUsername = (username) => {
  if (!username) return 'Username required';
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (username.length < 6) return 'Username must be at least 6 characters';
  if (!username.match(usernameRegex)) return 'Invalid username';
  return '';
};

