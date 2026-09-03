import type { Destination } from "@/lib/types";

/**
 * PLACEHOLDER DATA - replaced by Supabase in PHASE 8.
 *
 * The descriptive copy here is factual geography and is safe to publish. What
 * is deliberately absent is anything about the business: no claims about trips
 * run, groups led, or years of experience appear in this file.
 *
 * Photography is freely-licensed material from Wikimedia Commons, chosen so
 * every file permits COMMERCIAL use (CC0, CC BY or CC BY-SA - never CC BY-NC,
 * which this business could not lawfully use). The credit field carries the
 * attribution those licences require, and the UI renders it.
 *
 * TODO(content): replace with the trip captain's own photographs. Real images
 * from real departures are worth more for trust than any licensed substitute.
 *
 * ids are readable strings for now; Supabase will issue UUIDs.
 */
export const destinationsMock: Destination[] = [
  {
    id: "dest-spiti",
    slug: "spiti",
    name: "Spiti Valley",
    region: "Himachal Pradesh",
    tagline: "A cold desert between India and Tibet",
    summary:
      "A high-altitude desert valley in the Himalaya, sitting mostly above 3,000 metres. Spiti is known for its thousand-year-old monasteries, near-empty roads and some of the highest inhabited villages in the world.",
    description:
      "Spiti sits in the rain shadow of the Himalaya, which is why it looks nothing like the rest of Himachal. There are no forests here - the valley is bare rock and sky, cut through by the Spiti river. Monasteries at Key, Dhankar and Tabo have been in continuous use for centuries, and villages such as Langza, Komic and Hikkim sit above 4,000 metres. Two roads reach the valley: the year-round route through Shimla and Kinnaur, which gains height gradually, and the shorter summer-only crossing from Manali over Kunzum Pass. The gradual route matters more than it sounds, because altitude here is a genuine consideration rather than a formality.",
    bestSeason:
      "Mid-May to early October for the full circuit. The Kinnaur route stays open longer, but the Kunzum Pass crossing closes with snow.",
    heroImage: {
      src: "/images/destinations/spiti.jpg",
      alt: "The bare, high-altitude road through the Spiti valley below rock ridges",
      width: 1920,
      height: 1280,
      credit: "Timothy Gonsalves / Wikimedia Commons (CC BY-SA 4.0)",
    },
    featured: true,
    sortOrder: 1,
  },
  {
    id: "dest-ladakh",
    slug: "ladakh",
    name: "Ladakh",
    region: "Ladakh",
    tagline: "High passes, wide silence",
    summary:
      "A high-altitude region of mountain desert, glacial lakes and Buddhist monasteries, reached over some of the highest motorable passes in the world.",
    description:
      "Ladakh sits between the Karakoram and the Himalaya, a landscape of bare mountain and startling colour. Leh is the usual base, with monasteries at Thiksey, Hemis and Diskit within reach. Beyond it lie the Nubra valley over Khardung La, the long blue of Pangong Tso, and the quieter Tso Moriri to the south-east. Most itineraries build in acclimatisation days at the start, because Leh itself is already at 3,500 metres and the passes go considerably higher. Whether you arrive by road from Manali or Srinagar, or fly in, changes how much acclimatisation the first days need.",
    bestSeason:
      "June to September for road access over the passes. Flights operate year-round, and winter travel is a specialist trip.",
    heroImage: {
      src: "/images/destinations/ladakh.jpg",
      alt: "A stream running down from bare mountains in Ladakh",
      width: 1920,
      height: 1440,
      credit: "Ssandrathomas / Wikimedia Commons (CC BY-SA 4.0)",
    },
    featured: true,
    sortOrder: 2,
  },
  {
    id: "dest-himachal",
    slug: "himachal",
    name: "Himachal Pradesh",
    region: "Himachal Pradesh",
    tagline: "Deodar forests, river valleys and hill towns",
    summary:
      "The most accessible of the Himalayan states, covering everything from the Parvati and Tirthan valleys to Dharamshala, Manali and the colonial hill stations.",
    description:
      "Himachal covers an enormous range in a small area. The Kullu and Parvati valleys draw walkers and long-stay travellers; Tirthan and the Great Himalayan National Park are quieter and greener; Dharamshala and McLeodganj carry a strong Tibetan influence; and Shimla still wears its colonial architecture. Because road access is good and altitudes are moderate compared with Spiti or Ladakh, Himachal works for shorter trips and for travellers who would rather not spend days acclimatising.",
    bestSeason:
      "March to June, and September to November. The monsoon between July and August brings landslide risk on hill roads.",
    heroImage: {
      src: "/images/destinations/himachal.jpg",
      alt: "Snow-topped Himalayan peaks seen across the Kullu valley",
      width: 1920,
      height: 1440,
      credit: "Dainis Matisons / Wikimedia Commons (CC BY 2.0)",
    },
    featured: true,
    sortOrder: 3,
  },
  {
    id: "dest-uttarakhand",
    slug: "uttarakhand",
    name: "Uttarakhand",
    region: "Uttarakhand",
    tagline: "Where the Ganga leaves the mountains",
    summary:
      "Pilgrimage routes, high meadows and river towns. Uttarakhand holds both the Char Dham circuit and some of the most walked trekking country in the Indian Himalaya.",
    description:
      "Uttarakhand is where spiritual and adventure travel overlap most closely. Rishikesh and Haridwar sit where the Ganga reaches the plains, and the Char Dham route to Yamunotri, Gangotri, Kedarnath and Badrinath runs deep into the mountains above them. Further north are the flower meadows of the Valley of Flowers, the ski slopes at Auli, and long-standing trekking routes across the Garhwal and Kumaon hills. Nainital and Jim Corbett sit lower and stay open for most of the year.",
    bestSeason:
      "The Char Dham temples open roughly late April and close around Diwali. The Valley of Flowers is at its best in the monsoon, July to early September.",
    heroImage: {
      src: "/images/destinations/uttarakhand.jpg",
      alt: "Alpine meadow in flower below peaks in the Valley of Flowers, Uttarakhand",
      width: 1920,
      height: 1080,
      credit: "Anshusk / Wikimedia Commons (CC BY-SA 4.0)",
    },
    featured: true,
    sortOrder: 4,
  },
  {
    id: "dest-rajasthan",
    slug: "rajasthan",
    name: "Rajasthan",
    region: "Rajasthan",
    tagline: "Forts, desert and old trade cities",
    summary:
      "Walled cities, hill forts and the Thar desert. The one North Indian destination that is at its best in winter, when the Himalaya is closed.",
    description:
      "Rajasthan is built around its cities: Jaipur and its hill forts, the blue houses under Mehrangarh in Jodhpur, the lakes of Udaipur, and Jaisalmer standing over the Thar desert. Pushkar and Bundi offer a slower pace. Because summer temperatures make travel genuinely difficult, Rajasthan runs on the opposite calendar to the mountains, which makes it the natural winter counterpart to a Himalayan season.",
    bestSeason:
      "October to March. April to June is very hot across most of the state.",
    heroImage: {
      src: "/images/destinations/rajasthan.jpg",
      alt: "The sandstone walls of Jaisalmer fort rising above the desert city",
      width: 1920,
      height: 800,
      credit: "Gerard Janot / Wikimedia Commons (CC BY-SA 3.0)",
    },
    featured: false,
    sortOrder: 5,
  },
  {
    id: "dest-kashmir",
    slug: "kashmir",
    name: "Kashmir",
    region: "Jammu & Kashmir",
    tagline: "Meadows, water and mountain",
    summary:
      "The Kashmir valley, with Srinagar and Dal Lake at its centre, and the meadows of Gulmarg, Pahalgam and Sonmarg around it.",
    description:
      "The valley is green in a way the rest of the western Himalaya is not, watered by the Jhelum and ringed by high mountains. Srinagar sits on Dal Lake, with its houseboats and Mughal gardens. Gulmarg becomes a ski destination in winter and a meadow in summer; Pahalgam is the starting point for several walks and pilgrim routes; Sonmarg sits closer to the glaciers. The tulip garden below Srinagar opens for a few weeks each spring.",
    bestSeason:
      "April and May for tulips and blossom, June to August for the meadows, December to February for snow at Gulmarg.",
    heroImage: {
      src: "/images/destinations/kashmir.jpg",
      alt: "A wooden shikara on the still water of Dal Lake, Srinagar",
      width: 1920,
      height: 1280,
      credit: "Utsav Sabharwal Photography / Wikimedia Commons (CC BY-SA 3.0)",
    },
    featured: false,
    sortOrder: 6,
  },
  {
    id: "dest-goa",
    slug: "goa",
    name: "Goa",
    region: "Goa",
    tagline: "The winter counterpart to a Himalayan season",
    summary:
      "Beaches, Portuguese-era churches and river country on the Konkan coast. Goa runs on the opposite calendar to the mountains, which makes it the natural trip when the passes are shut.",
    description:
      "Goa splits roughly in two. The north around Baga, Calangute and Anjuna is busier and better known; the south around Palolem, Agonda and Cola is quieter and slower. Inland there is a different state altogether - the spice farms and forest of the Western Ghats, the Dudhsagar falls on the Karnataka border, and the churches and old houses of Old Goa and Fontainhas. Because it is warm when the Himalaya is closed, Goa is what fills the winter months for a domestic operator working mainly in the north.",
    bestSeason:
      "November to February for the driest, mildest weather. March to May is hot, and the monsoon from June to September closes most water activity.",
    heroImage: {
      src: "/images/destinations/goa.jpg",
      alt: "Palm-backed curve of sand at Palolem beach, Goa",
      width: 1134,
      height: 850,
      credit: "SINHA / Wikimedia Commons (CC BY-SA 3.0)",
    },
    featured: true,
    sortOrder: 7,
  },
];
