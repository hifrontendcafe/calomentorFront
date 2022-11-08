import React from 'react';
import Image from 'next/image';
import PwdByVercelImg from '@/assets/img/powered-by-vercel.svg';

const PwdByVercel: React.FC = () => {
  return (
    <div className="relative bottom-0 self-center mt-10 mb-4">
      <a href="https://vercel.com/?utm_source=hifrontendcafe&utm_campaign=oss">
        <Image
          src={PwdByVercelImg}
          height={40}
          width={206}
          alt="Powered by Vercel"
        />
      </a>
    </div>
  );
};

export default PwdByVercel;
