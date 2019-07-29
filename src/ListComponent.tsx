import React from 'react';

interface IProps {
  isLoading: boolean;
  isError: boolean;
  data: any[];
}

export default function ListComponent({ isLoading, isError, data }: IProps) {
  return (
    <>
      {isError ? (
        <h1>Oops Error...</h1>
      ) : isLoading ? (
        <h1>Loading Component...</h1>
      ) : (
        <ul>
          {data.length > 0 &&
            data.map((item: any) => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
