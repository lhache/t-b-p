import React from 'react';
import Flexbox from 'flexbox-react';
import Translate from 'react-translate-component'
import { Link } from 'react-router-dom'
import './FooterLinks.css'

const urlPrefix = '/static/';

const footerLinks = [
  'about',
  'imprint',
  'privacy-policy',
  'affiliate-disclaimer'
]

const FooterLinks = () => {
  return (
    <Flexbox className="FooterLinks">
      <Flexbox marginLeft="10px">
        <a href="mailto:info@thebetterplay.com">
          <Translate content="contact.title" />
        </a>
      </Flexbox>
      { footerLinks.map((link, index) => (
        <Flexbox marginLeft="10px" key={index}>
          <Link to={`${urlPrefix}${link}`}>
            <Translate content={`${link}.title`} />
          </Link>
        </Flexbox>
      ))}
    </Flexbox>
  )
}

export default FooterLinks;
