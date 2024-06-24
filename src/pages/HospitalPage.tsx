import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import addressList from '../mocks/addressList.json';

interface Region {
  nation: string;
  city: string;
  district: string;
}
const defaultRegion = {
  nation: '',
  city: '',
  district: '',
};

const HospitalPage = () => {
  const [region, setRegion] = useState<Region>(defaultRegion);
  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegion((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen px-40 py-24 space-y-8">
      <h1 className="text-4xl font-bold">주변 의료기관 확인하기 🔎</h1>
      <div className="grid grid-cols-3 gap-2">
        <Input
          placeholder="수원시"
          name="search"
          onChange={handleKeywordChange}
        />
      </div>
      <p>
        <span className="text-main-point">경기도 수원시 영통구</span> 내
        의료기관입니다.
      </p>
      <div className="overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr>
              <th> </th>
              <th>🏥 병원명</th>
              <th>📍 주소</th>
              <th>📞 연락처</th>
              <th>🌐 홈페이지</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-main-base">
              <th>1</th>
              <td>아주대학교 병원</td>
              <td>경기 수원시 영통구 월드컵로 164</td>
              <td>1688-6114</td>
              <td>
                <Link to="http://hosp.ajoumc.or.kr/">
                  http://hosp.ajoumc.or.kr/
                </Link>
              </td>
            </tr>
            <tr className="hover:bg-main-base">
              <th>2</th>
              <td>아주대학교 병원</td>
              <td>경기 수원시 영통구 월드컵로 164</td>
              <td>1688-6114</td>
              <td>
                <Link to="http://hosp.ajoumc.or.kr/">
                  http://hosp.ajoumc.or.kr/
                </Link>
              </td>
            </tr>
            <tr className="hover:bg-main-base">
              <th>3</th>
              <td>아주대학교 병원</td>
              <td>경기 수원시 영통구 월드컵로 164</td>
              <td>1688-6114</td>
              <td>
                <Link to="http://hosp.ajoumc.or.kr/">
                  http://hosp.ajoumc.or.kr/
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalPage;
