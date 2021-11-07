import { formatMentorshipDate } from '@/helpers/formatDate';
import { IMentorhip } from '@/interfaces/mentorship.interface';
import React from 'react';

interface IMentorshipCard {
  mentorship: IMentorhip;
}

const MentorshipCard: React.FC<IMentorshipCard> = ({
  mentorship: {
    id,
    time_slot_info,
    mentee_id,
    mentee_email,
    cancel_cause,
    mentee_name,
    mentorship_status,
    who_cancel,
    mentor_name,
  },
}) => {
  const isCancelled = mentorship_status === 'CANCEL';
  const cancelledBy = who_cancel === 'MENTOR' ? mentor_name : mentee_name;

  return (
    <>
      <div key={id} className="px-4 mb-5 sm:px-6">
        <div className="overflow-hidden sm:rounded-lg border-green-500 border-2 border-solid">
          <div className="px-2 py-3 sm:px-6 text-mainTextColor">
            <h3 className="text-lg leading-6 font-medium text-gray-200">
              {mentee_name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm">
              {formatMentorshipDate(time_slot_info.date)}
            </p>
          </div>
          <div className="px-4 xm:px-6 border-green-500 border-t py-5">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-mainTextColor">
                  User Id
                </dt>
                <dd className="mt-1 text-sm text-gray-200">{mentee_id}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-mainTextColor">
                  Status
                </dt>
                <dd className="mt-1 text-sm text-gray-200">
                  {mentorship_status}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-mainTextColor">
                  User Email
                </dt>
                <dd className="mt-1 text-sm text-gray-200">{mentee_email}</dd>
              </div>
              {isCancelled && (
                <>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-mainTextColor">
                      Cancelled By
                    </dt>
                    <dd className="mt-1 text-sm text-gray-200">
                      {cancelledBy}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-mainTextColor">
                      Causa de cancelación
                    </dt>
                    <dd className="mt-1 text-sm text-gray-200">
                      {cancel_cause}
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorshipCard;
