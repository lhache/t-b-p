


export const trackModalOpen = id => {
    window.ga && window.ga('send', {
        hitType: 'event',
        eventCategory: 'modal-window',
        eventAction: 'open',
        eventLabel: id
    });
}

export const trackModalClose = id => {
    window.ga && window.ga('send', {
        hitType: 'event',
        eventCategory: 'modal-window',
        eventAction: 'close',
        eventLabel: id
    });
}

export const trackModalPrevItem = (curr, prev) => {
    window.ga && window.ga('send', {
        hitType: 'event',
        eventCategory: 'modal-window',
        eventAction: 'previous_item',
        eventLabel: `${curr} - to - ${prev}`
    });
}

export const trackModalNextItem = (curr, next) => {
    window.ga && window.ga('send', {
        hitType: 'event',
        eventCategory: 'modal-window',
        eventAction: 'next_item',
        eventLabel: `${curr} - to - ${next}`
    });
}

export const trackClickout = (price) => {
    window.ga && window.ga('send', {
        hitType: 'event',
        eventCategory: 'go-to-partner',
        eventAction: 'clickout',
        eventLabel: price
    });
}

