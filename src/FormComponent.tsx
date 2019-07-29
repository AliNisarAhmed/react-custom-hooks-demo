import React from 'react';

interface IProps {
  onFormSubmit: any;
  inputValue: string;
  onValueChange: any;
}

export default function FormComponent({ onFormSubmit, inputValue, onValueChange }: IProps) {
  return (
    <>
      <form onSubmit={onFormSubmit}>
          <input value={inputValue} onChange={onValueChange} />
          <button type="submit">Search</button>
        </form>
    </>
  )
}
