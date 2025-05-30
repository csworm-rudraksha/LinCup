"use client";
import { useEffect, useState } from 'react';
import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';

const Home = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [upcomingTime, setUpcomingTime] = useState('');
  const { upcomingCalls } = useGetCalls();

  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    setDate(new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now));

    if (upcomingCalls && upcomingCalls.length > 0) {
      const nextCall = upcomingCalls[0].state.startsAt;
      setUpcomingTime(nextCall?.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }) || '');
    }
  }, [upcomingCalls]);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: {upcomingTime || 'No upcoming'}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
