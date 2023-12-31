import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { postMagazineLike } from '../api/magazine';
import { MagazineLiked } from '../type';

// 확장성 고려, 매거진 다른 곳에서 사용될 수 있도록
// 매거진 용, post 용 등으로 빼던지?
export const useLike = (initialLike: boolean, initialCount: number) => {
  const [like, setLike] = useState(initialLike);
  const [likeCount, setLikeCount] = useState(initialCount);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const magazineLike = useMutation(postMagazineLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      queryClient.invalidateQueries('magazineData');
    },
    onError: (error) => {
      console.error('좋아요 error 발생', error);
    },
  });

  // 좋아요 버튼 클릭 시 실행, 좋아요 상태와 수를 업데이트
  const handleLikeClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    magazineId: number,
    setMagazines?: React.Dispatch<React.SetStateAction<MagazineLiked[]>>
  ) => {
    event.stopPropagation();
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      toast.error('로그인 이후 이용이 가능합니다❗️', {
        onClose: () => navigate('/login'),
      });
      return;
    }
    if (setMagazines) {
      setMagazines((prevMagazines: MagazineLiked[]) => {
        const updatedMagazines = [...prevMagazines];
        updatedMagazines[magazineId].isLiked = !updatedMagazines[magazineId].isLiked;
        updatedMagazines[magazineId].LikeMagazine += updatedMagazines[magazineId].isLiked ? 1 : -1;
        return updatedMagazines;
      });
    }
    setLike(!like);
    setLikeCount(like ? likeCount - 1 : likeCount + 1);
    magazineLike.mutate({ id: magazineId, isLiked: like, magazineId: magazineId, likeCount: likeCount });
  };

  return { like, likeCount, handleLikeClick };
};
