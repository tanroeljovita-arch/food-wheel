export type Guide = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: {
    heading: string;
    body: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-pick-what-to-eat",
    title: "How to Pick What to Eat Without Overthinking",
    description:
      "Practical ways to decide what to eat by narrowing choices by food type, location, budget, time, and group preference.",
    intro:
      "Choosing what to eat gets harder when every option sounds possible. Food Wheel helps by turning the decision into a small process: narrow the kind of food, choose the area, remove poor fits, and spin from the remaining choices.",
    sections: [
      {
        heading: "Start with constraints",
        body: [
          "A food decision becomes easier when you name the real constraints first. Are you walking, driving, ordering nearby, or meeting people later? Is the meal for now, lunch, dinner, or supper? Do you need something affordable, fast, open now, or suitable for a group?",
          "Food Wheel supports this practical approach with location, radius, opening-hours, and price filters. You can keep the search broad when you are flexible, or narrow it when the meal has clear limits.",
        ],
      },
      {
        heading: "Pick a food direction",
        body: [
          "If you cannot even choose a cuisine, use the mini food type wheel. It can fill the Food keyword field with a starting point such as Japanese food, noodles, mamak, vegetarian, or dessert. The keyword does not run a search automatically, so you can change it before pressing Search.",
          "This works well because it separates two decisions: first decide the food direction, then decide the place. That small split can make a stuck meal choice feel lighter.",
        ],
      },
      {
        heading: "Let the final choice be random",
        body: [
          "Once the list has only acceptable options, randomness can be helpful. Delete anything that is too far, closed, too expensive, or not right for the moment. Then spin the wheel.",
          "Food Wheel is not trying to tell you the best restaurant. It helps you stop circling the same options and pick from a list you already approved.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I use manual options or Google Places results?",
        answer: "Use both if helpful. Manual options are your own ideas, while Google verified places come from Google Places results.",
      },
      {
        question: "Does the food type wheel search automatically?",
        answer: "No. It only fills the Food keyword field. You still press Search Google Places yourself.",
      },
      {
        question: "What if the wheel picks something I do not want?",
        answer: "Remove that option from the list and spin again with the remaining choices.",
      },
    ],
  },
  {
    slug: "random-restaurant-picker-guide",
    title: "Random Restaurant Picker Guide",
    description:
      "How a random restaurant picker works and how Food Wheel combines manual options with real nearby Google Places results.",
    intro:
      "A random restaurant picker is useful when several choices are good enough and the hard part is making the final call. Food Wheel gives that process structure without pretending to be a review site.",
    sections: [
      {
        heading: "Build a list worth spinning",
        body: [
          "The best wheel is not a giant list of everything nearby. It is a shortlist of options you would actually accept. Food Wheel lets you search real nearby places, add Google verified results, and keep manual entries in the same decision list.",
          "Manual options stay labeled Manual / Not verified. Google verified results require real place data and can include details such as rating, address, distance, opening status, price information, photos, and Google Maps links when Google returns them.",
        ],
      },
      {
        heading: "Keep control before the spin",
        body: [
          "Random does not mean careless. You can delete individual options, clear manual items, clear Google results, or replace Google results after a new search. This makes the wheel fairer because the final spin only uses the current list.",
          "If a winner does not feel right, remove it and spin again. That keeps the decision moving without forcing a bad choice.",
        ],
      },
      {
        heading: "Use Google Maps for full details",
        body: [
          "Food Wheel keeps the decision view simple. For Google verified places, the Open in Google Maps button lets you check reviews, directions, photos, menus, opening hours, and other details in Google Maps.",
          "The app does not create fake ratings, fake reviews, or fake restaurant data to make results look better.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can the wheel choose from manual and Google options together?",
        answer: "Yes. The main wheel uses the current list, including manual options and Google verified places.",
      },
      {
        question: "Are manual options verified?",
        answer: "No. They are user-entered and clearly marked Manual / Not verified.",
      },
      {
        question: "Does Food Wheel rank restaurants?",
        answer: "No. It helps choose randomly from the options you keep in the list.",
      },
    ],
  },
  {
    slug: "what-to-eat-when-you-cannot-decide",
    title: "What to Eat When You Cannot Decide",
    description:
      "A practical guide to meal decision fatigue and how to use Food Wheel to narrow choices with a food type spin and restaurant wheel.",
    intro:
      "Meal decisions can feel small, but they add up. When you are tired, busy, hungry, or choosing with other people, even simple food options can become decision fatigue.",
    sections: [
      {
        heading: "Reduce the decision in stages",
        body: [
          "Instead of asking one huge question, split it into smaller ones. What area makes sense? What food type sounds acceptable? What is open at the right time? What budget feels comfortable? Food Wheel maps naturally to those questions.",
          "The mini food type wheel helps when you cannot choose a direction. The search form helps when location matters. The main wheel helps when the shortlist is ready.",
        ],
      },
      {
        heading: "Make the shortlist honest",
        body: [
          "A useful list only contains options you are willing to accept. Remove places that are too far, not suitable, or not appealing today. Add manual ideas if they matter. Search again if the result set feels wrong.",
          "Food Wheel does not treat the first search as final. You can replace Google results, append more, or clear parts of the list.",
        ],
      },
      {
        heading: "Use randomness to finish",
        body: [
          "Randomness is helpful after you have filtered out bad choices. At that point, the wheel is not choosing from everything in the world. It is choosing from your current practical options.",
          "That makes the final result easier to accept and keeps the meal from becoming a long debate.",
        ],
      },
    ],
    faqs: [
      {
        question: "What if I do not know what keyword to search?",
        answer: "Use the mini food type wheel or choose a chip, then edit the keyword if needed.",
      },
      {
        question: "Can I use Food Wheel without sharing location?",
        answer: "Yes. You can type and select a location instead of using browser geolocation.",
      },
      {
        question: "Does it work for groups?",
        answer: "Yes. Add everyone’s acceptable options, remove poor fits, and spin from the shortlist.",
      },
    ],
  },
  {
    slug: "malaysia-food-decision-guide",
    title: "Malaysia Food Decision Guide",
    description:
      "Malaysia-friendly tips for choosing lunch, dinner, supper, mamak, kopitiam, cafe, hawker-style food, and group makan options with Food Wheel.",
    intro:
      "In Malaysia, deciding what to makan can be its own group activity. Lunch, dinner, supper, mamak, kopitiam, cafe, hawker-style meals, and takeaway all compete for attention.",
    sections: [
      {
        heading: "Match the meal to the moment",
        body: [
          "A weekday lunch may need to be close and quick. Dinner might allow more travel. Supper may depend heavily on what is open. Food Wheel helps because radius, opening-hours, and keyword filters can change with the situation.",
          "For casual makan decisions, start with the area and time first. Then decide whether you want a broad search or a food type such as noodles, Malay food, Indian food, cafe, mamak, or dessert.",
        ],
      },
      {
        heading: "Handle group preferences fairly",
        body: [
          "Group decisions get easier when everyone can contribute options. Add manual suggestions from the group chat, search nearby places, then remove anything people clearly reject.",
          "Once the list contains choices the group can accept, the wheel can make the final call without one person carrying the whole decision.",
        ],
      },
      {
        heading: "Be realistic about data",
        body: [
          "Some small places may not appear if they are not listed or returned by Google Places. Food Wheel does not create fake stalls, addresses, ratings, reviews, or map links.",
          "Manual entries are still useful for local knowledge. They just stay labeled as not verified so the difference is clear.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I use this for makan apa decisions?",
        answer: "Yes. Use manual ideas, Google Places results, or the mini food type wheel to get started.",
      },
      {
        question: "Will every local stall appear?",
        answer: "No. Results depend on Google Places data and may not include every small food place.",
      },
      {
        question: "Can I search around a specific Malaysia area?",
        answer: "Yes. Type and select a location, set the radius, and search from that selected area.",
      },
    ],
  },
  {
    slug: "how-food-wheel-uses-location-search",
    title: "How Food Wheel Uses Location Search",
    description:
      "Plain-language explanation of current location, typed locations, radius, opening hours, price filters, and Google Places results in Food Wheel.",
    intro:
      "Location search is what lets Food Wheel turn a general food question into nearby options. The app uses location only when you choose a location method.",
    sections: [
      {
        heading: "Two ways to choose a location",
        body: [
          "You can click Use my current location and allow browser geolocation, or you can type a place and select a Google autocomplete suggestion. Both methods provide coordinates that Food Wheel uses for nearby search.",
          "If you edit the typed location after selecting it, the app asks you to select a suggestion again so it does not search from unclear text.",
        ],
      },
      {
        heading: "Radius and filters",
        body: [
          "Radius is entered in kilometers and converted internally for search and filtering. Food Wheel filters results by actual distance when location coordinates are available.",
          "Opening-hours and price filters depend on Google data. Places without certain data may be hidden or labeled depending on the selected filter and current app behavior.",
        ],
      },
      {
        heading: "What Google provides",
        body: [
          "Food Wheel requests real Google Places data through server-side routes. Results may include names, addresses, ratings, coordinates, opening information, price data, photos, place types, and Google Maps links when available.",
          "The app does not expose the server API key in the browser and does not invent missing Google data.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I have to use current location?",
        answer: "No. You can select a typed location from suggestions instead.",
      },
      {
        question: "What does the map preview show?",
        answer: "It shows the selected/current center point and the radius circle, not restaurant markers.",
      },
      {
        question: "Why are some results missing?",
        answer: "Google may limit results, and some places may not have the data needed for your filters.",
      },
    ],
  },
  {
    slug: "group-food-decision-tips",
    title: "Group Food Decision Tips",
    description:
      "How friends, couples, students, and colleagues can use Food Wheel to decide fairly with manual options, food type spins, and restaurant spins.",
    intro:
      "Group food decisions can get stuck because everyone has a different craving, budget, distance limit, or idea of what sounds good. Food Wheel gives the group a shared process.",
    sections: [
      {
        heading: "Collect acceptable options first",
        body: [
          "Ask each person for one or two ideas. Add those as manual options, or search nearby places if the group wants real options around the current area. The first goal is not perfection. It is a list people can live with.",
          "If nobody knows what kind of food to suggest, spin the mini food type wheel first and use that as the starting keyword.",
        ],
      },
      {
        heading: "Remove bad fits before spinning",
        body: [
          "The wheel works best after the group removes options that are too far, closed, too expensive, or unpopular. This avoids the frustration of a winner that nobody actually wants.",
          "Food Wheel lets you delete individual items, clear manual options, clear Google results, or remove the winner and spin again.",
        ],
      },
      {
        heading: "Make the final decision feel fair",
        body: [
          "Once the remaining list is acceptable, a random spin can feel fairer than one person choosing. It also gives the group a natural stopping point.",
          "For couples, friends, students, or colleagues, that small bit of structure can save time and keep the meal decision light.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can everyone add manual ideas?",
        answer: "Yes. Add the ideas into the same list and keep them marked as manual.",
      },
      {
        question: "Can the winner be removed?",
        answer: "Yes. Use Remove this option after a winner is selected, then spin again.",
      },
      {
        question: "Is the spin weighted?",
        answer: "No. The wheel selects from the current list randomly.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
