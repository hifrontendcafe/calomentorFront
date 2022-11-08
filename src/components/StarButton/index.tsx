import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import GrayStar from '@/assets/img/Gray-Star.svg';
import Star from '@/assets/img/Star.svg';

interface IStarButton {
  id: number;
  setHover: Dispatch<SetStateAction<number>>;
  setRating: Dispatch<SetStateAction<number>>;
  hover: number;
  rating: number;
}

const StarButton: React.FC<IStarButton> = ({
  id,
  setHover,
  hover,
  rating,
  setRating,
}) => {
  return (
    <button
      type="button"
      onClick={() => setRating(id)}
      onMouseEnter={() => setHover(id)}
      onMouseLeave={() => setHover(rating)}
    >
      <Image
        src={hover >= id ? Star : GrayStar}
        width={40}
        height={40}
        alt="Star"
      />
    </button>
  );
};

export default StarButton;
