import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Header from '../../presentational/Header'
import Footer from '../../presentational/Footer'
import Translate from 'react-translate-component'
import './StaticPages.css'

const deContent = () => (
  <Flexbox flexWrap="wrap" flexBasis="100%">
    <Flexbox flexWrap="wrap">
      <Flexbox flexBasis="100%">
        <h2>Impressum</h2>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Betreiberin der Website:</p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        THE BETTER PLAY
      </Flexbox>
      <Flexbox flexBasis="100%">
        Katja Navarra
      </Flexbox>
      <Flexbox flexBasis="100%">
        Husemannstrasse 10
      </Flexbox>
      <Flexbox flexBasis="100%">
        10435 Berlin
      </Flexbox>
      <Flexbox flexBasis="100%">
        www.thebetterplay.com
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Kleinunternehmer i.S.d. § 19 UStG</p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Kontakt: info@thebetterplay.com. Sie erhalten von uns eine Rückmeldung binnen 60 Min.</p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Diese Website ist ein online Suchportal für Spielsachen. Unser Ziel ist es, Ihnen zu helfen, schnell und unkompliziert, ein gutes Spielzeug zu finden. Basierend auf Ihrer Suchanfrage schlagen wir Ihnen hierzu eine optimale Auswal an Produkten vor. Bitte beachten Sie: Wir sind kein Online-Shop und verkaufen daher auf unserer Seite auch keine Produkte.</p>
      </Flexbox>
    </Flexbox>

    <Flexbox flexWrap="wrap">
      <Flexbox flexBasis="100%">
        <h3>Haftungsausschuss</h3>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <h4>Haftung für Inhalte </h4>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
      </Flexbox>

      <Flexbox flexBasis="100%">
        <h4>Haftung für Links </h4>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
      </Flexbox>

      <Flexbox flexBasis="100%">
        <h4>Urheberrecht </h4>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
      </Flexbox>

      <Flexbox flexBasis="100%">
        <h4>Wichtiger Hinweis zu den Produkt- und Preisangaben  </h4>
      </Flexbox>
      <Flexbox flexBasis="100%">
        <p>Wir bemühen uns die Angaben zu den Produkte und Preise, immer auf dem aktuellsten Stand zu halten. Es kann jedoch vereinzelt vorkommen, dass die auf unserer Website gemachten Angaben von denen des Shops, abweichen.</p>
      </Flexbox>
    </Flexbox>
  </Flexbox>
)


class ImprintPage extends Component {
  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="ImpressumPageContainer">
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

export default ImprintPage;
