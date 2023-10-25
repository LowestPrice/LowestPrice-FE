import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postMagazineLike } from '../api/magazine';

export const useLike = (initialLike: boolean, initialCount: number) => {
  const [like, setLike] = useState(initialLike);
  const [likeCount, setLikeCount] = useState(initialCount);
  const queryClient = useQueryClient();

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
    if (setMagazines) {
      setMagazines((prevMagazines: any) => {
        console.log('Previous Magazines: ', prevMagazines);
        const updatedMagazines = [...prevMagazines];
        console.log('Updated Magazines Before: ', updatedMagazines);
        updatedMagazines[index].isLiked = !updatedMagazines[index].isLiked;
        updatedMagazines[index].LikeMagazine += updatedMagazines[index].isLiked ? 1 : -1;
        console.log('Updated Magazines After: ', updatedMagazines);
        return updatedMagazines;
      });
    }
    setLike(!like);
    setLikeCount(like ? likeCount - 1 : likeCount + 1);
    magazineLike.mutate({ id: magazineId });
  };

  return { like, likeCount, handleLikeClick };
};
