export const selectors = {
  hero: {
    section: 'section[class*="relative"][class*="mt-"]',
    title: 'h1',
    paragraph: 'p[class*="mt-\\[34px\\]"]',
    ctaButton: 'button:contains("Shop Now")',
    heroContainer: 'div[class*="glass"]', // Glass box container
  },

  video: {
    section: 'section[class*="bg-white"][class*="py-"]',
    videoImg: 'img[alt="Magnet Frame Demo"]',
    videoContainer: 'div[class*="rounded-\\[24px\\]"]',
  },

  pricing: {
    container: 'section[class*="container"]',
    card: '[class*="priceCard"]',
    title: '[class*="cardTitle"]',
    price: '[class*="priceAmount"]',
    popular: '[class*="ribbon"]',
    priceLabel: '[class*="cardLabel"]',
  },

  products: {
    section: 'section[class*="bg-\\[#F9F9FE\\]"]',
    grid: 'div[class*="grid"][class*="grid-cols-3"]',
    card: 'div[class*="overflow-hidden"][class*="rounded-\\[13px\\]"]',
    title: 'h3[class*="font-manrope"]',
    button: 'button:contains("Add to Cart")',
    badge: 'span[class*="rounded-full"][class*="bg-\\[#002B73\\]"]',
  },

  counter: {
    section: 'section[class*="flex"][class*="justify-center"]',
    container: 'div[class*="rounded-\\[24px\\]"][class*="flex"][class*="flex-row"]',
    timerDays: 'span:contains("DAYS")',
    timerHours: 'span:contains("HOURS")',
    timerMins: 'span:contains("MINS")',
    offerTag: 'div:contains("LIMITED RELEASE")',
    claimButton: 'button:contains("Claim Offer")',
  },
};

export const visitHome = () => {
  cy.visit('/');
};

export const waitForVisible = (el: string) => {
  cy.get(el).should('be.visible');
};

export const clickElement = (el: string) => {
  cy.get(el).should('be.visible').click();
};

export const checkResponsive = () => {
  cy.viewport(375, 667);
  cy.wait(300);
  cy.viewport(768, 1024);
  cy.wait(300);
  cy.viewport(1440, 900);
};