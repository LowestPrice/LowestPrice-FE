import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postMagazineLike } from '../api/magazine';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

export const useLike = (initialLike: boolean, initialCount: number) => {
  const [like, setLike] = useState(initialLike);
  const [likeCount, setLikeCount] = useState(initialCount);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const magazineLike = useMutation(postMagazineLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.error('좋아요 error 발생', error);
    },
  });

  const handleLikeClick = (event: any, magazineId: string | number, index: number, setMagazines?: any) => {
    event.stopPropagation();
    const accessToken = Cookies.get('Authorization');
    if (!accessToken) {
      alert('로그인 후 이용해 주세요.');
      navigate('/login');
      return;
    }
    if (setMagazines) {
      setMagazines((prevMagazines: any) => {
        const updatedMagazines = [...prevMagazines];
        updatedMagazines[index].isLiked = !updatedMagazines[index].isLiked;
        updatedMagazines[index].LikeMagazine += updatedMagazines[index].isLiked ? 1 : -1;
        return updatedMagazines;
      });
    }
    setLike(!like);
    setLikeCount(like ? likeCount - 1 : likeCount + 1);
    magazineLike.mutate({ id: magazineId });
  };

  return { like, likeCount, handleLikeClick };
};
