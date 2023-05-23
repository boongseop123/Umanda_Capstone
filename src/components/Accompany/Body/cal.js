/* 생일 계산해주는 함수 */
const calculateAge = (birthdate) => {
  const birthDateParts = birthdate.split("-");
  const birthYear = parseInt(birthDateParts[0], 10);
  const birthMonth = parseInt(birthDateParts[1], 10);
  const birthDay = parseInt(birthDateParts[2], 10);

  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth() + 1; // getMonth() returns month index starting from 0
  const thisDay = today.getDate();

  let age = thisYear - birthYear;

  if (
    thisMonth < birthMonth ||
    (thisMonth === birthMonth && thisDay < birthDay)
  ) {
    age--; // birthday hasn't happened this year
  }

  return age;
};

export default calculateAge;
