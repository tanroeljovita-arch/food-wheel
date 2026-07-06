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
      "Choosing what to eat gets harder when every option sounds possible. You may be hungry, tired, in a rush, or trying to keep a group happy. Food Wheel helps by turning the decision into a small process: name the real limits, pick a food direction, build a shortlist, remove poor fits, and spin from the choices that still make sense.",
    sections: [
      {
        heading: "Start with the real constraints",
        body: [
          "A food decision becomes easier when you name the practical constraints before looking at places. Ask what matters most for this meal: distance, time, price, opening hours, transport, dietary needs, or whether everyone can sit together. A quick solo lunch near work needs a different decision process from a weekend dinner with friends.",
          "Food Wheel supports this by letting you choose a location, set a radius, filter by opening time, and use a broad or specific food keyword. If you only have 30 minutes, a smaller radius and Open now filter can prevent wishful options from entering the list. If you are planning dinner later, lunch or dinner time filtering can help focus the shortlist on places that may fit the selected meal time.",
          "This step is not about finding the perfect restaurant. It is about removing choices that are unrealistic today. Once the impossible options are gone, the remaining decision usually feels much lighter.",
        ],
      },
      {
        heading: "Pick a direction before picking a place",
        body: [
          "Many people get stuck because they try to answer two questions at once: what type of food and where to eat it. Separate them. First choose a direction such as noodles, cafe, Indian food, vegetarian, dessert, fast food, or something simple like rice. Then search nearby places for that direction.",
          "If you cannot choose a food direction, use the mini food type wheel. It can fill the Food keyword field with a starting point, but it does not search automatically. That matters because the user stays in control. You can accept the suggestion, edit it, or ignore it and type something else.",
          "For example, a student who only knows they want something filling might spin the mini wheel and get Rice. A couple who is tired of repeating the same places might use Thai food or Japanese food as a starting point. An office team might decide the food type first, then let nearby Google Places results create the actual shortlist.",
        ],
      },
      {
        heading: "Create a shortlist you would actually accept",
        body: [
          "A good wheel is not a list of everything nearby. It is a list of options you would be willing to accept if they win. Before spinning, remove choices that are too far, too expensive for the moment, closed, not suitable for the group, or simply not appealing today.",
          "Food Wheel lets you combine real Google Places results with manual ideas. Manual options are useful for places you already know, home-cooked ideas, delivery choices, or local spots that may not appear in Google results. They remain clearly marked Manual / Not verified, so they are not confused with Google verified places.",
          "This is especially helpful when the best option is partly personal. A Google search may find nearby places, but it cannot know that you already ate burgers yesterday, that one friend avoids spicy food, or that the group wants somewhere easy to park. Use the list controls to shape the wheel around the real situation.",
        ],
      },
      {
        heading: "Use randomness only at the end",
        body: [
          "Randomness works best after you have removed bad choices. If the wheel includes options nobody wants, the result will feel annoying rather than helpful. But if every option is acceptable, a random spin can end the loop quickly.",
          "Think of Food Wheel as a decision finisher, not a restaurant judge. It does not claim to know the best place for everyone. It helps you stop circling the same choices and commit to one option from a list you already approved.",
          "If the winner still feels wrong, that is useful information too. Remove that option and spin again. The goal is not to obey the wheel blindly. The goal is to make the decision easier, fairer, and less tiring.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I start with manual options or Google Places results?",
        answer:
          "Use whichever matches the situation. Manual options are good for personal ideas and known favorites. Google Places results are useful when you want real nearby places from the selected location.",
      },
      {
        question: "Does the food type wheel search automatically?",
        answer:
          "No. It only fills the Food keyword field. You still review the keyword and press Search Google Places yourself.",
      },
      {
        question: "What if the wheel picks something I do not want?",
        answer:
          "Remove that option from the spin list and spin again. The wheel is a helper, not a rule you have to follow.",
      },
      {
        question: "How many options should I keep before spinning?",
        answer:
          "There is no perfect number. Three to eight strong choices often feels manageable, but a larger list can work if every option is acceptable.",
      },
    ],
  },
  {
    slug: "random-restaurant-picker-guide",
    title: "Random Restaurant Picker Guide",
    description:
      "How a random restaurant picker works and how Food Wheel combines manual options with real nearby Google Places results.",
    intro:
      "A random restaurant picker is useful when several choices are good enough and the hard part is making the final call. Food Wheel gives that process structure without pretending to be a review site. You build the list, remove what does not fit, and let the wheel choose from the options that remain.",
    sections: [
      {
        heading: "What a restaurant wheel should do",
        body: [
          "A restaurant wheel should reduce friction, not replace judgment. It works best when the list contains real possibilities: places in the right area, open at the right time, and suitable for the people eating together. If the list is careless, the result will be careless too.",
          "Food Wheel keeps the decision process visible. Google verified options come from Google Places data. Manual options come from you and stay marked Manual / Not verified. This separation helps the list stay honest. A manually typed idea is still useful, but the app does not pretend it has a Google place ID, rating, address, or map link.",
          "For a solo meal, you might search nearby cafes and delete the ones that are too far. For a date night, you might add a few known options manually and mix them with Google results. For a group lunch, each person can suggest one place, then the wheel can decide after everyone removes obvious problems.",
        ],
      },
      {
        heading: "Build a list worth spinning",
        body: [
          "The best list is not necessarily the longest list. It is a shortlist with enough variety to feel fair. A list with two options may feel too forced. A list with fifty may feel noisy. Food Wheel lets you shape the list gradually: search, append or replace Google results, delete individual items, clear manual items, or clear Google verified items.",
          "Use the result handling choice intentionally. Replace Google verified results when a new search should refresh the restaurant side of the list but manual ideas should stay. Add to current list when you want to combine multiple searches, such as cafe and dessert, or noodles and rice.",
          "The wheel uses the current list only. That makes the process easy to understand: if an option is visible, it can be selected. If you delete it, it is gone from the spin. If a winner appears and you change your mind, Remove this option clears it from the list and lets you spin again.",
        ],
      },
      {
        heading: "Use real details without rebuilding Google Maps",
        body: [
          "Food Wheel keeps restaurant cards compact because the main job is choosing, not reviewing. For Google verified places, details such as rating, address, distance, opening status, price data, photos, and Google Maps links appear only when Google returns them.",
          "The Open in Google Maps button is important. It lets you check richer details such as reviews, directions, menus, opening hours, and photos in Google Maps. Food Wheel does not create fake reviews or fake menu information to make a card look more complete.",
          "This design keeps the app focused. You can use Food Wheel to narrow and select, then use Google Maps for full place details before actually going.",
        ],
      },
      {
        heading: "When random choice is fair",
        body: [
          "Random choice feels fair when everyone has had a chance to remove deal-breakers. If one person cannot eat a certain food, remove it. If a place is outside the travel range, remove it. If the group only wants quick takeaway, remove slow dine-in options.",
          "After that cleanup, a spin can prevent endless discussion. It also avoids one person becoming the permanent meal decider. That is useful for couples, housemates, students, office teams, and friends planning a casual dinner.",
          "The point is not to make every food decision random. The point is to use randomness at the moment when more discussion is no longer helping.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can the wheel choose from manual and Google options together?",
        answer:
          "Yes. The main wheel uses the current list, including manual options and Google verified places.",
      },
      {
        question: "Are manual options verified?",
        answer:
          "No. Manual options are user-entered and clearly marked Manual / Not verified.",
      },
      {
        question: "Does Food Wheel rank restaurants?",
        answer:
          "No. Food Wheel is not a ranking engine. It helps choose randomly from the options you keep in the list.",
      },
      {
        question: "Why should I remove options before spinning?",
        answer:
          "Removing poor fits makes the final result easier to accept. The wheel works best when every remaining option is realistic.",
      },
    ],
  },
  {
    slug: "what-to-eat-when-you-cannot-decide",
    title: "What to Eat When You Cannot Decide",
    description:
      "A practical guide to meal decision fatigue and how to use Food Wheel to narrow choices with a food type spin and restaurant wheel.",
    intro:
      "Meal decisions can feel small, but they add up. When you are tired, busy, hungry, or choosing with other people, even simple food options can become decision fatigue. A clear process helps because it gives the decision a beginning, middle, and end.",
    sections: [
      {
        heading: "Why the question feels harder than it should",
        body: [
          "What to eat sounds simple until the choices start multiplying. You may want something nearby, but also something different from yesterday. You may want affordable food, but not the same fast option again. If you are with another person, you may both say anything is fine while silently hoping the other person chooses.",
          "This is why a blank search box can feel surprisingly heavy. The problem is not a lack of food. The problem is too many possible paths. Food Wheel helps by breaking the decision into smaller steps: choose a location, choose a radius, choose a food direction if needed, review real results, and spin.",
          "The process is useful even before the wheel spins. Each step removes uncertainty. By the time the wheel appears, the question has changed from what should I eat to which of these acceptable options should I pick.",
        ],
      },
      {
        heading: "Use a simple three-step method",
        body: [
          "First, choose the meal context. Is this breakfast, lunch, dinner, supper, a quick snack, or something for a group? Time matters because a great dinner option may not help during a short lunch break.",
          "Second, choose the search area. Use current location if you are deciding near where you are, or type and select a location if you are planning around a campus, mall, neighborhood, office, or travel area. Set the radius based on how far you are willing to go.",
          "Third, choose or spin a food type. If nothing comes to mind, use the mini food type wheel. It is intentionally separate from the search button, so you can use the suggestion as a prompt rather than an automatic command.",
        ],
      },
      {
        heading: "Make the list reflect today, not every day",
        body: [
          "A common mistake is keeping options because they are generally good, even if they are wrong for this moment. If you are already hungry, remove places that require a long drive. If you want something light, remove heavy meals. If you are eating with friends, remove places that only one person likes.",
          "Food Wheel gives you several ways to keep the list realistic. You can delete individual items, replace Google verified results with a new search, keep manual ideas, clear manual options, or remove a winner after the wheel chooses it.",
          "This keeps the decision flexible. You are not locked into the first search result, and you are not forced to accept a winner that reveals a hidden preference. Sometimes the moment you see the winner, you learn that you actually want something else. That is normal.",
        ],
      },
      {
        heading: "Let the wheel end the loop",
        body: [
          "Once the list feels acceptable, use the wheel as a stopping point. The final choice does not need to be mathematically perfect. It just needs to be good enough to move you from deciding to eating.",
          "For solo meals, this can save mental energy. For couples, it can reduce the back-and-forth of asking what do you want and hearing anything. For friends, it can turn a long chat into a shared shortlist and a visible spin.",
          "Food Wheel is most helpful when you treat it as a practical decision tool. It narrows the field, keeps manual and Google verified options clear, and gives you a clean way to finish.",
        ],
      },
    ],
    faqs: [
      {
        question: "What if I do not know what keyword to search?",
        answer:
          "Use the mini food type wheel or choose a food type chip, then edit the keyword if needed before searching.",
      },
      {
        question: "Can I use Food Wheel without sharing my current location?",
        answer:
          "Yes. You can type and select a location from Google suggestions instead of using browser geolocation.",
      },
      {
        question: "Does the wheel decide from every nearby restaurant?",
        answer:
          "No. It decides only from the current options shown in your list. Google may also limit which places are returned.",
      },
      {
        question: "Is it okay to spin again?",
        answer:
          "Yes. If the result does not fit, remove it or adjust the list and spin again.",
      },
    ],
  },
  {
    slug: "malaysia-food-decision-guide",
    title: "Malaysia Food Decision Guide",
    description:
      "Malaysia-friendly tips for choosing lunch, dinner, supper, mamak, kopitiam, cafe, hawker-style food, and group makan options with Food Wheel.",
    intro:
      "In Malaysia, deciding what to makan can be its own group activity. Lunch, dinner, supper, mamak, kopitiam, cafe, hawker-style meals, takeaway, and mall food all compete for attention. Food Wheel helps keep that decision practical without pretending to know every local stall or every hidden favorite.",
    sections: [
      {
        heading: "Match the meal to the Malaysian routine",
        body: [
          "A weekday lunch decision often means quick, nearby, and not too expensive. Dinner can allow a wider radius. Supper may depend heavily on opening hours. A weekend makan plan may involve comfort, parking, crowd size, or whether people want to sit and chat.",
          "Food Wheel is useful because the same tool can adapt to those different situations. For lunch, use a smaller radius and Open now. For dinner, try a food keyword such as Thai food, Japanese food, noodles, rice, cafe, or BBQ. For supper, opening-hours filtering becomes more important because many places may be closed.",
          "The tool does not claim to cover every local food place. It uses Google Places results where available, and manual entries let you include personal knowledge such as a nearby stall, a campus favorite, or a family-approved kopitiam option.",
        ],
      },
      {
        heading: "Use local food language naturally",
        body: [
          "Malaysia food decisions often mix English and local terms. Someone may say makan apa, mamak, kopitiam, chicken chop, nasi, noodles, cafe, dessert, or supper without thinking of a formal cuisine category. Food Wheel supports this by letting you type your own keyword rather than forcing a fixed category.",
          "The mini food type wheel includes a balanced starting list, but you can edit it. If your personal choices include economy rice, banana leaf, satay, vegetarian, hotpot, or other regular cravings, add them to the helper list. Those custom food types are saved in the browser for the same device.",
          "This is helpful for students, office workers, couples, and families because the most useful food categories are often personal. The app should fit the way you actually talk about food.",
        ],
      },
      {
        heading: "Make group makan decisions fairer",
        body: [
          "Group makan decisions often stall because everyone rejects something but nobody wants to choose. A fair approach is to let each person add one or two acceptable options. Then remove obvious deal-breakers such as too far, too spicy, too expensive, closed, no parking, or not suitable for the group.",
          "After the cleanup, the wheel can make the final call. This works for classmates choosing near campus, colleagues deciding office lunch, friends planning supper, or a family choosing dinner around a shopping area.",
          "Because manual entries remain Manual / Not verified, the group can mix real Google Places results with personal suggestions without confusing the source of each item.",
        ],
      },
      {
        heading: "Be realistic about Google data",
        body: [
          "Some small stalls, roadside shops, hawker-style places, or newer food spots may not appear if they are not listed or returned by Google Places. Some may appear without complete price, opening-hours, photo, or rating data.",
          "Food Wheel does not create fake stalls, fake addresses, fake ratings, fake reviews, or fake map links to fill those gaps. If Google does not return a field, the app leaves it hidden or marks it unknown depending on the feature.",
          "That honesty matters for local food discovery. Manual entries are there for user knowledge, while Google verified cards are there for real Google data.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I use Food Wheel for makan apa decisions?",
        answer:
          "Yes. You can type local food terms, spin a food type, add manual ideas, search nearby places, and then spin the final list.",
      },
      {
        question: "Will every local stall appear?",
        answer:
          "No. Results depend on Google Places data and may not include every stall, hawker-style place, or small food shop.",
      },
      {
        question: "Can I search around a specific Malaysia area?",
        answer:
          "Yes. Type and select a location, set the radius, and search from that selected area.",
      },
      {
        question: "Can I add my own Malaysia food categories?",
        answer:
          "Yes. The food type helper list is editable, so you can add the food terms you normally use.",
      },
    ],
  },
  {
    slug: "how-food-wheel-uses-location-search",
    title: "How Food Wheel Uses Location Search",
    description:
      "Plain-language explanation of current location, typed locations, radius, opening hours, price filters, and Google Places results in Food Wheel.",
    intro:
      "Location search is what lets Food Wheel turn a general food question into nearby options. The app uses location only when you choose a location method. You can allow browser geolocation, or you can type and select a location from Google suggestions.",
    sections: [
      {
        heading: "Two ways to choose a search center",
        body: [
          "The first method is Use my current location. When you click it, the browser asks for permission. If you allow it, Food Wheel stores the latitude and longitude for the current session and uses that center for nearby food search and the radius preview.",
          "The second method is typed location search. You can type a mall, neighborhood, university, town, or landmark, then select a real Google suggestion. Food Wheel then requests Google Place Details for coordinates. This is useful when you are planning ahead or searching somewhere you are not physically standing.",
          "If you edit the typed location after selecting it, the app clears the selected coordinates and asks you to select a suggestion again. That prevents unclear text from being treated as a real location.",
        ],
      },
      {
        heading: "How radius works",
        body: [
          "Radius is entered in kilometers because that is easier to understand than meters for most food searches. Internally, the app converts kilometers to meters before sending the search request to the server.",
          "After Google returns place candidates, Food Wheel uses coordinates to calculate actual distance from the selected center. Results outside the selected radius are removed. This matters because some Google search behavior can rank places near the area without treating the radius as a strict boundary.",
          "A small radius is useful for walking distance or quick meals. A larger radius is better when driving, planning dinner, or searching in a less dense area. The app should not claim to show every place in the radius, because Google may limit or rank what it returns.",
        ],
      },
      {
        heading: "Opening hours and price filters",
        body: [
          "Opening-hours filtering depends on Google opening-hours data. Open now uses the current opening status when Google provides it. Breakfast, lunch, dinner, and custom time use opening periods where available. Places without enough opening-hours data may be hidden by the filter.",
          "Price filtering also depends on Google data. Some places provide price information, and some do not. Food Wheel avoids inventing exact prices or local currency ranges. If Google does not return price data, the app shows that honestly or filters based on the selected behavior.",
          "These filters are useful, but they are not perfect. They help create a practical shortlist, while the Google Maps link remains the best place to confirm details before traveling.",
        ],
      },
      {
        heading: "What data comes from Google",
        body: [
          "Food Wheel requests Google Places data through server-side routes. Results may include names, addresses, ratings, coordinates, opening information, price data, photos, place types, and Google Maps links when available.",
          "The server-side Google Places key is not exposed to the browser. The optional map preview uses a separate browser-restricted Maps JavaScript key, which should be restricted in Google Cloud by HTTP referrer and API usage.",
          "The app does not invent missing Google data. If a result lacks a place ID, display name, or coordinates needed for filtering, it is skipped rather than turned into a fake verified restaurant.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I have to use current location?",
        answer:
          "No. You can type and select a location from Google suggestions instead.",
      },
      {
        question: "What does the map preview show?",
        answer:
          "It shows the selected or current center point and the radius circle. It does not show restaurant result markers yet.",
      },
      {
        question: "Why are some results missing?",
        answer:
          "Google may limit results, and some places may not have the data needed for the selected filters.",
      },
      {
        question: "Is my manually typed location enough by itself?",
        answer:
          "No. You need to select a suggestion so the app has real coordinates for search.",
      },
    ],
  },
  {
    slug: "group-food-decision-tips",
    title: "Group Food Decision Tips",
    description:
      "How friends, couples, students, and colleagues can use Food Wheel to decide fairly with manual options, food type spins, and restaurant spins.",
    intro:
      "Group food decisions can get stuck because everyone has a different craving, budget, distance limit, or idea of what sounds good. Food Wheel gives the group a shared process: collect options, remove deal-breakers, and let the wheel make the final pick.",
    sections: [
      {
        heading: "Collect options without debating yet",
        body: [
          "The first step in a group decision should be gathering, not arguing. Ask each person for one or two acceptable ideas. These can be specific restaurants, food types, or simple options such as cafe, noodles, rice, mamak, fast food, dessert, or vegetarian.",
          "Add known ideas as manual options. Search Google Places when the group wants real nearby options around a selected location. If nobody has a starting point, spin the mini food type wheel and use the selected food type as the first search keyword.",
          "Keeping the early stage open helps quieter people contribute. It also avoids the common pattern where one person suggests something and everyone else immediately rejects it without offering alternatives.",
        ],
      },
      {
        heading: "Remove deal-breakers before the spin",
        body: [
          "The wheel should not include options that the group already knows will fail. Remove places that are too far, closed, outside the budget, unsuitable for dietary needs, inconvenient for transport, or disliked by most of the group.",
          "This is where Food Wheel is more useful than simply saying random choice. The group can edit the list first. Google verified cards can show details when Google returns them, while manual options can represent local knowledge or suggestions from the group chat.",
          "For office lunch, the deal-breaker may be distance and time. For students, it may be budget. For a couple, it may be mood and comfort. For friends at night, it may be whether the place is open for supper. The best shortlist respects the real situation.",
        ],
      },
      {
        heading: "Use the wheel as a fair stopping point",
        body: [
          "Once every remaining option is acceptable, a random spin can feel fairer than letting the loudest person decide. It also creates a clear stopping point, which is often what group decisions need most.",
          "The result does not have to be treated as final forever. If the wheel picks a place and the group suddenly realizes it is a bad fit, remove that option and spin again. That is still progress because the list is getting sharper.",
          "This approach works well for couples choosing dinner, friends choosing where to meet, students deciding after class, and colleagues trying to avoid another long lunch debate.",
        ],
      },
      {
        heading: "Keep the process transparent",
        body: [
          "Transparency makes the result easier to accept. Everyone can see which options are on the list, which ones were removed, and what the wheel selected. Manual items are marked Manual / Not verified, while Google verified items come from Google Places data.",
          "If the group wants to check a Google verified result, open it in Google Maps for reviews, directions, photos, menus, and current details. Food Wheel does not recreate those details or make them up.",
          "The goal is not to make food decisions overly formal. The goal is to give a casual group decision just enough structure to become easy.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can everyone add manual ideas?",
        answer:
          "Yes. Add the ideas into the same list and keep them marked as manual options.",
      },
      {
        question: "Can the winner be removed?",
        answer:
          "Yes. Use Remove this option after a winner is selected, then spin again with the remaining choices.",
      },
      {
        question: "Is the spin weighted?",
        answer:
          "No. The wheel selects randomly from the current list.",
      },
      {
        question: "How can a group avoid an unfair result?",
        answer:
          "Agree that every remaining option must be acceptable before spinning. Delete deal-breakers first, then let the wheel choose.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
