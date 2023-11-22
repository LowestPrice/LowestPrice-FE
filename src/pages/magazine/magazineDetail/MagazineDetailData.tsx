import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import MagazineDetailItem from './MagazineDetailItem';

import { deleteMagazine, getMagazineDetail } from '../../../api/magazine';

const MagazineDetailData = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [share, setShare] = useState<boolean>(false);

  // 데이터 불러오기
  const { isLoading, isError, data } = useQuery(['posts', id], () => getMagazineDetail(id));
  const magazineDetail = data?.data;
  const isAdmin = data?.admin;

  const dateData = data?.data.createdAt;

  // 날짜 데이터 형식 변환하기
  const WrittenDate = () => {
    if (!dateData) return '날짜 정보 없음';
    const [formattedDate] = dateData.split('T');
    const [year, month, day] = formattedDate.split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  const writtenDate = WrittenDate();

  // 데이터 삭제하기
  const deletePosts = useMutation(deleteMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', id]);
      queryClient.invalidateQueries('magazineData');
    },
    onError: (error) => {
      console.log('error 발생', error);
    },
  });

  const onDeleteButtonHandler = (id: string) => {
    deletePosts.mutate({ id });
    toast.success('삭제되었습니다✅');
  };

  // 공유하기
  const handleShareButton = () => {
    setShare(!share);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <MagazineDetailItem
        {...magazineDetail}
        writtenDate={writtenDate}
        onDeleteButtonHandler={onDeleteButtonHandler}
        handleShareButton={handleShareButton}
        isAdmin={isAdmin}
        share={share}
        id={id}
      />
    </>
  );
};

export default MagazineDetailData;
