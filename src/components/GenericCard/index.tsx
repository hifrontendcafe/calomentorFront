import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner';

type GenericCardProps = {
  title?: string;
  noDataMessage?: string | ReactNode;
  isLoading?: boolean;
  isDataEmpty?: boolean;
  children: ReactNode;
  bodyClassnames?: string;
};

const GenericCard = ({
  title,
  noDataMessage,
  isLoading,
  isDataEmpty,
  children,
  bodyClassnames,
}: GenericCardProps) => {
  return (
    <>
      {title && (
        <div className="px-4 py-5 rounded-t-lg bg-cardHeader sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-secondary">
            {title}
          </h3>
        </div>
      )}
      <div
        className={classNames('p-5 rounded-b-lg bg-cardContent', {
          'rounded-b-lg': title,
          'rounded-lg': !title,
        })}
      >
        {isLoading && <Spinner />}
        {!isLoading && isDataEmpty && noDataMessage && (
          <div
            className={
              'border-green-500 mx-4 flex items-center justify-between my-5 border bg-cardContentLight rounded-md'
            }
          >
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <p className="py-2 text-center text-tertiary">{noDataMessage}</p>
            </div>
          </div>
        )}
        {!isLoading && <div className={bodyClassnames}>{children}</div>}
      </div>
    </>
  );
};

export default GenericCard;
