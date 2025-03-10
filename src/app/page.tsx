import { Timer } from '@/components/Timer';

export default function Home() {
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center'>
      <Timer />
    </div>
  );
}
