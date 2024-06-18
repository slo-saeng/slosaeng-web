// 주민등록번호 뒤에서 부터 6자리를 *으로 마스킹하고 -을 넣습니다.
export const maskingIdNumber = (id: string) => {
  const maskingIdNum = id
    .replace(/-/g, '')
    .replace(/(\d{6})(\d{1})(\d{6})/, '$1-$2******');
  return maskingIdNum;
};
// 주민등록번호가 숫자로 된 13자리인지 확인합니다.
export const idNumberValidCheck = (id: string) => {
  const pattern = /^\d{6}-?\d{7}$/;
  return pattern.test(id);
};
// 전화번호 중간에 -을 넣습니다.
export const hyphensPhoneNumber = (phone: string) => {
  return phone
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/-{1,2}$/g, '');
};
// 전화번호가 유효한지 확인합니다.
export const phoneValidCheck = (phone: string) => {
  const pattern =
    /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  return pattern.test(phone);
};
