import React from 'react';

interface HeaderProps {
  detail: string;
}

const Header: React.FC<HeaderProps> = ({ detail }) => {
  switch (detail) {
    case 'elder':
      return (
        <>
          <th> </th>
          <th>이름/성별</th>
          <th>생년월일</th>
          <th>거주지역</th>
          <th>전화번호</th>
          <th>혈액형</th>
          <th>기타사항</th>
        </>
      );
    case 'majorElder':
      return (
        <>
          <th> </th>
          <th>이름/성별</th>
          <th>생년월일</th>
          <th>거주지역</th>
          <th>전화번호</th>
          <th>혈액형</th>
          <th>기타사항</th>
          <th>등급</th>
        </>
      );
    default:
      return null;
  }
};

export default Header;
