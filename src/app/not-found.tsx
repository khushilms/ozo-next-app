import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-ozo-green">404</h1>
      <p className="text-xl my-4">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className={`text-white border-2 px-3 py-2 border-white whitespace-nowrap font-semibold shadow-md bg-ozo-green bg-ozo-green/80`}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;