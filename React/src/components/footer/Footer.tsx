import React from 'react';
import './Footer.scss';

export default function Footer({ ...rest }: React.HTMLAttributes<HTMLElement>): JSX.Element {
  return <footer className='footer dx-theme-text-color' {...rest} />;
}
