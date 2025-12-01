import Link from 'next/link';

interface NotFoundProps {
  notFoundText: string;
  backToHomeText: string;
}

export default function NotFound({
  notFoundText,
  backToHomeText,
}: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-xl">{notFoundText}</p>
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
      >
        {backToHomeText}
      </Link>
    </div>
  );
}
