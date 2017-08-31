import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Header from '../../presentational/Header'
import Footer from '../../presentational/Footer'
import './StaticPages.css'


class ContactPage extends Component {
  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="ContactPageContainer">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HeaderBackground">
            <Header />
        </Flexbox>

        <Flexbox flexWrap="wrap" flexBasis="100%" className="StaticPageContentContainer">
          <form method="post">
            <input type="hidden" name="form-name" value="contact" />
            <p>
              <label>Your Name: <input type="text" name="name"/></label>
            </p>
            <p>
              <label>Your Email: <input type="email" name="email"/></label>
            </p>
            <p>
              <label>Message: <textarea name="message"></textarea></label>
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
        </form>
        </Flexbox>
        <Footer />
      </Flexbox>
    )
  }
}

export default ContactPage;
