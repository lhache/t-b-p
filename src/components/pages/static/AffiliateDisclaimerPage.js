import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Header from '../../presentational/Header'
import Footer from '../../presentational/Footer'
import './StaticPages.css'

const deContent = () => (
  <Flexbox flexWrap="wrap" flexBasis="100%">
    <Flexbox flexWrap="wrap">
      <Flexbox flexBasis="100%">
        <h2>Amazon Partnerprogramm</h2>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Liebe Nutzerin, lieber Nutzer. Wir glauben an Transparenz im Internet, daher legen wir offen, dass wir - um diese Seite betreiben zu können - mit Internethändlern im Spielmarkt kooperieren. Wir erhalten eine Provison, für jeden von Ihnen getätigten Einkauf. Diese Provision wird vom Anbieter beglichen und beeinträchtigt in keinster Weise den angegebenen Preis des Produktes. Wir sind zur Zeit im Aufbau eines Netzwerks von Anbietern, mit denen wir in Zukunft zusammenarbeiten wollen. Um insbesondere nachhaltige und lokale Shops unterstützen zu können, müssen wir zuerst eine solide Kundenbasis aufbauen. Dies wird uns ermöglicht, durch ein Migliedschaft im Amazon-Partnerprogram. Unsere Suche ist so gestaltet, dass THE BETTER PLAY Ihnen nur Produkte vorschlägt, die mit unseren Kriterien eines guten Spielzeugs übereinstimmen. Das heisst, es handelt sich ausschliessich um in der EU produzierte, vertrauenswürdeige Produkte (nur 4 & 5 Sterne Bewerungen), die nach Möglichkeit auch Kriterien der Nachhaltigkeit gerecht werden, wie z.B. Öko-Freundlichkeit. Wir haben einen spezifischen Code entwickelt, der Ihnen nur eine bestimmte Auswahl an Produkten vorschlägt, die wir für unterstützendswert erachten. Wenn Ihnen in den Suchresultaten Produkte auffallen sollten, die Ihres Erwachtens nicht diesem Anspruch entsprechen, dann kontaktieren sie uns gerne direkt untern info@thebetterplay.com</p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>THE BETTER PLAY möchte mit seinem Angebo das Bewusstsein für Qualität steigern und Einfluss nehmen, was für Spielsachen gekauft werden.</p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Ziel ist es schnell zu wachsen, um in Zukunft ausschliesslich nur noch mit Partnern zu arbeiten, die nachhaltiges, ökologisches Spielzeug vertreiben. </p>
      </Flexbox>
    </Flexbox>
  </Flexbox>
)


class AffiliateDisclaimerPage extends Component {
  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="AffiliateDisclaimerPage
      Container">
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

export default AffiliateDisclaimerPage;
