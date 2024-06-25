import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useInstitutionByKeyword } from '../hooks/useInstitutionByKeyword';
import { institutionInfo } from '../types/institution';
import Input from '../component/common/Input/Input';
import { useInstitutionPaging } from '../hooks/useInstitutionPaging';

const HospitalPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { data: pagingData } = useInstitutionPaging(0, 20);
  const [tableData, setTableData] = useState<institutionInfo[]>();
  const defaultData = pagingData?.data.content;
  const [searchWord, setSearchWord] = useState<string>('');
  const { data: institutionKeywordData } = useInstitutionByKeyword(searchWord);

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (keyword === '') setTableData(defaultData);
    else if (keyword !== '' && institutionKeywordData?.data) {
      setTableData(institutionKeywordData.data);
    }
  }, [institutionKeywordData, keyword]);

  return (
    <div className="h-full px-40 py-24 space-y-8">
      <h1 className="text-4xl font-bold">주변 의료기관 확인하기 🔎</h1>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="검색어를 입력해주세요"
            name="search"
            onChange={handleKeywordChange}
          />
          <FaSearch
            size={36}
            onClick={() => setSearchWord(keyword)}
            className="p-2 rounded-md hover:cursor-pointer hover:bg-gray-200"
          />
        </div>
      </div>
      <p>
        <span className="text-main-point">{keyword}</span> 로 검색한
        의료기관입니다.
      </p>
      <div className="overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr>
              <th> </th>
              <th>📁 분류</th>
              <th>🏥 병원명</th>
              <th>📍 주소</th>
              <th>📞 연락처</th>
              <th>🌐 홈페이지</th>
            </tr>
          </thead>
          <tbody>
            {(keyword === '' ? defaultData : tableData)?.map(
              (data: institutionInfo, index: number) => (
                <tr className="hover:bg-main-base" key={data.name}>
                  <th>{index + 1}</th>
                  <td>{data.type}</td>
                  <td className="hover:underline hover:cursor-pointer">
                    {data.name}
                  </td>
                  <td>{data.address}</td>
                  <td>{data.tel}</td>
                  <td>
                    <Link to={data.homepage} className="hover:underline">
                      {data.homepage}
                    </Link>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalPage;
