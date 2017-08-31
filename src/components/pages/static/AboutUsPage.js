import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Header from '../../presentational/Header'
import Footer from '../../presentational/Footer'
import './StaticPages.css'

const deContent = () => (
  <Flexbox flexWrap="wrap" flexBasis="100%">
    <Flexbox flexWrap="wrap">
      <Flexbox flexBasis="100%" justifyContent="center">
        <h2>Find a good toy -  simply, fast, without endless searching.</h2>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>We are THE BETTER PLAY. </p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>You know that situation, when you are looking for a toy for your kid, your niece, your grandchild or a friends new born baby. You go to the toy store feeling overwhelmed by everything there? All that bling and plastic, all that too much of everything, where you don’t even know where to start looking for?
        And to yourself you think; I just want a good, solid present. One that lasts and that kids (and I!) love. And I don’t want to spend days getting lost in toy stores to find it.
        We feel you. We are frustrated too. </p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>That’s why we came up with the idea to just build the simplest toy search you can find out there, that gives inspirations only for good quality toys.</p>
      </Flexbox>

      <Flexbox flexBasis="100%">
        <p>THE BETTER PLAY helps you find:</p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        - Classic toys and educationally valuable toys, for children up to the age of 12, that awaken their exploratory spirit and give them a creative experience.
      </Flexbox>
      <Flexbox flexBasis="100%">
        - Only toys that are highly rated by other users (4 and 5 star-rankings)
      </Flexbox>
      <Flexbox flexBasis="100%">
        - Only toys that are produced in the EU
      </Flexbox>

      <Flexbox flexBasis="100%">
        <p>We believe less is more, and that we all need to become more selective again in todays circle of short-living, cheap mass production and consumption. Especially when it comes to kids.
        At THE BETTER PLAY we also believe, that all toys are gender neutral. Children should be free to choose with whatever they feel inspired playing with.
        We are against the overwhelming gender stereotyped promotion, you find in almost every toy store. Therefore, in our search, we renounced on the option to filter toys by gender.</p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>THE BETTER PLAY has been thoughtfully designed to offer you the best value we could possibly deliver. We want you to feel comfortable the moment you enter our site and provide you with all you need to easily find the ideal toy you might were looking for. So instead of searching, you can spend more time playing with the kid.</p>
      </Flexbox>
    </Flexbox>
  </Flexbox>
)

















class AboutUsPage extends Component {
  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="AboutUsPageContainer">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HeaderBackground">
            <Header />
        </Flexbox>

        <Flexbox flexWrap="wrap" flexBasis="100%" className="StaticPageContentContainer">
          {deContent()}
        </Flexbox>
        <Footer />
      </Flexbox>
    )
  }
}

export default AboutUsPage;
