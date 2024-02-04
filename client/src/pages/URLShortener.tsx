import { useState, ChangeEvent, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FiCopy } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const API_URL = import.meta.env.VITE_API_URL;

interface ShortenedURLResponse {
  shortenedURL: string;
}

function URLShortener() {
  const [originalURL, setOriginalURL] = useState<string>('');
  const [shortenedURL, setShortenedURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longURL: originalURL,
        }),
      });

      if (response.ok) {
        const data: ShortenedURLResponse = await response.json();
        setShortenedURL(data.shortenedURL);
      } else {
        const errorMessage = await response.text();
        setError(`Error: ${errorMessage}`);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
      setCopied(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalURL(e.target.value);
  };

  const isButtonDisabled = useMemo(() => loading || !originalURL.trim(), [loading, originalURL]);

  return (
    <div className='flex flex-col items-center justify-center space-y-4 w-full max-w-lg mx-auto p-4 border border-gray-300 rounded-md'>
      <Input
        type='text'
        placeholder='Enter URL'
        value={originalURL}
        onChange={handleInputChange}
        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
      />
      <Button
        type='button'
        onClick={handleClick}
        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
        disabled={isButtonDisabled}
      >
        {loading ? 'Loading...' : 'Get Short URL'}
      </Button>
      {error && <div className='text-red-500'>{error}</div>}
      {shortenedURL && (
        <div className='mt-4 flex items-center'>
          <strong className='mr-2'>Shortened URL:</strong>
          <div className='flex items-center'>
            <span className='mr-2'>{shortenedURL}</span>
            <CopyToClipboard text={shortenedURL} onCopy={() => setCopied(true)}>
              <FiCopy className='cursor-pointer text-blue-500 hover:text-blue-700' />
            </CopyToClipboard>
          </div>
          {copied && <span className='text-green-500 ml-2'>Copied!</span>}
        </div>
      )}
    </div>
  );
}

export default URLShortener;
