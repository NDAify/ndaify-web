const nowISO8601 = () => {
  const now = new Date();
  return now.toISOString().replace(/\.\d{3}Z$/, 'Z');
};

export default nowISO8601;
