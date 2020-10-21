// import { useEffect } from 'react';

export interface useFetchOnScrollProps {
  // bodyScroll?: boolean;
  onFetchMore: () => void;
}

export const useFetchOnScroll = ({
  // bodyScroll,
  onFetchMore,
}: useFetchOnScrollProps) => {
  const handleScroll = (e: any) => {
    // if (bodyScroll) {
    //   return;
    // }
    const target = e.target;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom) {
      onFetchMore();
    }
  };

  // const handleBodyScroll = () => {
  //   const bottom =
  //     window.pageYOffset + window.innerHeight === document.body.scrollHeight;
  //   if (bottom) {
  //     onFetchMore();
  //   }
  // };

  // useEffect(() => {
  //   if (!bodyScroll) {
  //     return;
  //   }
  //   window.addEventListener('scroll', handleBodyScroll);
  //   return () => window.removeEventListener('scroll', handleBodyScroll);
  // });

  return { handleScroll };
};
