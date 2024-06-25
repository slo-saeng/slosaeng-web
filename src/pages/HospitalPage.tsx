import { ChangeEvent, useState } from 'react';
import { useInstitutionByKeyword } from '../hooks/useInstitutionByKeyword';
import { institutionInfo } from '../types/institution';
import Input from '../component/common/Input/Input';
import { useOpenApi } from '../hooks/useOpenApi';
import DetailModal from '../component/hospital/DetailModal/DetailModal';

const HospitalPage = () => {
  const [keyword, setKeyword] = useState<string>('수원시');
  const [selected, setSelected] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const { data: institutionKeywordData } = useInstitutionByKeyword(keyword);
  const { data: institutionDetailData } = useOpenApi(selected);

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const onClickHospital = (data: string) => {
    setSelected(data);
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <DetailModal
          closeModal={() => setModal(false)}
          addr={institutionDetailData?.data.body.addr}
          telno={institutionDetailData?.data.body.telno}
          name={institutionDetailData?.data.body.name}
          type={institutionDetailData?.data.body.type}
        />
      )}
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
          <span className="text-main-point">{keyword}</span> 로 검색한
          의료기관입니다.
        </p>
        <div className="overflow-x-auto">
          <table className="table text-center">
            <thead>
              <tr>
                <th> </th>
                <th>🏥 병원명</th>
                <th>📁 분류</th>
              </tr>
            </thead>
            <tbody>
              {institutionKeywordData?.data.map(
                (data: institutionInfo, index: number) => {
                  return (
                    <tr className="hover:bg-main-base" key={data.name}>
                      <th>{index + 1}</th>
                      <td
                        className="hover:underline hover:cursor-pointer"
                        onClick={() => onClickHospital(data.code)}
                      >
                        {data.name}
                      </td>
                      <th>{data.type}</th>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HospitalPage;
