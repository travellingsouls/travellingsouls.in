import type { Destination } from "@/lib/types";

/**
 * PLACEHOLDER DATA - replaced by Supabase in PHASE 8.
 *
 * The descriptive copy here is factual geography and is safe to publish. What
 * is deliberately absent is anything about the business: no claims about trips
 * run, groups led, or years of experience appear in this file.
 *
 * heroImage is null throughout because no photography has been supplied. The
 * brief prohibits generic stock imagery, so the UI renders a neutral surface
 * until real photographs exist.
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
    heroImage: null,
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
    heroImage: null,
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
    heroImage: null,
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
    heroImage: null,
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
    heroImage: null,
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
    heroImage: null,
    featured: false,
    sortOrder: 6,
  },
];
